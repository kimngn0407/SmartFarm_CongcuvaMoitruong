package com.example.demo.DTO;
import lombok.*;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CropSeasonDTO {
    private Long id;
    private Long fieldId;
    private Long plantId;
    private String seasonName;
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    private LocalDate actualHarvestDate;
    private String note;
}
