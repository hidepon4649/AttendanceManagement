package com.example.attendancemanager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendancemanager.entity.Employee;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@ActiveProfiles("test")
@Sql("EmployeeServiceImplTest.sql")
@Transactional
public class EmployeeServiceImplTest {

    @Autowired
    private EmployeeServiceImpl employeeService;

    @Test
    void testGetAllEmployees() {
        List<Employee> list = employeeService.getAllEmployees();
        assertEquals(3, list.size());
    }

    @Test
    void testGetEmployeeById() {

        Employee employee = employeeService.getEmployeeById(11L);

        assertEquals(11L, employee.getId());
        assertEquals("伊藤博文11", employee.getName());
        assertEquals("itohtohirofumi11@email.com", employee.getEmail());
        assertEquals("$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i", employee.getPassword());
        assertEquals(true, employee.isAdmin());

    }

    @Test
    void tesFindByEmail() {

        Employee employee = employeeService.findByEmail("itohtohirofumi11@email.com");

        assertEquals(11L, employee.getId());
        assertEquals("伊藤博文11", employee.getName());
        assertEquals("itohtohirofumi11@email.com", employee.getEmail());
        assertEquals("$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i", employee.getPassword());
        assertEquals(true, employee.isAdmin());

    }
}
