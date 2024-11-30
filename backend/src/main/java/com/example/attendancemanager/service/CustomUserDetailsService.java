package com.example.attendancemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee != null) {
            UserDetails user = User
                    .withUsername(employee.getEmail())
                    .password(employee.getPassword())
                    .authorities((employee.isAdmin() ? "ADMIN" : "USER"))
                    .build();
            return user;

        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

    }
}
