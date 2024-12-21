package com.example.attendancemanager.security;

import java.util.List;

import com.example.attendancemanager.model.Employee;

public class JwtResponse {

    private String token;
    private Employee employee;
    private List<String> roles;

    public JwtResponse(Employee employee, List<String> roles, String token) {
        this.employee = employee;
        this.roles = roles;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

}
