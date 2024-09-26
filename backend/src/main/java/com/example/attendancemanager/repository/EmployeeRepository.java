package com.example.attendancemanager.repository;

import com.example.attendancemanager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // ログイン用のメソッド
    Employee findByEmailAndPassword(String email, String password);
}
