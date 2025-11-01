package com.example.demo.Services;

import com.example.demo.DTO.Fertilization_historyDTO;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Entities.Fertilization_historyEntity;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.Fertilization_historyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class Fertilization_historyService {

    @Autowired
    private Fertilization_historyRepository fertilizationHistoryRepository;

    @Autowired
    private FieldRepository fieldRepository;

    public List<Fertilization_historyDTO> getByFieldId(Long fieldId) {
        return fertilizationHistoryRepository.findByFieldIdOrderByFertilizationDateDesc(fieldId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Fertilization_historyDTO create(Fertilization_historyDTO dto) {
        FieldEntity field = fieldRepository.findById(dto.getFieldId())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        Fertilization_historyEntity entity = new Fertilization_historyEntity();
        entity.setField(field);
        entity.setFertilizerType(dto.getFertilizerType());
        entity.setFertilizerAmount(dto.getFertilizerAmount());
        entity.setFertilizationDate(dto.getFertilizationDate());

        return convertToDTO(fertilizationHistoryRepository.save(entity));
    }

    private Fertilization_historyDTO convertToDTO(Fertilization_historyEntity entity) {
        return new Fertilization_historyDTO(
                entity.getId(),
                entity.getField().getId(),
                entity.getFertilizerType(),
                entity.getFertilizerAmount(),
                entity.getFertilizationDate()
        );
    }
}
