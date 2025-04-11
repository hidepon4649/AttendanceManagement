package com.example.attendancemanager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceImplTest {

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Mock
    private EmployeeRepository employeeRepository;

    @Test
    void testGetEmployeeById() {

        Employee expectedEmployee = new Employee();
        expectedEmployee.setId(99999L);
        expectedEmployee.setName("テスト太郎");
        expectedEmployee.setEmail("test@taro.com");
        expectedEmployee.setPassword("password123");
        expectedEmployee.setAdmin(false);

        doReturn(Optional.of(expectedEmployee)).when(employeeRepository).findById(99999L);
        Employee actualEmployee = employeeService.getEmployeeById(99999L);

        assertEquals(actualEmployee.getId(), expectedEmployee.getId());
        assertEquals(actualEmployee.getName(), expectedEmployee.getName());
        assertEquals(actualEmployee.getEmail(), expectedEmployee.getEmail());
        assertEquals(actualEmployee.getPassword(), expectedEmployee.getPassword());
        assertEquals(actualEmployee.isAdmin(), expectedEmployee.isAdmin());

    }

    @Test
    void tesFindByEmail() {

        Employee expectedEmployee = new Employee();
        expectedEmployee.setId(99999L);
        expectedEmployee.setName("テスト太郎");
        expectedEmployee.setEmail("test@taro.com");
        expectedEmployee.setPassword("password123");
        expectedEmployee.setAdmin(false);

        doReturn(Optional.of(expectedEmployee)).when(employeeRepository).findByEmail("test@taro.com");
        Employee actualEmployee = employeeService.findByEmail("test@taro.com");

        assertEquals(actualEmployee.getId(), expectedEmployee.getId());
        assertEquals(actualEmployee.getName(), expectedEmployee.getName());
        assertEquals(actualEmployee.getEmail(), expectedEmployee.getEmail());
        assertEquals(actualEmployee.getPassword(), expectedEmployee.getPassword());
        assertEquals(actualEmployee.isAdmin(), expectedEmployee.isAdmin());

    }
}
