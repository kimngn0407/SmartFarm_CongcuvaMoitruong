package com.example.demo.Services;

import com.example.demo.DTO.AccountDTO;
import com.example.demo.Entities.AccountEntity;
import com.example.demo.Entities.FarmEntity;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Repositories.AccountRepository;
import com.example.demo.Repositories.FarmRepository;
import com.example.demo.Repositories.FieldRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final FarmRepository farmRepository;
    private final FieldRepository fieldRepository;

    public AccountService(AccountRepository accountRepository,
                          FarmRepository farmRepository,
                          FieldRepository fieldRepository) {
        this.accountRepository = accountRepository;
        this.farmRepository = farmRepository;
        this.fieldRepository = fieldRepository;
    }

    public Optional<AccountEntity> getByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Transactional
    public String register(String fullName, String email, String password, String role) {
        if (accountRepository.findByEmail(email).isPresent()) {
            return "Email đã tồn tại!";
        }

        AccountEntity.Role roleEnum;
        try {
            roleEnum = AccountEntity.Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return "Vai trò không hợp lệ! Chọn một trong: ADMIN, FARMER, TECHNICIAN, FARM_OWNER.";
        }

        AccountEntity accountEntity = new AccountEntity();
        accountEntity.setFullName(fullName);
        accountEntity.setEmail(email);
        accountEntity.setPassword(password);
        accountEntity.setRole(roleEnum);

        accountRepository.save(accountEntity);
        return "Đăng ký thành công!";
    }

    public String login(String email, String password) {
        Optional<AccountEntity> accountOpt = accountRepository.findByEmail(email);

        if (accountOpt.isEmpty() || !accountOpt.get().getPassword().equals(password)) {
            return "Email hoặc mật khẩu không đúng!";
        }

        return "Đăng nhập thành công!";
    }

    @Transactional
    public String updateProfile(String email, AccountDTO dto) {
        System.out.println("=== ACCOUNT SERVICE UPDATE DEBUG ===");
        System.out.println("Email: " + email);
        System.out.println("DTO FullName: " + dto.getFullName());
        System.out.println("DTO Phone: " + dto.getPhone());
        System.out.println("DTO Address: " + dto.getAddress());
        
        Optional<AccountEntity> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            System.out.println("Account not found!");
            return "Không tìm thấy tài khoản!";
        }

        AccountEntity account = accountOpt.get();
        System.out.println("Before update - Phone: " + account.getPhone() + ", Address: " + account.getAddress());
        
        if (dto.getFullName() != null) account.setFullName(dto.getFullName());
        if (dto.getPassword() != null) account.setPassword(dto.getPassword());
        if (dto.getPhone() != null) account.setPhone(dto.getPhone());
        if (dto.getAddress() != null) account.setAddress(dto.getAddress());
        if (dto.getRole() != null) {
            try {
                account.setRole(AccountEntity.Role.valueOf(dto.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                return "Vai trò không hợp lệ!";
            }
        }

        System.out.println("After update - Phone: " + account.getPhone() + ", Address: " + account.getAddress());
        
        accountRepository.save(account);
        System.out.println("Account saved successfully!");
        System.out.println("=====================================");
        
        return "Cập nhật thông tin thành công!";
    }

    private AccountDTO convertToDTO(AccountEntity account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setFullName(account.getFullName());
        dto.setEmail(account.getEmail());
        dto.setPhone(account.getPhone());
        dto.setAddress(account.getAddress());
        dto.setRole(account.getRole().name());

        if (account.getFarm() != null) {
            dto.setFarmId(account.getFarm().getId());
            dto.setFarmName(account.getFarm().getFarmName());  // lấy tên farm
        }
        if (account.getField() != null) {
            dto.setFieldId(account.getField().getId());
            dto.setFieldName(account.getField().getFieldName()); // lấy tên field
        }

        return dto;
    }


    public AccountDTO getProfileByEmail(String email) {
        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(account);
    }

    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Transactional
    public String updateRole(Long id, String role) {
        Optional<AccountEntity> accountOpt = accountRepository.findById(id);
        if (accountOpt.isEmpty()) {
            return "Không tìm thấy tài khoản!";
        }

        AccountEntity account = accountOpt.get();
        try {
            AccountEntity.Role newRole = AccountEntity.Role.valueOf(role.toUpperCase());
            account.setRole(newRole);
            accountRepository.save(account);
            return "Cập nhật vai trò thành công!";
        } catch (IllegalArgumentException e) {
            return "Vai trò không hợp lệ! Chọn một trong: ADMIN, FARMER, TECHNICIAN, FARM_OWNER.";
        }
    }

    // ✅ MỚI: Gán role + farm + field cho tài khoản
    @Transactional
    public String updateRoleAndAssignment(Long id, String role, Long farmId, Long fieldId) {
        Optional<AccountEntity> accountOpt = accountRepository.findById(id);
        if (accountOpt.isEmpty()) {
            return "Không tìm thấy tài khoản!";
        }

        AccountEntity account = accountOpt.get();

        try {
            AccountEntity.Role newRole = AccountEntity.Role.valueOf(role.toUpperCase());
            account.setRole(newRole);

            if (farmId != null) {
                FarmEntity farm = farmRepository.findById(farmId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy Farm với ID: " + farmId));
                account.setFarm(farm);
            }

            if (fieldId != null) {
                FieldEntity field = fieldRepository.findById(fieldId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy Field với ID: " + fieldId));
                account.setField(field);
            }

            accountRepository.save(account);
            return "Phân quyền và gán farm/field thành công!";
        } catch (IllegalArgumentException e) {
            return "Vai trò không hợp lệ! Chọn một trong: ADMIN, FARMER, TECHNICIAN, FARM_OWNER.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    @Transactional
    public String changePassword(String email, String oldPassword, String newPassword) {
        System.out.println("=== ACCOUNT SERVICE PASSWORD CHANGE ===");
        
        Optional<AccountEntity> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            System.out.println("Account not found!");
            return "Không tìm thấy tài khoản!";
        }

        AccountEntity account = accountOpt.get();
        System.out.println("Current password in DB: " + account.getPassword());
        System.out.println("Old password provided: " + oldPassword);
        
        // Check if old password matches
        if (!account.getPassword().equals(oldPassword)) {
            System.out.println("Old password does not match!");
            return "Mật khẩu hiện tại không đúng!";
        }
        
        // Update password (for now, store as plain text - should be hashed in production)
        account.setPassword(newPassword);
        accountRepository.save(account);
        
        System.out.println("Password updated successfully!");
        System.out.println("New password in DB: " + account.getPassword());
        System.out.println("=====================================");
        
        return "Đổi mật khẩu thành công!";
    }
}
