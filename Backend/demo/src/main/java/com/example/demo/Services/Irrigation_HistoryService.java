package com.example.demo.Services;

import com.example.demo.DTO.Irrigation_HistoryDTO;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Entities.Irrigation_HistoryEntity;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.Irrigation_HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class Irrigation_HistoryService {

    @Autowired
    private Irrigation_HistoryRepository irrigationHistoryRepository;

    @Autowired
    private FieldRepository fieldRepository;

    public List<Irrigation_HistoryDTO> getByFieldId(Long fieldId) {
        return irrigationHistoryRepository.findByFieldIdOrderByTimestampDesc(fieldId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Irrigation_HistoryDTO create(Irrigation_HistoryDTO dto) {
        FieldEntity field = fieldRepository.findById(dto.getFieldId())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        Irrigation_HistoryEntity entity = new Irrigation_HistoryEntity();
        entity.setField(field);
        entity.setAction(dto.getAction());
        entity.setTimestamp(dto.getTimestamp());

        return convertToDTO(irrigationHistoryRepository.save(entity));
    }

    private Irrigation_HistoryDTO convertToDTO(Irrigation_HistoryEntity entity) {
        return new Irrigation_HistoryDTO(
                entity.getId(),
                entity.getField().getId(),
                entity.getAction(),
                entity.getTimestamp()
        );
    }
}
