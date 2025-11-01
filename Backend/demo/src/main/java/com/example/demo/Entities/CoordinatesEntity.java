package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Coordinates")
@Data
public class CoordinatesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id", nullable = false)
    private FieldEntity field;

    private Double lat;
    private Double lng;

    @Column(name =  "point_order", nullable = false)
    private Integer pointOrder;
}

