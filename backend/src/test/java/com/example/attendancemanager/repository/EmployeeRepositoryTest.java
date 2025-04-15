package com.example.attendancemanager.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
@Sql("EmployeeRepositoryTest.sql")
@Transactional
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void testFindByEmailAndPassword() {
        Employee employee = this.employeeRepository.findByEmailAndPassword(
                "itohtohirofumi11@email.com", "$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i")
                .orElse(new Employee());
        assertEquals(employee.getId(), 11);
        assertEquals(employee.getEmail(), "itohtohirofumi11@email.com");
        assertEquals(employee.getName(), "伊藤博文11");
    }

    @Test
    public void testFindByEmail() {
        Employee employee = this.employeeRepository.findByEmail("itohtohirofumi11@email.com").orElse(new Employee());
        assertEquals(employee.getId(), 11);
        assertEquals(employee.getEmail(), "itohtohirofumi11@email.com");
        assertEquals(employee.getName(), "伊藤博文11");
    }

}
