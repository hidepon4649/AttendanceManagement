package com.example.attendancemanager.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.model.Role;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("認証失敗です。: " + email));

        UserDetails user = User
                .withUsername(employee.getEmail())
                .password(employee.getPassword())
                .authorities(getAuthorities(employee.isAdmin()))
                .build();

        return user;

    }

    private Collection<? extends GrantedAuthority> getAuthorities(boolean isAdmin) {
        return isAdmin
                ? List.of(new SimpleGrantedAuthority(Role.ROLE_ADMIN.toString()),
                        new SimpleGrantedAuthority(Role.ROLE_USER.toString()))
                : List.of(new SimpleGrantedAuthority(Role.ROLE_USER.toString()));
    }
}
