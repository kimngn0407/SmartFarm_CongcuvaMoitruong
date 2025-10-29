package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlertDTO {
    private Long id;
    private Long fieldId;     // nullable if group_type = 'S'
    private Long sensorId;    // nullable if group_type = 'F'
    private Long ownerId;     // sensor_id or field_id, depending on group_type
    private String groupType; // 'S' or 'F'

    private String message;
    private String status;
    private LocalDateTime timestamp;
}
