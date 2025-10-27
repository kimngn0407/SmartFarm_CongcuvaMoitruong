package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Harvest")
@Data
public class HarvestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crop_season_id")
    private CropSeasonEntity cropSeason;

    private Float yieldKg;
    private LocalDate harvestDate;
}

