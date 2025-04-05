package com.example.attendancemanager.service;

import java.util.List;
import com.example.attendancemanager.model.Attendance;

public interface AttendanceService {

    // 出勤の記録
    Attendance clockIn(Long employeeId);

    // 退勤の記録
    Attendance clockOut(Long employeeId);

    // 備考の記録
    Attendance remarks(Long employeeId, String date, String remarks);

    // 勤怠の追加
    Attendance add(Long employeeId, String date);

    // 勤怠の追加
    Attendance add(Long employeeId, String date, String remarks);

    // 打刻の修正
    Attendance edit(Long attendanceId, String newClockInTime, String newClockOutTime, int breakMinutes);

    // 勤怠記録の削除
    Attendance delete(Long attendanceId);

    // 月次レポートの取得
    List<Attendance> getMonthlyReportByEmployeeId(Long employeeId, int year, int month);

}