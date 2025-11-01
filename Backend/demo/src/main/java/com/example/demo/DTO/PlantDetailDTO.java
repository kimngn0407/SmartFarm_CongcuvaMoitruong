package com.example.demo.DTO;
import lombok .*;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@Setter @Getter
@Data
public class PlantDetailDTO {
    private Long id;
    private String name;
    private List<CropSeasonDTO> cropSeasons;
    private List<CropGrowthStageDTO> cropGrowthStages;
}

