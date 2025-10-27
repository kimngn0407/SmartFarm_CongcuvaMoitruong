package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Crop_growth_stage")
@Data
public class CropGrowthStageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    private PlantEntity plant;

    @Column(name = "stage_name", nullable = false)
    private String stageName;

    private int minDay;
    private int maxDay;
    private String description;
}
