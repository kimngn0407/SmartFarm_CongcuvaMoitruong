package com.example.demo.DTO;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class PlantDTO {
    private Long id;
    private String plantName;
    private String description;
}

