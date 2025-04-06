package com.example.attendancemanager.aspect;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.attendancemanager.model.AccessLog;
import com.example.attendancemanager.repository.AccessLogRepository;

@Aspect
@Component
public class LoggingAspect {

        private final AccessLogRepository accessLogRepository;

        public LoggingAspect(AccessLogRepository accessLogRepository) {
                this.accessLogRepository = accessLogRepository;
        }

        @Before("within(@org.springframework.web.bind.annotation.RestController *)")
        public void logBefore(JoinPoint joinPoint) {

                String className = joinPoint.getSignature().getDeclaringTypeName();
                String methodName = joinPoint.getSignature().getName();
                String methodParams = Arrays.toString(joinPoint.getArgs());
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String username = (authentication != null && authentication.getPrincipal() instanceof UserDetails)
                                ? ((UserDetails) authentication.getPrincipal()).getUsername()
                                : "Anonymous";

                // ユーザーのロールを取得
                String userRoles = (authentication != null && authentication.getAuthorities() != null)
                                ? authentication.getAuthorities().stream()
                                                .map(authority -> authority.getAuthority())
                                                .collect(Collectors.joining(","))
                                : "None";

                // ログをデータベースに記録
                AccessLog accessLog = new AccessLog();
                accessLog.setUsername(username);
                accessLog.setClassName(className);
                accessLog.setMethodName(methodName);
                accessLog.setMethodParams(methodParams);
                accessLog.setUserRoles(userRoles);
                accessLog.setAccessDate(LocalDate.now());
                accessLog.setAccessTime(LocalDateTime.now());
                accessLogRepository.save(accessLog);

        }
}