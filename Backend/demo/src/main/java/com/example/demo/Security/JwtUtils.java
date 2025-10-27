// package com.example.demo.Security;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.nio.charset.StandardCharsets;
// import java.security.Key;
// import java.util.Date;

// @Component
// public class JwtUtils {

//     private final String jwtSecret = "mySuperSecureSmartFarmKey_1234567890_abcdefghij_KLMNOPQRSTUVWXYZ";

//     private final long jwtExpirationMs = 86400000;

//     private Key getSigningKey() {
//         return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
//     }

//     public String generateToken(UserDetails userDetails) {
//         var roles = userDetails.getAuthorities().stream()
//                 .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
//                 .toList();

//         return Jwts.builder()
//                 .setSubject(userDetails.getUsername())
//                 .claim("roles", roles)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ✅ Đổi HS512 → HS256
//                 .compact();
//     }

//     public String extractUsername(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody()
//                 .getSubject();
//     }

//     public boolean validateToken(String token, UserDetails userDetails) {
//         try {
//             final String username = extractUsername(token);
//             return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }

//     private boolean isTokenExpired(String token) {
//         Date expiration = Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody()
//                 .getExpiration();
//         return expiration.before(new Date());
//     }
// }
