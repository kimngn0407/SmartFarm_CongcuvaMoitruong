package com.example.demo.Services;

import com.example.demo.DTO.*;
import com.example.demo.Entities.CropGrowthStageEntity;
import com.example.demo.Entities.CropSeasonEntity;
import com.example.demo.Entities.PlantEntity;
import com.example.demo.Repositories.CropGrowthStageRepository;
import com.example.demo.Repositories.CropSeasonRepository;
import com.example.demo.Repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantService {

    @Autowired
    private CropGrowthStageRepository cropGrowthStageRepository;

    @Autowired
    private CropSeasonRepository cropSeasonRepository;

    @Autowired
    private PlantRepository plantRepository;

    public PlantDTO createPlant(PlantDTO dto) {
        if (plantRepository.existsByPlantName(dto.getPlantName())) {
            throw new RuntimeException("Plant name already exists");
        }

        PlantEntity plant = new PlantEntity();
        plant.setPlantName(dto.getPlantName());
        plant.setDescription(dto.getDescription());

        return convertToDTO(plantRepository.save(plant));
    }

    public List<PlantDTO> getAllPlants() {
        return plantRepository.findAll()
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlantDTO getPlantById(Long id) {
        PlantEntity plant = plantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found"));
        return convertToDTO(plant);
    }

    public PlantDTO updatePlant(Long id, PlantDTO dto) {
        PlantEntity plant = plantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        // Nếu đổi tên thì cần kiểm tra trùng
        if (!plant.getPlantName().equals(dto.getPlantName()) && plantRepository.existsByPlantName(dto.getPlantName())) {
            throw new RuntimeException("Plant name already exists");
        }

        plant.setPlantName(dto.getPlantName());
        plant.setDescription(dto.getDescription());

        return convertToDTO(plantRepository.save(plant));
    }

    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }

    private PlantDTO convertToDTO(PlantEntity entity) {
        return new PlantDTO(
                entity.getId(),
                entity.getPlantName(),
                entity.getDescription()
        );
    }

    public List<PlantDetailDTO> getAllPlantDetails() {
        List<PlantEntity> plants = plantRepository.findAll();
        List<PlantDetailDTO> result = new ArrayList<>();

        for (PlantEntity plant : plants) {
            // Convert CropSeasonEntities to DTOs
            List<CropSeasonEntity> cropSeasons = cropSeasonRepository.findByPlantId(plant.getId());
            List<CropSeasonDTO> cropSeasonDTOs = cropSeasons.stream().map(season -> new CropSeasonDTO(
                    season.getId(),
                    season.getField() != null ? season.getField().getId() : null,
                    season.getPlant() != null ? season.getPlant().getId() : null,
                    season.getSeasonName(),
                    season.getPlantingDate(),
                    season.getExpectedHarvestDate(),
                    season.getActualHarvestDate(),
                    season.getNote()
            )).collect(Collectors.toList());

            // Convert GrowthStages to DTOs
            List<CropGrowthStageEntity> stages = cropGrowthStageRepository.findByPlantId(plant.getId());
            List<CropGrowthStageDTO> stageDTOs = stages.stream().map(stage -> new CropGrowthStageDTO(
                    stage.getId(),
                    stage.getPlant() != null ? stage.getPlant().getId() : null,
                    stage.getStageName(),
                    stage.getMinDay(),
                    stage.getMaxDay(),
                    stage.getDescription()
            )).collect(Collectors.toList());

            // Assemble final DTO
            PlantDetailDTO dto = new PlantDetailDTO(
                    plant.getId(),
                    plant.getPlantName(),
                    cropSeasonDTOs,
                    stageDTOs
            );

            result.add(dto);
        }

        return result;
    }
    public List<PlantFlatStageDTO> getFlatStagesByPlantId(Long plantId) {
        Optional<PlantEntity> optionalPlant = plantRepository.findById(plantId);
        if (optionalPlant.isEmpty()) {
            return Collections.emptyList(); // or throw custom exception
        }

        PlantEntity plant = optionalPlant.get();

        List<CropSeasonEntity> seasons = cropSeasonRepository.findByPlantId(plantId);
        List<CropGrowthStageEntity> stages = cropGrowthStageRepository.findByPlantId(plantId);

        List<PlantFlatStageDTO> result = new ArrayList<>();

        for (CropSeasonEntity season : seasons) {
            for (CropGrowthStageEntity stage : stages) {
                PlantFlatStageDTO dto = new PlantFlatStageDTO(
                        plant.getId(),           // id (plantId)
                        stage.getId(),           // growthStageId
                        plant.getPlantName(),    // name
                        season.getSeasonName(),  // seasonName
                        stage.getStageName(),    // stageName
                        stage.getMinDay(),       // minDay
                        stage.getMaxDay(),       // maxDay
                        stage.getDescription()   // description
                );
                result.add(dto);
            }
        }

        return result;
    }


}
