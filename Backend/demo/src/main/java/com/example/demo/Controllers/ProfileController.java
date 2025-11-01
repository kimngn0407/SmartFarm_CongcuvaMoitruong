package com.example.demo.Controllers;

import com.example.demo.DTO.CompleteProfileDTO;
import com.example.demo.DTO.AccountDTO;
import com.example.demo.Services.ProfileService;
import com.example.demo.Services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private AccountService accountService;

    @GetMapping("/complete")
    public ResponseEntity<CompleteProfileDTO> getCompleteProfile(@RequestParam String email) {
        try {
            CompleteProfileDTO profile = profileService.getCompleteProfile(email);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/statistics/{accountId}")
    public ResponseEntity<CompleteProfileDTO.StatisticsDTO> getAccountStatistics(@PathVariable Long accountId) {
        try {
            // For now, return mock data
            CompleteProfileDTO.StatisticsDTO statistics = new CompleteProfileDTO.StatisticsDTO();
            statistics.setManagedFarms(3);
            statistics.setTotalAreas(12);
            statistics.setCurrentCrops(8);
            statistics.setProcessedAlerts(15);
            statistics.setLastLogin(java.time.LocalDateTime.now().minusHours(2));
            
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/activities/{accountId}")
    public ResponseEntity<java.util.List<CompleteProfileDTO.ActivityDTO>> getRecentActivities(
            @PathVariable Long accountId,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            // For now, return mock data
            java.util.List<CompleteProfileDTO.ActivityDTO> activities = new java.util.ArrayList<>();
            
            CompleteProfileDTO.ActivityDTO activity = new CompleteProfileDTO.ActivityDTO();
            activity.setId(1L);
            activity.setAction("Đăng nhập hệ thống");
            activity.setDescription("System login");
            activity.setIcon("login");
            activity.setTimestamp(java.time.LocalDateTime.now().minusHours(2));
            activity.setType("LOGIN");
            activities.add(activity);
            
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestParam String email, @RequestBody java.util.Map<String, Object> profileData) {
        try {
            // Debug logging
            System.out.println("=== PROFILE UPDATE DEBUG ===");
            System.out.println("Email: " + email);
            System.out.println("Received data: " + profileData);
            
            // Convert the map to AccountDTO for AccountService
            AccountDTO accountDTO = new AccountDTO();
            accountDTO.setFullName((String) profileData.get("fullName"));
            accountDTO.setEmail((String) profileData.get("email"));
            accountDTO.setPhone((String) profileData.get("phone"));
            accountDTO.setAddress((String) profileData.get("address"));
            
            // Debug logging
            System.out.println("AccountDTO - FullName: " + accountDTO.getFullName());
            System.out.println("AccountDTO - Email: " + accountDTO.getEmail());
            System.out.println("AccountDTO - Phone: " + accountDTO.getPhone());
            System.out.println("AccountDTO - Address: " + accountDTO.getAddress());
            System.out.println("==========================");
            
            // Update profile info using AccountService
            String result = accountService.updateProfile(email, accountDTO);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("ERROR in updateProfile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update profile: " + e.getMessage());
        }
    }

    @PutMapping("/password/change")
    public ResponseEntity<String> changePassword(
            @RequestParam String email,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        try {
            System.out.println("=== PASSWORD CHANGE DEBUG ===");
            System.out.println("Email: " + email);
            System.out.println("Old Password: " + oldPassword);
            System.out.println("New Password: " + newPassword);
            
            // Use AccountService to change password
            String result = accountService.changePassword(email, oldPassword, newPassword);
            
            System.out.println("Password change result: " + result);
            System.out.println("=============================");
            
            if (result.contains("thành công")) {
                return ResponseEntity.ok()
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body(result);
            } else {
                return ResponseEntity.badRequest()
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body(result);
            }
        } catch (Exception e) {
            System.out.println("ERROR in changePassword: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("Failed to change password: " + e.getMessage());
        }
    }
} 