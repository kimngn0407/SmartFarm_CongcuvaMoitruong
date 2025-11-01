package com.example.demo.DTO;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CoordinatesDTO {
    private Long id;
    private Long fieldId;
    private Double lat;
    private Double lng;
    private Integer pointOrder;
}
