package com.example.attendancemanager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendancemanager.entity.Attendance;
import com.example.attendancemanager.service.AttendanceService;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

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
        return ResponseEntity.ok(attendances);
    }

    @PostMapping("/{employeeId}/{date}/remarks")
    public ResponseEntity<Attendance> remark(@PathVariable Long employeeId, @PathVariable String date,
            @RequestBody Map<String, String> requestBody) {
        String remarks = requestBody.get("remarks");
        // date は "YYYY-MM-DD" 形式で受け取ります
        Attendance attendance = attendanceService.remarks(employeeId, date, remarks);
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/{employeeId}/{date}")
    public ResponseEntity<Attendance> add(@PathVariable Long employeeId, @PathVariable String date) {
        // date は "YYYY-MM-DD" 形式で受け取ります
        Attendance attendance = attendanceService.add(employeeId, date);
        return ResponseEntity.ok(attendance);
    }

    @PutMapping("/maintenance/{attendanceId}")
    public ResponseEntity<Attendance> edit(@PathVariable Long attendanceId,
            @RequestBody Map<String, String> requestBody) {

        String newClockInTime = requestBody.get("clockInTime");
        String newClockOutTime = requestBody.get("clockOutTime");
        // date は "YYYY-MM-DD" 形式で受け取ります

        String temp = requestBody.get("breakMinutes");
        int breakMinutes = Integer.parseInt(temp == null ? "0" : temp);

        Attendance attendance = attendanceService.edit(attendanceId, newClockInTime, newClockOutTime, breakMinutes);

        return ResponseEntity.ok(attendance);
    }

    @DeleteMapping("/maintenance/{attendanceId}")
    public ResponseEntity<Attendance> delete(@PathVariable Long attendanceId) {
        Attendance deletedAttendance = attendanceService.delete(attendanceId);
        return ResponseEntity.ok(deletedAttendance);
    }
}
