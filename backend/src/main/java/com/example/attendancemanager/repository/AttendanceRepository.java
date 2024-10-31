package com.example.attendancemanager.repository;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndDate(Employee employee, LocalDate date);

    // 月次レポート用に、日付が指定月（"YYYY-MM"形式）に一致する出退勤データを取得
    // List<Attendance> findByDateStartingWith(String month);
    @Query("SELECT a FROM Attendance a WHERE str(a.date) LIKE %:date%")
    List<Attendance> findByDateStartingWith(@Param("date") String date);

    // 社員IDで出退勤データを取得
    List<Attendance> findByEmployeeId(Long employeeId);
}
