package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alert")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private String message;

    @Column(name = "timestamp", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;

    @Column(name = "group_type")
    private String groupType;

    @Column(name = "owner_id")
    private Long ownerId;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    @JsonIgnoreProperties({"field", "farm", "sensorData"})
    private SensorEntity sensor;

    // Liên kết với Field
    @ManyToOne
    @JoinColumn(name = "field_id")
    @JsonIgnoreProperties({"farm", "sensors", "cropSeason"})
    private FieldEntity field;

    @Transient
    private String type;

    @Transient
    private Double value;

    @Transient
    private Double thresholdMin;

    @Transient
    private Double thresholdMax;
}
