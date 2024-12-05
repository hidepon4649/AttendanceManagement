package com.example.attendancemanager.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // @Before("execution(* com.example.attendancemanager.controller..*(..))")
    @Before("within(@org.springframework.web.bind.annotation.RestController *)")
    public void logBefore(JoinPoint joinPoint) {

        String methodName = joinPoint.getSignature().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null && authentication.getPrincipal() instanceof UserDetails)
                ? ((UserDetails) authentication.getPrincipal()).getUsername()
                : "Anonymous";

        logger.info("User " + username + " is accessing method: " + methodName);

        // ユーザーのロールを取得
        if (authentication != null && authentication.getAuthorities() != null) {
            authentication.getAuthorities().forEach(authority -> {
                String role = authority.getAuthority();
                logger.info("User role: " + role);
            });
        }
    }

}