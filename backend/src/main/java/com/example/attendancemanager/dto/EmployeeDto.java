package com.example.attendancemanager.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmployeeDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "名前は必須です")
    @Size(min = 2, max = 24, message = "名前は{min}文字以上、{max}文字以下です")
    private String name;
    @NotBlank(message = "メールアドレスは必須です")
    @Email(message = "メールアドレスが不正です")
    private String email;
    @NotBlank(message = "パスワードは必須です")
    private String password;
    private boolean isAdmin;

    private MultipartFile picture;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public MultipartFile getPicture() {
        return picture;
    }

    public void setPicture(MultipartFile picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", isAdmin="
                + isAdmin + "]";
    }

}
