package com.example.demo.Services;

import com.example.demo.DTO.CoordinatesDTO;
import com.example.demo.Entities.CoordinatesEntity;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Repositories.CoordinatesRepository;
import com.example.demo.Repositories.FieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoordinatesService {

    @Autowired
    private CoordinatesRepository coordinatesRepository;

    @Autowired
    private FieldRepository fieldRepository;

    public CoordinatesDTO createCoordinate(CoordinatesDTO dto) {
        FieldEntity field = fieldRepository.findById(dto.getFieldId())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        CoordinatesEntity coordinate = new CoordinatesEntity();
        coordinate.setField(field);
        coordinate.setLat(dto.getLat());
        coordinate.setLng(dto.getLng());
        coordinate.setPointOrder(dto.getPointOrder());

        return convertToDTO(coordinatesRepository.save(coordinate));
    }

    public List<CoordinatesDTO> getCoordinatesByFieldId(Long fieldId) {
        return coordinatesRepository.findByFieldId(fieldId)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CoordinatesDTO updateCoordinate(Long id, CoordinatesDTO dto) {
        CoordinatesEntity coordinate = coordinatesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coordinate not found"));

        coordinate.setLat(dto.getLat());
        coordinate.setLng(dto.getLng());
        coordinate.setPointOrder(dto.getPointOrder());

        if (!coordinate.getField().getId().equals(dto.getFieldId())) {
            FieldEntity newField = fieldRepository.findById(dto.getFieldId())
                    .orElseThrow(() -> new RuntimeException("New field not found"));
            coordinate.setField(newField);
        }

        return convertToDTO(coordinatesRepository.save(coordinate));
    }

    public void deleteCoordinate(Long id) {
        coordinatesRepository.deleteById(id);
    }

    private CoordinatesDTO convertToDTO(CoordinatesEntity entity) {
        return new CoordinatesDTO(
                entity.getId(),
                entity.getField().getId(),
                entity.getLat(),
                entity.getLng(),
                entity.getPointOrder()
        );
    }
}
