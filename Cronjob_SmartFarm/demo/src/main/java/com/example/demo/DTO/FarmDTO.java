package com.example.demo.DTO;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class FarmDTO {
    private Long id;
    private String farmName;
    private Long ownerId;

    private Double lat;
    private Double lng;
    private Double area;
    private String region;
}