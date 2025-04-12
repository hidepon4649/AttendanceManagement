package com.example.attendancemanager.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import com.example.attendancemanager.entity.AccessLog;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@ActiveProfiles("test")
public class AccessLogServiceImplTest {

    @Autowired
    private AccessLogServiceImpl accessLogService;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");

    @Test
    @Sql("AccessLogServiceImplTest.sql")
    public void testGetAccessLogsByDate() {
        // テスト用の日付を指定
        String testDate = "2024-01-01";

        // メソッドを呼び出す
        List<AccessLog> actualList = accessLogService.getAccessLogsByDate(testDate);

        assertEquals(LocalDate.parse("2024-01-01"), actualList.get(0).getAccessDate());
        assertEquals(LocalDateTime.parse("2024-01-01 09:00:00.000000", formatter),
                actualList.get(0).getAccessTime());
        assertEquals("伊藤博文", actualList.get(0).getUsername());

    }

}
