package com.example.demo.DTO;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class SensorDataLastestDTO {
    private Long sensorId;
    private String type; // "temperature", "humidity", etc.
    private Double value;
    private LocalDateTime timestamp;
}