// package com.example.demo.Security;

// import com.example.demo.Entities.AccountEntity;
// import com.example.demo.Repositories.AccountRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.*;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.stereotype.Service;

// import java.util.Set;
// import java.util.stream.Collectors;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     @Autowired
//     private AccountRepository accountRepository;

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         AccountEntity account = accountRepository.findByEmail(email)
//                 .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy email: " + email));

//         // Ánh xạ role sang ROLE_... để Spring hiểu đúng
//         Set<SimpleGrantedAuthority> authorities = account.getRoles()
//                 .stream()
//                 .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
//                 .collect(Collectors.toSet());

//         return new User(account.getEmail(), account.getPassword(), authorities);
//     }
// }
