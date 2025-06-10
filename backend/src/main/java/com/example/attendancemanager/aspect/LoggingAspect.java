package com.example.attendancemanager.aspect;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.attendancemanager.entity.AccessLog;
import com.example.attendancemanager.repository.AccessLogRepository;

@Aspect
@Component
public class LoggingAspect {

        private final ZoneId myZoneId;
        private final AccessLogRepository accessLogRepository;

        public LoggingAspect(
                        AccessLogRepository accessLogRepository,
                        @Value("${app.timezone}") String timezone) {

                this.accessLogRepository = accessLogRepository;
                this.myZoneId = ZoneId.of(timezone);
        }

        @Pointcut("within(@org.springframework.web.bind.annotation.RestController)")
        public void controllerMethods() {
        }

        @Before("controllerMethods()")
        public void logBefore(JoinPoint joinPoint) {
                AccessLog accessLog = createAccessLog(joinPoint, Arrays.toString(joinPoint.getArgs()), null);
                accessLogRepository.save(accessLog);
        }

        @AfterThrowing(pointcut = "controllerMethods()", throwing = "error")
        public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
                AccessLog accessLog = createAccessLog(joinPoint, null, error.getMessage());
                accessLogRepository.save(accessLog);
        }

        private AccessLog createAccessLog(JoinPoint joinPoint, String methodParams, String errorMessage) {
                String className = joinPoint.getSignature().getDeclaringTypeName();
                String methodName = joinPoint.getSignature().getName();
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String username = (authentication != null && authentication.getPrincipal() instanceof UserDetails)
                                ? ((UserDetails) authentication.getPrincipal()).getUsername()
                                : "Anonymous";
                String userRoles = (authentication != null && authentication.getAuthorities() != null)
                                ? authentication.getAuthorities().stream()
                                                .map(authority -> authority.getAuthority())
                                                .collect(Collectors.joining(","))
                                : "None";

                AccessLog accessLog = new AccessLog();
                accessLog.setUsername(username);
                accessLog.setClassName(className);
                accessLog.setMethodName(methodName);
                accessLog.setMethodParams(methodParams != null ? methodParams : "");
                accessLog.setErrorMessage(errorMessage != null ? errorMessage : "");
                accessLog.setUserRoles(userRoles);
                accessLog.setAccessDate(LocalDate.now(myZoneId));
                accessLog.setAccessTime(LocalDateTime.now(myZoneId));
                return accessLog;
        }

}