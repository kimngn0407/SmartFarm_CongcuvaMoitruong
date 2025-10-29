package com.example.demo.Services;

import com.example.demo.DTO.CropSeasonDTO;
import com.example.demo.Entities.CropSeasonEntity;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Entities.PlantEntity;
import com.example.demo.Repositories.CropSeasonRepository;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropSeasonService {

    @Autowired
    private CropSeasonRepository seasonRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private PlantRepository plantRepository;

    public CropSeasonDTO createSeason(CropSeasonDTO dto) {
        FieldEntity field = fieldRepository.findById(dto.getFieldId())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        PlantEntity plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        CropSeasonEntity season = new CropSeasonEntity();
        season.setField(field);
        season.setPlant(plant);
        season.setSeasonName(dto.getSeasonName());
        season.setPlantingDate(dto.getPlantingDate());
        season.setExpectedHarvestDate(dto.getExpectedHarvestDate());
        season.setActualHarvestDate(dto.getActualHarvestDate());
        season.setNote(dto.getNote());

        return convertToDTO(seasonRepository.save(season));
    }

    public List<CropSeasonDTO> getSeasonsByFieldId(Long fieldId) {
        return seasonRepository.findByFieldId(fieldId)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CropSeasonDTO getSeasonById(Long id) {
        CropSeasonEntity season = seasonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Season not found"));
        return convertToDTO(season);
    }

    public CropSeasonDTO updateSeason(Long id, CropSeasonDTO dto) {
        CropSeasonEntity season = seasonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Season not found"));

        if (!season.getField().getId().equals(dto.getFieldId())) {
            FieldEntity field = fieldRepository.findById(dto.getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found"));
            season.setField(field);
        }

        if (!season.getPlant().getId().equals(dto.getPlantId())) {
            PlantEntity plant = plantRepository.findById(dto.getPlantId())
                    .orElseThrow(() -> new RuntimeException("Plant not found"));
            season.setPlant(plant);
        }

        season.setSeasonName(dto.getSeasonName());
        season.setPlantingDate(dto.getPlantingDate());
        season.setExpectedHarvestDate(dto.getExpectedHarvestDate());
        season.setActualHarvestDate(dto.getActualHarvestDate());
        season.setNote(dto.getNote());

        return convertToDTO(seasonRepository.save(season));
    }

    public void deleteSeason(Long id) {
        seasonRepository.deleteById(id);
    }

    // ✅ Get all crop seasons for statistics
    public List<CropSeasonDTO> getAllCropSeasons() {
        return seasonRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CropSeasonDTO convertToDTO(CropSeasonEntity entity) {
        return new CropSeasonDTO(
                entity.getId(),
                entity.getField().getId(),
                entity.getPlant().getId(),
                entity.getSeasonName(),
                entity.getPlantingDate(),
                entity.getExpectedHarvestDate(),
                entity.getActualHarvestDate(),
                entity.getNote()
        );
    }
}
