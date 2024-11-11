package com.example.attendancemanager.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.attendancemanager.model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Optional<Attendance> findByEmployeeAndDate(Employee employee, LocalDate date);

    // 社員IDで今日の出勤データを取得
    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.date = :clockInYearMonthDate")
    Attendance findByEmployeeIdAndDate(@Param("employeeId") Long employeeId, @Param("clockInYearMonthDate") LocalDate clockInYearMonthDate);
    

    // 月次レポート用に、日付が指定月（"YYYY-MM"形式）に一致する出退勤データを取得
    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND YEAR(a.date) = :year AND MONTH(a.date) = :month")
    List<Attendance> findByEmployeeIdAndYearAndMonth(@Param("employeeId") Long employeeId, @Param("year") int year, @Param("month") int month);


    // 社員IDで出退勤データを取得
    List<Attendance> findByEmployeeId(Long employeeId);


}
