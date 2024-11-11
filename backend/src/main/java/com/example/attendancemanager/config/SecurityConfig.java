// package com.example.attendancemanager.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> {
//                 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//                 CorsConfiguration config = new CorsConfiguration();
//                 config.setAllowCredentials(true);
//                 config.addAllowedOrigin("http://localhost:3000"); // 許可するオリジンを指定
//                 config.addAllowedHeader("*");
//                 config.addAllowedMethod("*");
//                 source.registerCorsConfiguration("/**", config);
//                 cors.configurationSource(source);
//             })
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     // 社員情報
//                     .requestMatchers("/api/employees").authenticated()
//                     .requestMatchers("/api/employees/**").authenticated()
//                     // 勤怠情報
//                     .requestMatchers("/api/attendance").authenticated()
//                     .requestMatchers("/api/attendance/**").authenticated()
//             )
//             .httpBasic(Customizer.withDefaults())
//             .csrf(csrf -> csrf.disable()); // CSRFを無効化

//         return http.build();
//     }

// }
