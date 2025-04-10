package com.example.attendancemanager.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.attendancemanager.entity.Employee;

@SpringBootTest
@ActiveProfiles("test")
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void testFindByEmail() {
        Employee employee = this.employeeRepository.findByEmail("itohtohirofumi@email.com").orElse(new Employee());
        assertEquals(employee.getId(), 1);
        assertEquals(employee.getEmail(), "itohtohirofumi@email.com");
        assertEquals(employee.getName(), "伊藤博文");
        assertEquals(employee.getPassword(), "$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i");

    }
}
