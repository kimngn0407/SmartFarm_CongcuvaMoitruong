package com.example.demo.DTO;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CompleteProfileDTO {
    private PersonalInfoDTO personalInfo;
    private StatisticsDTO statistics;
    private List<ActivityDTO> recentActivities;
    
    @Data
    public static class PersonalInfoDTO {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private String address;
        private String role;
        private String joinDate;
        private Integer profileCompletion;
    }
    
    @Data
    public static class StatisticsDTO {
        private Integer managedFarms;
        private Integer totalAreas;
        private Integer currentCrops;
        private Integer processedAlerts;
        private LocalDateTime lastLogin;
    }
    
    @Data
    public static class ActivityDTO {
        private Long id;
        private String action;
        private String description;
        private String icon;
        private LocalDateTime timestamp;
        private String type;
    }
} 