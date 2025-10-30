package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "Farm")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class FarmEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String farmName;

    private Double lat;
    private Double lng;
    private Double area;
    private String region;

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FieldEntity> fields = new ArrayList<>();
}
