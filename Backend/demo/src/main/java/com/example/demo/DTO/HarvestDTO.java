package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HarvestDTO {
    private Long id;
    private Long cropSeasonId;
    private Float yieldKg;
    private LocalDate harvestDate;
}
