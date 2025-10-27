package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HarvestSummaryDTO {
    private Long cropSeasonId;
    private Float totalYieldKg;
}
