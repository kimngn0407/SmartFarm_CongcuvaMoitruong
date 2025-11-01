package com.example.demo.Repositories;

import com.example.demo.Entities.CropGrowthStageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropGrowthStageRepository extends JpaRepository<CropGrowthStageEntity, Long> {
    List<CropGrowthStageEntity> findByPlantId(Long plantId);
}
