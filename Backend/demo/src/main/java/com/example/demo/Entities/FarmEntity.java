package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(name = "lat")
    private Double lat;
    @Column(name = "lng")
    private Double lng;
    @Column(name = "area")
    private Double area;
    @Column(name = "region")
    private String region;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnoreProperties({"farms", "password", "role"})
    private AccountEntity owner;

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"farm", "sensors", "cropSeason"})
    private List<FieldEntity> fields = new ArrayList<>();

    @OneToMany(mappedBy = "farm")
    @JsonIgnoreProperties({"farm", "field", "sensorData"})
    private List<SensorEntity> sensor;
}
