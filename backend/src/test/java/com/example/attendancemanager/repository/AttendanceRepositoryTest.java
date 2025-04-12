package com.example.attendancemanager.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@ActiveProfiles("test")
public class AttendanceRepositoryTest {

        @Autowired
        private AttendanceRepository attendanceRepository;

        private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");

        @Test
        @Sql({ "EmployeeRepositoryTest.sql",
                        "AttendanceRepositoryTest.sql"
        })
        public void testFindByEmployeeIdAndDate() {
                final LocalDate date = LocalDate.parse("2024-10-01"); // String を LocalDate に変換
                this.attendanceRepository.findByEmployeeIdAndDate(11L, date).ifPresentOrElse(
                                attendance -> {
                                        assertEquals(attendance.getEmployee().getId(), 11);
                                        assertEquals(attendance.getDate(), LocalDate.parse("2024-10-01"));
                                        assertEquals(attendance.getClockInTime(),
                                                        LocalDateTime.parse("2024-10-01 08:30:00.000000", formatter));
                                        assertEquals(attendance.getClockOutTime(),
                                                        LocalDateTime.parse("2024-10-01 17:30:00.000000", formatter));
                                },
                                () -> {
                                        fail("データが取得できませんでした。デバッグして下さい。");
                                });
        }

        @Test
        @Sql({ "EmployeeRepositoryTest.sql",
                        "AttendanceRepositoryTest.sql"
        })
        public void testFindByEmployeeIdAndYearAndMonth() {
                this.attendanceRepository.findByEmployeeIdAndYearAndMonth(11L, 2024, 10).ifPresentOrElse(
                                list -> {
                                        assertEquals(list.get(0).getEmployee().getId(), 11);
                                        assertEquals(list.get(0).getDate(), LocalDate.parse("2024-10-01"));
                                        assertEquals(list.get(0).getClockInTime(),
                                                        LocalDateTime.parse("2024-10-01 08:30:00.000000", formatter));
                                        assertEquals(list.get(0).getClockOutTime(),
                                                        LocalDateTime.parse("2024-10-01 17:30:00.000000", formatter));

                                },
                                () -> {
                                        fail("データが取得できませんでした。デバッグして下さい。");
                                });

        }

        @Test
        @Sql({ "EmployeeRepositoryTest.sql",
                        "AttendanceRepositoryTest.sql"
        })
        public void testFindByEmailAndPassword() {
                this.attendanceRepository.findByEmployeeId(11L).ifPresentOrElse(
                                list -> {
                                        assertEquals(list.get(0).getEmployee().getId(), 11);
                                        assertEquals(list.get(0).getDate(), LocalDate.parse("2024-10-01"));
                                        assertEquals(list.get(0).getClockInTime(),
                                                        LocalDateTime.parse("2024-10-01 08:30:00.000000", formatter));
                                        assertEquals(list.get(0).getClockOutTime(),
                                                        LocalDateTime.parse("2024-10-01 17:30:00.000000", formatter));

                                },
                                () -> {
                                        fail("データが取得できませんでした。デバッグして下さい。");
                                });
        }

}
