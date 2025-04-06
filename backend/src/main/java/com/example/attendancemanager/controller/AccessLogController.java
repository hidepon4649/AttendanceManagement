package com.example.attendancemanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendancemanager.model.AccessLog;
import com.example.attendancemanager.service.AccessLogService;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api/accesslogs")
public class AccessLogController {

    private final AccessLogService accessLogService;

    public AccessLogController(AccessLogService accessLogService) {
        this.accessLogService = accessLogService;
    }

    @GetMapping("/{date}")
    public List<AccessLog> getAccessLogsByDate(@PathVariable String date) {
        // date は "YYYY-MM-DD" 形式で受け取ります
        return accessLogService.getAccessLogsByDate(date);
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteAccessLog(@PathVariable Long id) {
    // accessLogRepository.deleteById(id);
    // return ResponseEntity.ok("Access log deleted");
    // }
}
