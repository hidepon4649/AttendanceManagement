package com.example.attendancemanager.service;

import java.util.List;

import com.example.attendancemanager.model.AccessLog;

public interface AccessLogService {

    public List<AccessLog> getAccessLogsByDate(String date);

}