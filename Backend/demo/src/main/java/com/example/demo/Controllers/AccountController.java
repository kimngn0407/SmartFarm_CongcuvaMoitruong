package com.example.demo.Controllers;

import com.example.demo.DTO.AccountDTO;
import com.example.demo.Entities.AccountEntity;
import com.example.demo.Services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AccountDTO accountDTO) {
        String response = accountService.register(
                accountDTO.getFullName(),
                accountDTO.getEmail(),
                accountDTO.getPassword(),
                accountDTO.getRole()
        );

        if (response.contains("không hợp lệ") || response.contains("đã tồn tại")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AccountDTO accountDTO) {
        String response = accountService.login(accountDTO.getEmail(), accountDTO.getPassword());

        if (response.equals("Email hoặc mật khẩu không đúng!")) {
            return ResponseEntity.status(401).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        Optional<AccountEntity> accountOpt = accountService.getByEmail(email);

        if (accountOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        AccountEntity account = accountOpt.get();

        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setFullName(account.getFullName());
        dto.setEmail(account.getEmail());
        dto.setPhone(account.getPhone());
        dto.setAddress(account.getAddress());
        dto.setRole(account.getRole().name());

        if (account.getFarm() != null) {
            dto.setFarmId(account.getFarm().getId());
            dto.setFarmName(account.getFarm().getFarmName());
        }

        if (account.getField() != null) {
            dto.setFieldId(account.getField().getId());
            dto.setFieldName(account.getField().getFieldName());
        }

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/updateprofile")
    public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody AccountDTO updateDTO) {
        String result = accountService.updateProfile(email, updateDTO);
        if (result.equals("Không tìm thấy tài khoản!")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfileDirect(@RequestParam String email, @RequestBody AccountDTO updateDTO) {
        String result = accountService.updateProfile(email, updateDTO);
        if (result.equals("Không tìm thấy tài khoản!")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public List<AccountDTO> getAllAccounts() {
        List<AccountEntity> accounts = accountService.getAllAccounts();
        return accounts.stream().map(account -> {
            AccountDTO dto = new AccountDTO();
            dto.setId(account.getId());
            dto.setFullName(account.getFullName());
            dto.setEmail(account.getEmail());
            dto.setPhone(account.getPhone());
            dto.setAddress(account.getAddress());
            dto.setRole(account.getRole().name());

            if (account.getFarm() != null) {
                dto.setFarmId(account.getFarm().getId());
                dto.setFarmName(account.getFarm().getFarmName());
            }

            if (account.getField() != null) {
                dto.setFieldId(account.getField().getId());
                dto.setFieldName(account.getField().getFieldName());
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateRole(@PathVariable Long id, @RequestBody AccountDTO dto) {
        String result = accountService.updateRole(id, dto.getRole());
        if (result.contains("không hợp lệ") || result.contains("Không tìm thấy")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    // 🔥 API mới: Cập nhật role + farm + field cho tài khoản
    @PutMapping("/{id}/assign")
    public ResponseEntity<String> updateRoleAndAssignment(
            @PathVariable Long id,
            @RequestBody AccountDTO dto) {
        try {
            String response = accountService.updateRoleAndAssignment(
                    id,
                    dto.getRole(),
                    dto.getFarmId(),
                    dto.getFieldId()
            );

            if (response.contains("không hợp lệ") || response.contains("Không tìm thấy")) {
                return ResponseEntity.badRequest().body(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
