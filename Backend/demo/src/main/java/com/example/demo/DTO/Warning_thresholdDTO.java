package com.example.demo.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Warning_thresholdDTO {
    private Long id;
    private Long cropSeasonId;
    private Float minTemperature;
    private Float maxTemperature;
    private Float minHumidity;
    private Float maxHumidity;
    private Float minSoilMoisture;
    private Float maxSoilMoisture;
}

