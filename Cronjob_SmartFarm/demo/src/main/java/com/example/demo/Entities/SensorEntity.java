package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "Sensor")
@Data
public class SensorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private FieldEntity field;

    private String sensorName;
    private Double lat;
    private Double lng;

    @Column(name = "point_order")
    private Integer pointOrder;

    private String status;
    private String type;

    private LocalDateTime installationDate;
}


