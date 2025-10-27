package com.example.demo.DTO;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class SensorDTO {
    private Long id;
    private Long fieldId;
    private String sensorName;
    private Double lat;
    private Double lng;
    private Integer pointOrder;
    private String type;
    private String status;
    private LocalDateTime installationDate;
}
