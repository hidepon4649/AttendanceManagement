package com.example.attendancemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.attendancemanager.entity.AccessLog;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    // // 指定した日付のアクセスログを取得
    // @Query("SELECT a FROM AccessLog a WHERE a.accessDate = :accessDate")
    // Optional<List<AccessLog>> findByAccessDate(@Param("accessDate") LocalDate
    // accessDate);

}