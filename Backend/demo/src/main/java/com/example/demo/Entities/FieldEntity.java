package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Field")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class FieldEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "farm_id", nullable = false)
    @JsonIgnoreProperties({"fields", "sensor", "owner"})
    private FarmEntity farm;

    @Column(name = "field_name", nullable = false)
    private String fieldName;

    private String status;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    private Double area;

    private String region;

    @ManyToOne
    @JoinColumn(name = "crop_season_id")
    @JsonIgnoreProperties({"field", "crop", "harvests"})
    private CropSeasonEntity cropSeason;

}
