package com.example.attendancemanager.controller;

import static java.net.URI.create;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.attendancemanager.dto.EmployeeDto;
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
    public ResponseEntity<List<Employee>> getAllEmployees(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/{id}/picture")
    public ResponseEntity<byte[]> getPicture(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        byte[] image = employee.getPicture();

        if (image == null || image.length == 0) {
            return ResponseEntity.notFound().build();
        }

        String mimeType = detectImageMimeType(image);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(mimeType));
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

    private String detectImageMimeType(byte[] imageBytes) {
        try (ImageInputStream iis = ImageIO.createImageInputStream(new ByteArrayInputStream(imageBytes))) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
            if (readers.hasNext()) {
                ImageReader reader = readers.next();
                String formatName = reader.getFormatName();
                switch (formatName.toLowerCase()) {
                    case "jpeg":
                    case "jpg":
                        return "image/jpeg";
                    case "png":
                        return "image/png";
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEmployee(
            @Validated @ModelAttribute EmployeeDto dto,
            BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);

        }
        // 暗号化前のパスワードに対してサイズ制限をチェック
        if (!validatePassword(dto.getPassword())) {

            Map<String, String> errors = new HashMap<>();
            errors.put("password", "パスワードの長さは 8〜24文字です。");
            return ResponseEntity.badRequest().body(errors);
        }
        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        employee.setAdmin(dto.isAdmin());

        MultipartFile picture = dto.getPicture();
        if (picture != null && !picture.isEmpty()) {
            try {
                employee.setPicture(picture.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("画像の読み込みに失敗しました");
            }
        }

        Employee newEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity
                .created(create("/api/employees/" + newEmployee.getId()))
                .body(newEmployee);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateEmployee(
            @PathVariable Long id,
            @Validated @ModelAttribute EmployeeDto dto,
            BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);

        }

        // ここではパスワードは変更しない。
        // パスワード更新は専用のエンドポイント/画面を作成する。
        // // 暗号化前のパスワードに対してサイズ制限をチェック
        // if (!validatePassword(dto.getPassword())) {
        // Map<String, String> errors = new HashMap<>();
        // errors.put("password", "パスワードの長さは 8〜24文字です。");
        // return ResponseEntity.badRequest().body(errors);
        // }

        Employee employee = employeeService.getEmployeeById(id);
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        // ここではパスワードは変更しない。
        // パスワード更新は専用のエンドポイント/画面を作成する。
        // employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        employee.setAdmin(dto.isAdmin());

        MultipartFile picture = dto.getPicture();
        if (picture != null && !picture.isEmpty()) {
            try {
                employee.setPicture(picture.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("画像の読み込みに失敗しました");
            }
        }

        employeeService.saveEmployee(employee);
        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    private static boolean validatePassword(String password) {
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

}
