package com.example.attendancemanager.service;

import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // 新しい社員を登録する
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // すべての社員を取得する
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // 特定の社員をIDで取得する
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }
}
