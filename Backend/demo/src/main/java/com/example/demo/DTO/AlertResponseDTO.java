package com.example.demo.DTO;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AlertResponseDTO {
    private Long id;
    private String status;
    private String message;
    private String groupType;
    private Long ownerId;
    private Long sensorId;
    private Long fieldId;
    private String type;
    private Double value;
    private Double thresholdMin;
    private Double thresholdMax;
    private LocalDateTime timestamp;
    
    // Additional fields for frontend compatibility
    private String fieldName;
    private String sensorName;
    
    // Constructor for backward compatibility
    public AlertResponseDTO(String status, Long sensorId, Long fieldId, String type, 
                           Double value, Double thresholdMin, Double thresholdMax, LocalDateTime timestamp) {
        this.status = status;
        this.sensorId = sensorId;
        this.fieldId = fieldId;
        this.type = type;
        this.value = value;
        this.thresholdMin = thresholdMin;
        this.thresholdMax = thresholdMax;
        this.timestamp = timestamp;
    }
}
