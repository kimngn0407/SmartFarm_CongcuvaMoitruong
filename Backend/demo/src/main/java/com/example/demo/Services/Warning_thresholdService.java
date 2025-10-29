package com.example.demo.Services;

import com.example.demo.DTO.Warning_thresholdDTO;
import com.example.demo.Entities.CropSeasonEntity;
import com.example.demo.Entities.Warning_thresholdEntity;
import com.example.demo.Repositories.CropSeasonRepository;
import com.example.demo.Repositories.Warning_thresholdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Warning_thresholdService {

    @Autowired
    private Warning_thresholdRepository thresholdRepository;

    @Autowired
    private CropSeasonRepository cropSeasonRepository;

    public Warning_thresholdDTO create(Warning_thresholdDTO dto) {
        CropSeasonEntity cropSeason = cropSeasonRepository.findById(dto.getCropSeasonId())
                .orElseThrow(() -> new RuntimeException("Crop Season not found"));

        Warning_thresholdEntity entity = convertToEntity(dto);
        entity.setCropSeason(cropSeason);
        return convertToDTO(thresholdRepository.save(entity));
    }

    public Warning_thresholdDTO getByCropSeasonId(Long cropSeasonId) {
        Warning_thresholdEntity entity = thresholdRepository.findByCropSeasonId(cropSeasonId)
                .orElseThrow(() -> new RuntimeException("Threshold not found"));
        return convertToDTO(entity);
    }

    public Warning_thresholdDTO update(Long id, Warning_thresholdDTO dto) {
        Warning_thresholdEntity entity = thresholdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Threshold not found"));

        entity.setMinTemperature(dto.getMinTemperature());
        entity.setMaxTemperature(dto.getMaxTemperature());
        entity.setMinHumidity(dto.getMinHumidity());
        entity.setMaxHumidity(dto.getMaxHumidity());
        entity.setMinSoilMoisture(dto.getMinSoilMoisture());
        entity.setMaxSoilMoisture(dto.getMaxSoilMoisture());

        return convertToDTO(thresholdRepository.save(entity));
    }

    public void delete(Long id) {
        thresholdRepository.deleteById(id);
    }

    private Warning_thresholdDTO convertToDTO(Warning_thresholdEntity entity) {
        return new Warning_thresholdDTO(
                entity.getId(),
                entity.getCropSeason().getId(),
                entity.getMinTemperature(),
                entity.getMaxTemperature(),
                entity.getMinHumidity(),
                entity.getMaxHumidity(),
                entity.getMinSoilMoisture(),
                entity.getMaxSoilMoisture()
        );
    }

    private Warning_thresholdEntity convertToEntity(Warning_thresholdDTO dto) {
        Warning_thresholdEntity entity = new Warning_thresholdEntity();
        entity.setMinTemperature(dto.getMinTemperature());
        entity.setMaxTemperature(dto.getMaxTemperature());
        entity.setMinHumidity(dto.getMinHumidity());
        entity.setMaxHumidity(dto.getMaxHumidity());
        entity.setMinSoilMoisture(dto.getMinSoilMoisture());
        entity.setMaxSoilMoisture(dto.getMaxSoilMoisture());
        return entity;
    }
}
