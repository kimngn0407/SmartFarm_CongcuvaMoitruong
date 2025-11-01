package com.example.demo.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropGrowthStageDTO {
    private Long id;
    private Long plantId;
    private String stageName;
    private int minDay;
    private int maxDay;
    private String description;
}
