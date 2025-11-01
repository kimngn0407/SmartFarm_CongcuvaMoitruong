package com.example.demo.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantFlatStageDTO {
    private Long id;            // plantId
    private Long growthStageId; // growthStageId for delete/edit operations
    private String name;        // plantName
    private String seasonName;
    private String stageName;
    private int minDay;
    private int maxDay;
    private String description;
}
