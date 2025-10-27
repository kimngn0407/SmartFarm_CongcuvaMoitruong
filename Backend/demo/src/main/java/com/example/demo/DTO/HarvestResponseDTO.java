package com.example.demo.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HarvestResponseDTO {
    private Long id;
    private String fieldName;
    private String cropType;
    private LocalDate harvestDate;
    private Float quantity;
    private String quality;
    private String status;
    private String notes;
    private Long fieldId;
    private Long cropSeasonId;
} 