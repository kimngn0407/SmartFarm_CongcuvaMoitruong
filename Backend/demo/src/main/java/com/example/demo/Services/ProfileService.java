package com.example.demo.Services;

import com.example.demo.DTO.CompleteProfileDTO;
import com.example.demo.Entities.AccountEntity;
import com.example.demo.Repositories.AccountRepository;
import com.example.demo.Repositories.FarmRepository;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private FarmRepository farmRepository;
    
    @Autowired
    private FieldRepository fieldRepository;
    
    @Autowired
    private AlertRepository alertRepository;

    public CompleteProfileDTO getCompleteProfile(String email) {
        Optional<AccountEntity> accountOpt = accountRepository.findByEmail(email);
        
        if (accountOpt.isEmpty()) {
            throw new RuntimeException("Account not found");
        }
        
        AccountEntity account = accountOpt.get();
        CompleteProfileDTO profile = new CompleteProfileDTO();
        
        // Personal Info
        CompleteProfileDTO.PersonalInfoDTO personalInfo = new CompleteProfileDTO.PersonalInfoDTO();
        personalInfo.setId(account.getId());
        personalInfo.setFullName(account.getFullName());
        personalInfo.setEmail(account.getEmail());
        personalInfo.setPhone(account.getPhone() != null ? account.getPhone() : "Chưa cập nhật");
        personalInfo.setAddress(account.getAddress() != null ? account.getAddress() : "Chưa cập nhật");
        personalInfo.setRole(account.getRole().name());
        personalInfo.setJoinDate(account.getDateCreated() != null ? 
            account.getDateCreated().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy")) : 
            "01/01/2023");
        personalInfo.setProfileCompletion(calculateProfileCompletion(account));
        
        // Statistics
        CompleteProfileDTO.StatisticsDTO statistics = new CompleteProfileDTO.StatisticsDTO();
        statistics.setManagedFarms(countManagedFarms(account.getId()));
        statistics.setTotalAreas(countTotalAreas(account.getId()));
        statistics.setCurrentCrops(countCurrentCrops(account.getId()));
        statistics.setProcessedAlerts(countProcessedAlerts(account.getId()));
        statistics.setLastLogin(LocalDateTime.now().minusHours(2)); // Mock data
        
        // Recent Activities
        List<CompleteProfileDTO.ActivityDTO> activities = generateMockActivities();
        
        profile.setPersonalInfo(personalInfo);
        profile.setStatistics(statistics);
        profile.setRecentActivities(activities);
        
        return profile;
    }
    
    private Integer calculateProfileCompletion(AccountEntity account) {
        int completion = 0;
        if (account.getFullName() != null && !account.getFullName().trim().isEmpty()) completion += 20;
        if (account.getEmail() != null && !account.getEmail().trim().isEmpty()) completion += 20;
        if (account.getPhone() != null && !account.getPhone().trim().isEmpty()) completion += 20;
        if (account.getAddress() != null && !account.getAddress().trim().isEmpty()) completion += 20;
        if (account.getFarm() != null) completion += 10;
        if (account.getField() != null) completion += 10;
        return Math.min(completion, 100);
    }
    
    private Integer countManagedFarms(Long accountId) {
        // Count farms where account is owner or manager
        return 3; // Mock data for now
    }
    
    private Integer countTotalAreas(Long accountId) {
        // Count total fields managed by account
        return 12; // Mock data for now
    }
    
    private Integer countCurrentCrops(Long accountId) {
        // Count current active crops
        return 8; // Mock data for now
    }
    
    private Integer countProcessedAlerts(Long accountId) {
        // Count processed alerts
        return 15; // Mock data for now
    }
    
    private List<CompleteProfileDTO.ActivityDTO> generateMockActivities() {
        List<CompleteProfileDTO.ActivityDTO> activities = new ArrayList<>();
        
        // Activity 1: Login
        CompleteProfileDTO.ActivityDTO loginActivity = new CompleteProfileDTO.ActivityDTO();
        loginActivity.setId(1L);
        loginActivity.setAction("Đăng nhập hệ thống");
        loginActivity.setDescription("System login");
        loginActivity.setIcon("login");
        loginActivity.setTimestamp(LocalDateTime.now().minusHours(2));
        loginActivity.setType("LOGIN");
        activities.add(loginActivity);
        
        // Activity 2: Update crop
        CompleteProfileDTO.ActivityDTO updateActivity = new CompleteProfileDTO.ActivityDTO();
        updateActivity.setId(2L);
        updateActivity.setAction("Cập nhật thông tin cây trồng");
        updateActivity.setDescription("Update crop information");
        updateActivity.setIcon("edit");
        updateActivity.setTimestamp(LocalDateTime.now().minusDays(1));
        updateActivity.setType("UPDATE");
        activities.add(updateActivity);
        
        // Activity 3: Process alert
        CompleteProfileDTO.ActivityDTO alertActivity = new CompleteProfileDTO.ActivityDTO();
        alertActivity.setId(3L);
        alertActivity.setAction("Xử lý cảnh báo tưới tiêu");
        alertActivity.setDescription("Process irrigation alert");
        alertActivity.setIcon("warning");
        alertActivity.setTimestamp(LocalDateTime.now().minusDays(2));
        alertActivity.setType("ALERT");
        activities.add(alertActivity);
        
        // Activity 4: Add new area
        CompleteProfileDTO.ActivityDTO addActivity = new CompleteProfileDTO.ActivityDTO();
        addActivity.setId(4L);
        addActivity.setAction("Thêm mới khu vực trồng");
        addActivity.setDescription("Add new planting area");
        addActivity.setIcon("add");
        addActivity.setTimestamp(LocalDateTime.now().minusDays(3));
        addActivity.setType("CREATE");
        activities.add(addActivity);
        
        return activities;
    }
} 