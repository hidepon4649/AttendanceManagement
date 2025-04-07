package com.example.attendancemanager.repository;

import com.example.attendancemanager.model.AccessLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    // // 指定した日付のアクセスログを取得
    // @Query("SELECT a FROM AccessLog a WHERE a.accessDate = :accessDate")
    // Optional<List<AccessLog>> findByAccessDate(@Param("accessDate") LocalDate
    // accessDate);

}