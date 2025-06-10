package com.example.attendancemanager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
public class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private final List<Employee> EMPLOYEES = new ArrayList<Employee>();

    @BeforeEach
    void setUp() {
        // パスワード固定でテスト用の社員データを３件作成
        final String password = "$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i";

        EMPLOYEES.clear();
        for (int i = 1; i <= 3; i++) {
            Employee emp = new Employee();
            emp.setId(10L + i);
            emp.setName("伊藤博文" + (10 + i));
            emp.setEmail("itohtohirofumi" + (10 + i) + "@email.com");
            emp.setAdmin(true);
            emp.setPassword(password);
            EMPLOYEES.add(emp);
        }
    }

    @Test
    @DisplayName("全件の社員情報が取得できること")
    void testGetAllEmployees() {

        when(employeeRepository.findAll()).thenReturn(EMPLOYEES);

        List<Employee> list = employeeService.getAllEmployees();

        assertEquals(3, list.size());

    }

    @Test
    @DisplayName("IDで指定した社員情報が取得できること")
    void testGetEmployeeById() {

        when(employeeRepository.findById(11L)).thenReturn(Optional.of(EMPLOYEES.get(0)));

        Employee employee = employeeService.getEmployeeById(11L);

        assertEquals(11L, employee.getId());
        assertEquals("伊藤博文11", employee.getName());
        assertEquals("itohtohirofumi11@email.com", employee.getEmail());
        assertEquals("$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i", employee.getPassword());
        assertEquals(true, employee.isAdmin());

    }

    @Test
    @DisplayName("メールアドレスで指定した社員情報が取得できること")
    void testFindByEmail() {

        when(employeeRepository.findByEmail("itohtohirofumi11@email.com")).thenReturn(Optional.of(EMPLOYEES.get(0)));

        Employee employee = employeeService.findByEmail("itohtohirofumi11@email.com");

        assertEquals(11L, employee.getId());
        assertEquals("伊藤博文11", employee.getName());
        assertEquals("itohtohirofumi11@email.com", employee.getEmail());
        assertEquals("$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i", employee.getPassword());
        assertEquals(true, employee.isAdmin());

    }

    @Test
    @DisplayName("IDで指定した社員情報を削除できること")
    void testDeleteEmployee() {

        final long DELETE_EMPLOYEE_ID = 11L;

        // deleteByIdが呼ばれた時にEMPLOYEESから該当社員を削除する
        doAnswer(invocation -> {
            Long id = invocation.getArgument(0);
            EMPLOYEES.removeIf(e -> e.getId().equals(id));
            return null;
        }).when(employeeRepository).deleteById(DELETE_EMPLOYEE_ID);

        employeeService.deleteEmployee(DELETE_EMPLOYEE_ID);

        // IDで指定した社員が削除されたことを確認
        assertTrue(EMPLOYEES.stream().noneMatch(e -> e.getId() == DELETE_EMPLOYEE_ID));
        // IDで指定した社員以外が削除されていないことを確認
        assertTrue(EMPLOYEES.stream().anyMatch(e -> e.getId() == 12L));
        assertTrue(EMPLOYEES.stream().anyMatch(e -> e.getId() == 13L));

    }

}
