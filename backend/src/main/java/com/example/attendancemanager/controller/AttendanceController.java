package com.example.attendancemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.service.AttendanceService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed.origins}")
@RequestMapping("/api/attendance")
public class AttendanceController {

    // TODO:過去日付の打刻を禁止する。
    // TODO:過去日付の打刻修正は管理者のみ可能とする。

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/{employeeId}/clock-in")
    public ResponseEntity<Attendance> clockIn(@PathVariable Long employeeId) {
        Attendance attendance = attendanceService.clockIn(employeeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendance);
    }

    @PostMapping("/{employeeId}/clock-out")
    public ResponseEntity<Attendance> clockOut(@PathVariable Long employeeId) {
        Attendance attendance = attendanceService.clockOut(employeeId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/{employeeId}/{yearMonth}")
    public ResponseEntity<List<Attendance>> getMonthlyReportByEmployeeId(@PathVariable Long employeeId,
            @PathVariable String yearMonth) {
        // yearMonth は "YYYY-MM" 形式で受け取ります
        var year = Integer.parseInt(yearMonth.split("-")[0]);
        var month = Integer.parseInt(yearMonth.split("-")[1]);
        List<Attendance> attendances = attendanceService.getMonthlyReportByEmployeeId(employeeId, year, month);
        if (attendances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(attendances);
    }

}
