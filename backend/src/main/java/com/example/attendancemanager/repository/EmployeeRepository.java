package com.example.attendancemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.attendancemanager.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // ログイン用のメソッド
    Employee findByEmailAndPassword(String email, String password);

    // メールアドレスからユーザーを取得するメソッド
    Employee findByEmail(String email);
    
}
