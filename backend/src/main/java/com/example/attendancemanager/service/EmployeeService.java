package com.example.attendancemanager.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // 新しい社員を登録する
    @Transactional
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

    // 特定の社員をIDで削除する
    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // メールアドレスで社員を取得する
    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    // 社員を保存する
    @Transactional
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }
}
