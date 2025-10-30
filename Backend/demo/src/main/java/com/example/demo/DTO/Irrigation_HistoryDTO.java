package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Irrigation_HistoryDTO {
    private Long id;
    private Long fieldId;
    private String action;
    private LocalDateTime timestamp;
}


