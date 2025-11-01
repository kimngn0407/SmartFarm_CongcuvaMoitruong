package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class SensorDataDTO {
    private Long id;
    private Long sensorId;
    private Float value;
    private LocalDateTime time;
}
