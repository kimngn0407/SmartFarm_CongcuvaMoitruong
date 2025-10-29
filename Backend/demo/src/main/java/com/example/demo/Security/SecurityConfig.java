// package com.example.demo.Security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
//         this.jwtFilter = jwtFilter;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         return http.csrf(csrf -> csrf.disable())
//                 .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
// //                .authorizeHttpRequests(auth -> auth
// //
// //                        // Public endpoints
// //                        .requestMatchers("/api/accounts/register", "/api/accounts/login").permitAll()
// //
// //                        // Account-related
// //                        .requestMatchers("/api/accounts/all", "/api/accounts/{id}/assign", "/api/accounts/{id}/role").hasRole("ADMIN")
// //                        .requestMatchers("/api/accounts/profile", "/api/accounts/updateprofile")
// //                        .hasAnyRole("ADMIN", "FARM_OWNER", "TECHNICIAN", "FARMER")
// //
// //                        // Admin: full access
// //                        .requestMatchers("/api/plants/**", "/api/farms/**", "/api/fields/**").hasRole("ADMIN")
// //                        .requestMatchers("/api/thresholds/**").hasAnyRole("ADMIN", "TECHNICIAN") // Fine-grained control in controller
// //                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
// //
// //                        // Farm Owner
// //                        .requestMatchers(
// //                                "/api/farms/**",
// //                                "/api/fields/**",
// //                                "/api/harvest/**",
// //                                "/api/irrigation/**",
// //                                "/api/fertilization/**",
// //                                "/api/sensors/**",
// //                                "/api/sensor-data/**"
// //                        ).hasAnyRole("ADMIN","FARM_OWNER", "TECHNICIAN", "FARMER") // Allow view access; update controlled by @PreAuthorize
// //
// //                        // Technician
// //                        .requestMatchers(
// //                                "/api/sensors/**",
// //                                "/api/thresholds/**",
// //                                "/api/irrigation/**",
// //                                "/api/fertilization/**"
// //                        ).hasAnyRole("TECHNICIAN", "ADMIN")
// //
// //                        // Farmer
// //                        .requestMatchers(
// //                                "/api/harvest/**",
// //                                "/api/irrigation/**",
// //                                "/api/fertilization/**",
// //                                "/api/sensor-data/**"
// //                        ).hasAnyRole("ADMIN","FARMER", "FARM_OWNER", "TECHNICIAN")
// //
// //                        // Any other request requires authentication
// //                        .anyRequest().authenticated()
//                 .authorizeHttpRequests(auth -> auth
//                         //  Public endpoints
//                         .requestMatchers("/api/accounts/register", "/api/accounts/login").permitAll()

//                         //  Admin-only endpoints
//                         .requestMatchers("/api/accounts/all", "/api/accounts/{id}/assign", "/api/accounts/{id}/role").hasRole("ADMIN")
//                         .requestMatchers("/api/plants/**").hasRole("ADMIN")
//                         .requestMatchers("/api/admin/**").hasRole("ADMIN")

//                         //  Authenticated user profile
//                         .requestMatchers("/api/accounts/profile", "/api/accounts/updateprofile")
//                         .hasAnyRole("ADMIN", "FARM_OWNER", "TECHNICIAN", "FARMER")

//                         //  Farm viewing only (Farmer không thêm/sửa/xóa)
//                         .requestMatchers(HttpMethod.GET, "/api/farms/**", "/api/fields/**", "/api/sensors/**", "/api/plants/**")
//                         .hasAnyRole("ADMIN", "FARM_OWNER", "TECHNICIAN", "FARMER")

//                         //  Farm Owner and Technician can write to farms/fields/sensors/plants
//                         .requestMatchers("/api/farms/**", "/api/fields/**", "/api/sensors/**", "/api/plants/**")
//                         .hasAnyRole("ADMIN", "FARM_OWNER", "TECHNICIAN")

//                         //  Farmer functional routes (realistic actions)
//                         .requestMatchers("/api/harvest/**", "/api/irrigation/**", "/api/fertilization/**", "/api/sensor-data/**")
//                         .hasAnyRole("FARMER", "FARM_OWNER", "TECHNICIAN", "ADMIN")

//                         //  Threshold and alert-related
//                         .requestMatchers("/api/thresholds/**").hasAnyRole("TECHNICIAN", "ADMIN")

//                         // 🔐 Catch-all
//                         .anyRequest().authenticated()

//                 )
//                 .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//                 .build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
//             throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }
