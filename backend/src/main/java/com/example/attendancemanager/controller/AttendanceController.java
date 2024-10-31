package com.example.attendancemanager.controller;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/clock-in")
    public ResponseEntity<Attendance> clockIn(@RequestBody Map<String, String> clockInData) {
        Long employeeId = Long.parseLong(clockInData.get("employeeId"));
        Attendance attendance = attendanceService.clockIn(employeeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendance);
    }

    @PostMapping("/clock-out")
    public ResponseEntity<Attendance> clockOut(@RequestBody Map<String, String> clockOutData) {
        Long employeeId = Long.parseLong(clockOutData.get("employeeId"));
        Attendance attendance = attendanceService.clockOut(employeeId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/report/{month}")
    public List<Attendance> getMonthlyReport(@PathVariable String month) {
        return attendanceService.getMonthlyReport(month);
    }

    @GetMapping("/{employee_id}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployeeId(@PathVariable("employee_id") Long employeeId) {
        List<Attendance> attendances = attendanceService.getAttendanceByEmployeeId(employeeId);
        if (attendances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(attendances);
    }
}
