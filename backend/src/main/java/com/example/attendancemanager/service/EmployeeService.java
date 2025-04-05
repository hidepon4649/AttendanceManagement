package com.example.attendancemanager.service;

import java.util.List;
import com.example.attendancemanager.model.Employee;

public interface EmployeeService {

    // 新しい社員を登録する
    Employee saveEmployee(Employee employee);

    // すべての社員を取得する
    List<Employee> getAllEmployees();

    // 特定の社員をIDで取得する
    Employee getEmployeeById(Long id);

    // 特定の社員をIDで削除する
    void deleteEmployee(Long id);

    // メールアドレスで社員を取得する
    Employee findByEmail(String email);

    // 社員を保存する
    void save(Employee employee);

}