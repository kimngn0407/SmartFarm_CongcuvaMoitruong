package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Warning_threshold")
@Data
public class Warning_thresholdEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crop_season_id")
    private CropSeasonEntity cropSeason;

    private Float minTemperature;
    private Float maxTemperature;
    private Float minHumidity;
    private Float maxHumidity;
    private Float minSoilMoisture;
    private Float maxSoilMoisture;

    @Column(name = "group_type")
    private String groupType;

    // Nếu không dùng @Data hoặc muốn rõ ràng, bạn có thể thêm getter:
    public String getGroupType() {
        return groupType;
    }
}

