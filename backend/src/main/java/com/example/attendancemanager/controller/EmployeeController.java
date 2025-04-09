package com.example.attendancemanager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.service.EmployeeService;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api/employees")
public class EmployeeController {

    private static final String PASSWORD_PATTERN = "^[a-zA-Z0-9_]{8,24}$";
    private final EmployeeService employeeService;
    private final PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService, PasswordEncoder passwordEncoder) {
        this.employeeService = employeeService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Employee> getAllEmployees(@AuthenticationPrincipal UserDetails userDetails) {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@Validated @RequestBody Employee employee, BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);

        }
        // 暗号化前のパスワードに対してサイズ制限をチェック
        if (!validatePassword(employee.getPassword())) {

            Map<String, String> errors = new HashMap<>();
            errors.put("password", "パスワードの長さは 8〜24文字です。");
            return ResponseEntity.badRequest().body(errors);
        }
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        Employee newEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @Validated @RequestBody Employee updateEmployee,
            BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);

        }

        // 暗号化前のパスワードに対してサイズ制限をチェック
        if (!validatePassword(updateEmployee.getPassword())) {
            Map<String, String> errors = new HashMap<>();
            errors.put("password", "パスワードの長さは 8〜24文字です。");
            return ResponseEntity.badRequest().body(errors);
        }

        employeeService.getEmployeeById(id);
        updateEmployee.setPassword(passwordEncoder.encode(updateEmployee.getPassword()));
        updateEmployee.setId(id);
        employeeService.saveEmployee(updateEmployee);
        return ResponseEntity.ok(updateEmployee);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("社員を削除しました。:" + employee);
    }

    private static boolean validatePassword(String password) {
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

}
