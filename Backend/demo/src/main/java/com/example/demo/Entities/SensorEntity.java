package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "Sensor")
@Data
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class SensorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id")
    @JsonIgnoreProperties({"sensors", "farm", "cropSeason"})
    private FieldEntity field;

    private String sensorName;
    private Double lat;
    private Double lng;

    @Column(name = "point_order")
    private Integer pointOrder;

    private String status;
    private String type;

    private LocalDateTime installationDate;

    @ManyToOne
    @JoinColumn(name = "farm_id")
    @JsonIgnoreProperties({"fields", "sensor", "owner"})
    private FarmEntity farm;

    public Long getFieldId() {
        return field != null ? field.getId() : null;
    }
}


