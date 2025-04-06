package com.example.attendancemanager.repository;

import com.example.attendancemanager.model.AccessLog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    // 指定した日付のアクセスログを取得
    @Query("SELECT a FROM AccessLog a WHERE a.accessDate = :accessDate")
    Optional<List<AccessLog>> findByAccessDate(@Param("accessDate") LocalDate accessDate);
}