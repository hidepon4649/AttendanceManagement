package com.example.attendancemanager.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.example.attendancemanager.dto.EmployeeDto;
import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.security.JwtAuthTokenFilter;
import com.example.attendancemanager.service.EmployeeService;
import com.jayway.jsonpath.JsonPath;

@WebMvcTest(controllers = EmployeeController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {
        JwtAuthTokenFilter.class }))
class EmployeeControllerTest extends AbstractControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    // GET /api/employees
    @Test
    @DisplayName("社員一覧取得APIが200と社員オブジェクト配列を返すこと")
    void testGetApiEmployeesReturnOk() throws Exception {

        Employee emp1 = new Employee();
        emp1.setId(1L);

        Employee emp2 = new Employee();
        emp2.setId(2L);

        Employee emp3 = new Employee();
        emp3.setId(3L);

        when(employeeService.getAllEmployees()).thenReturn(Arrays.asList(emp1, emp2, emp3));

        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[2].id").value(3L));

    }

    // GET /api/employees/{id}
    @Test
    @DisplayName("社員詳細取得APIが200と社員オブジェクトを返すこと")
    void testGetApiEmployeesByIdReturnOk() throws Exception {
        Employee employee = new Employee();
        employee.setId(1L);
        when(employeeService.getEmployeeById(1L)).thenReturn(employee);

        mockMvc.perform(get("/api/employees/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));

    }

    // GET /api/employees/{id}/picture
    @Test
    @DisplayName("社員画像取得APIが200と画像データを返すこと")
    void testGetApiEmployeesByIdPictureReturnOk() throws Exception {

        // PNGファイルのヘッダー（最小限のPNGバイト配列）
        byte[] pngBytes = new byte[] {
                (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
        };

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setPicture(pngBytes);
        when(employeeService.getEmployeeById(1L)).thenReturn(employee);

        mockMvc.perform(get("/api/employees/1/picture"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_PNG))
                .andExpect(content().bytes(pngBytes));
    }

    // GET /api/employees/{id}/picture (画像なし)
    @Test
    @DisplayName("社員画像取得APIが画像なしの場合404を返すこと")
    void testGetApiEmployeesByIdPictureReturnNotFound() throws Exception {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setPicture(null);
        when(employeeService.getEmployeeById(1L)).thenReturn(employee);

        mockMvc.perform(get("/api/employees/1/picture"))
                .andExpect(status().isNotFound());
    }

    // POST /api/employees
    @Test
    @DisplayName("社員作成APIが201とLocationヘッダを返すこと")
    void testPostApiEmployeesReturnCreatedWithLocation() throws Exception {
        EmployeeDto dto = new EmployeeDto();
        dto.setName("テスト太郎");
        dto.setEmail("test@example.com");
        dto.setPassword("password123");
        dto.setAdmin(false);

        Employee saved = new Employee();
        saved.setId(1L);
        saved.setName(dto.getName());
        saved.setEmail(dto.getEmail());

        when(employeeService.saveEmployee(any(Employee.class))).thenReturn(saved);

        MockMultipartFile picture = new MockMultipartFile("picture", "test.png", "image/png", new byte[] { 1, 2, 3 });

        mockMvc.perform(multipart("/api/employees")
                .file(picture)
                .param("name", dto.getName())
                .param("email", dto.getEmail())
                .param("password", dto.getPassword())
                .param("admin", String.valueOf(dto.isAdmin()))
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/employees/1"));
    }

    // PUT /api/employees/{id}
    @Test
    @DisplayName("社員更新APIが204を返すこと")
    void testPutApiEmployeesByIdReturnNoContent() throws Exception {
        EmployeeDto dto = new EmployeeDto();
        dto.setName("テスト太郎");
        dto.setEmail("test@example.com");
        dto.setAdmin(true);

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setAdmin(dto.isAdmin());

        when(employeeService.getEmployeeById(1L)).thenReturn(employee);
        when(employeeService.saveEmployee(any(Employee.class))).thenReturn(employee);

        MockMultipartFile picture = new MockMultipartFile("picture", "test.png", "image/png", new byte[] { 1, 2, 3 });

        mockMvc.perform(multipart("/api/employees/1")
                .file(picture)
                .param("name", dto.getName())
                .param("email", dto.getEmail())
                .param("admin", String.valueOf(dto.isAdmin()))
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                })
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isNoContent());
    }

    // DELETE /api/employees/{id}
    @Test
    @DisplayName("社員削除APIが204を返すこと")
    void testDeleteApiEmployeesByIdReturnNoContent() throws Exception {

        mockMvc.perform(delete("/api/employees/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void 社員作成APIがマルチスレッド環境でもスレッドセーフに動作すること() throws Exception {
        int threadCount = 10;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        List<Future<MvcResult>> futures = new ArrayList<>();
        AtomicLong idGenerator = new AtomicLong(100);

        when(employeeService.saveEmployee(any(Employee.class))).thenAnswer(invocation -> {
            Employee emp = invocation.getArgument(0);
            emp.setId(idGenerator.getAndIncrement());
            return emp;
        });

        for (int i = 0; i < threadCount; i++) {
            final int idx = i;
            futures.add(executor.submit(() -> {
                MockMultipartFile picture = new MockMultipartFile("picture", "test" + idx + ".png", "image/png",
                        new byte[] { (byte) idx });
                return mockMvc.perform(multipart("/api/employees")
                        .file(picture)
                        .param("name", "テスト" + idx)
                        .param("email", "test" + idx + "@example.com")
                        .param("password", "password" + idx + "A")
                        .param("admin", String.valueOf(idx % 2 == 0))
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                        .andReturn();
            }));
        }

        Set<Long> ids = new HashSet<>();
        for (Future<MvcResult> future : futures) {
            MvcResult result = future.get(5, TimeUnit.SECONDS);
            assertEquals(201, result.getResponse().getStatus());
            String content = result.getResponse().getContentAsString();
            Number idNum = JsonPath.read(content, "$.id");
            Long id = idNum.longValue();
            assertTrue(ids.add(id), "ID should be unique: " + id);
        }
        executor.shutdown();
    }

    @Test
    void 社員作成APIがマルチスレッド環境でもスレッドセーフに動作すること_同時実行性がさらに高い版() throws Exception {
        int threadCount = 10;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        List<Future<MvcResult>> futures = new ArrayList<>();
        AtomicLong idGenerator = new AtomicLong(100);

        // スレッドの同時スタート用
        CountDownLatch readyLatch = new CountDownLatch(threadCount);
        CountDownLatch startLatch = new CountDownLatch(1);

        when(employeeService.saveEmployee(any(Employee.class))).thenAnswer(invocation -> {
            Employee emp = invocation.getArgument(0);
            emp.setId(idGenerator.getAndIncrement());
            return emp;
        });

        for (int i = 0; i < threadCount; i++) {
            final int idx = i;
            futures.add(executor.submit(() -> {
                readyLatch.countDown(); // 準備完了を通知
                startLatch.await(); // 全スレッドが揃うまで待機

                MockMultipartFile picture = new MockMultipartFile("picture", "test" + idx + ".png", "image/png",
                        new byte[] { (byte) idx });
                return mockMvc.perform(multipart("/api/employees")
                        .file(picture)
                        .param("name", "テスト" + idx)
                        .param("email", "test" + idx + "@example.com")
                        .param("password", "password" + idx + "A")
                        .param("admin", String.valueOf(idx % 2 == 0))
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                        .andReturn();
            }));
        }

        // 全スレッドが準備できるまで待つ
        readyLatch.await();
        // 全スレッド一斉スタート
        startLatch.countDown();

        Set<Long> ids = new HashSet<>();
        for (Future<MvcResult> future : futures) {
            MvcResult result = future.get(5, TimeUnit.SECONDS);
            assertEquals(201, result.getResponse().getStatus());
            String content = result.getResponse().getContentAsString();
            Number idNum = JsonPath.read(content, "$.id");
            Long id = idNum.longValue();
            assertTrue(ids.add(id), "ID should be unique: " + id);
        }
        executor.shutdown();
    }
}