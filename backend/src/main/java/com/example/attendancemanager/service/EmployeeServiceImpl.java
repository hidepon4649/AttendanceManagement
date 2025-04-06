package com.example.attendancemanager.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // 新しい社員を登録する
    @Override
    @Transactional
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // すべての社員を取得する
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // 特定の社員をIDで取得する
    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("社員が見つかりません:" + id));
    }

    // 特定の社員をIDで削除する
    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // メールアドレスで社員を取得する
    @Override
    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("社員が見つかりません:" + email));
    }

    // 社員を保存する
    @Override
    @Transactional
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }
}
