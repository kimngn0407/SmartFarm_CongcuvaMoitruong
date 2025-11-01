package com.example.demo.Entities;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@Table(name = "Plant")
@Data
public class PlantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plant_name", unique = true, nullable = false)
    private String plantName;

    private String description;
}

