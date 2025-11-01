package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fertilization_historyDTO {
    private Long id;
    private Long fieldId;
    private String fertilizerType;
    private Float fertilizerAmount;
    private LocalDate fertilizationDate;
}
