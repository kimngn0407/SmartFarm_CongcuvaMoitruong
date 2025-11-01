package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Fertilization_history")
@Data
public class Fertilization_historyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private FieldEntity field;

    private String fertilizerType;
    private Float fertilizerAmount;
    private LocalDate fertilizationDate;
}

