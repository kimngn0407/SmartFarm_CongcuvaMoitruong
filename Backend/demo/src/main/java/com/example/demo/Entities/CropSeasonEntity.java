package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Crop_season")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CropSeasonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id")
    @JsonIgnoreProperties({"cropSeason", "sensors", "farm"})
    private FieldEntity field;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    @JsonIgnoreProperties({"cropSeasons"})
    private PlantEntity plant;

    private String seasonName;

    @Column(name = "planting_date")
    private LocalDate plantingDate;

    private LocalDate expectedHarvestDate;
    private LocalDate actualHarvestDate;
    private String note;
}
