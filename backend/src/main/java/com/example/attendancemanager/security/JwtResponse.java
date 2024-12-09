package com.example.attendancemanager.security;

import java.util.List;

public class JwtResponse {

    private String token;
    private String username;
    private List<String> roles;

    public JwtResponse(String username, List<String> roles, String token) {
        this.username = username;
        this.roles = roles;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
// package com.example.attendancemanager.model;

// public class JwtResponse {
// private String token;

// public JwtResponse(String token) {
// this.token = token;
// }

// public String getToken() {
// return token;
// }

// public void setToken(String token) {
// this.token = token;
// }
// }
