package com.example.attendancemanager.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.attendancemanager.entity.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

        // 社員IDで今日の出勤データを取得
        @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.date = :clockInYearMonthDate")
        Optional<Attendance> findByEmployeeIdAndDate(@Param("employeeId") Long employeeId,
                        @Param("clockInYearMonthDate") LocalDate clockInYearMonthDate);

        // 月次レポート用に、日付が指定月（"YYYY-MM"形式）に一致する出退勤データを取得
        @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND YEAR(a.date) = :year AND MONTH(a.date) = :month")
        Optional<List<Attendance>> findByEmployeeIdAndYearAndMonth(@Param("employeeId") Long employeeId,
                        @Param("year") int year,
                        @Param("month") int month);

        // 社員IDで出退勤データを取得
        Optional<List<Attendance>> findByEmployeeId(Long employeeId);

}
