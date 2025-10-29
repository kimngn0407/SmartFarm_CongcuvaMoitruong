package com.example.demo.Services;

import com.example.demo.DTO.CropGrowthStageDTO;
import com.example.demo.Entities.CropGrowthStageEntity;
import com.example.demo.Entities.PlantEntity;
import com.example.demo.Repositories.CropGrowthStageRepository;
import com.example.demo.Repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropGrowthStageService {

    @Autowired
    private CropGrowthStageRepository stageRepository;

    @Autowired
    private PlantRepository plantRepository;

    public CropGrowthStageDTO createStage(CropGrowthStageDTO dto) {
        PlantEntity plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        CropGrowthStageEntity stage = new CropGrowthStageEntity();
        stage.setPlant(plant);
        stage.setStageName(dto.getStageName());
        stage.setMinDay(dto.getMinDay());
        stage.setMaxDay(dto.getMaxDay());
        stage.setDescription(dto.getDescription());

        return convertToDTO(stageRepository.save(stage));
    }

    public List<CropGrowthStageDTO> getStagesByPlantId(Long plantId) {
        return stageRepository.findByPlantId(plantId)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CropGrowthStageDTO updateStage(Long id, CropGrowthStageDTO dto) {
        CropGrowthStageEntity stage = stageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stage not found"));

        stage.setStageName(dto.getStageName());
        stage.setMinDay(dto.getMinDay());
        stage.setMaxDay(dto.getMaxDay());
        stage.setDescription(dto.getDescription());

        if (!stage.getPlant().getId().equals(dto.getPlantId())) {
            PlantEntity plant = plantRepository.findById(dto.getPlantId())
                    .orElseThrow(() -> new RuntimeException("New plant not found"));
            stage.setPlant(plant);
        }

        return convertToDTO(stageRepository.save(stage));
    }

    public void deleteStage(Long id) {
        stageRepository.deleteById(id);
    }

    private CropGrowthStageDTO convertToDTO(CropGrowthStageEntity entity) {
        return new CropGrowthStageDTO(
                entity.getId(),
                entity.getPlant().getId(),
                entity.getStageName(),
                entity.getMinDay(),
                entity.getMaxDay(),
                entity.getDescription()
        );
    }
}
