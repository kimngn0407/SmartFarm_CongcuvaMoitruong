package com.example.demo.Services;

import com.example.demo.DTO.SensorDTO;
import com.example.demo.Entities.FieldEntity;
import com.example.demo.Entities.SensorEntity;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private FieldRepository fieldRepository;

    public SensorDTO createSensor(SensorDTO dto) {
        FieldEntity field = fieldRepository.findById(dto.getFieldId())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        SensorEntity sensor = new SensorEntity();
        sensor.setField(field);
        sensor.setSensorName(dto.getSensorName());
        sensor.setLat(dto.getLat());
        sensor.setLng(dto.getLng());
        sensor.setPointOrder(dto.getPointOrder());
        sensor.setType(dto.getType());
        sensor.setStatus(dto.getStatus());
        sensor.setInstallationDate(dto.getInstallationDate());

        return convertToDTO(sensorRepository.save(sensor));
    }

    public List<SensorDTO> getSensorsByFieldId(Long fieldId) {
        return sensorRepository.findByField_Id(fieldId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public SensorDTO getSensorById(Long id) {
        SensorEntity sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor not found"));
        return convertToDTO(sensor);
    }

    public SensorDTO updateSensor(Long id, SensorDTO dto) {
        SensorEntity sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor not found"));

        if (!sensor.getField().getId().equals(dto.getFieldId())) {
            FieldEntity field = fieldRepository.findById(dto.getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found"));
            sensor.setField(field);
        }

        sensor.setSensorName(dto.getSensorName());
        sensor.setLat(dto.getLat());
        sensor.setLng(dto.getLng());
        sensor.setPointOrder(dto.getPointOrder());
        sensor.setType(dto.getType());
        sensor.setStatus(dto.getStatus());
        sensor.setInstallationDate(dto.getInstallationDate());

        return convertToDTO(sensorRepository.save(sensor));
    }

    public void deleteSensor(Long id) {
        sensorRepository.deleteById(id);
    }

    private SensorDTO convertToDTO(SensorEntity entity) {
        return new SensorDTO(
                entity.getId(),
                entity.getField().getId(),
                entity.getSensorName(),
                entity.getLat(),
                entity.getLng(),
                entity.getPointOrder(),
                entity.getType(),
                entity.getStatus(),
                entity.getInstallationDate()
        );
    }

    public long countSensorsByFarmId(Long farmId) {
        return sensorRepository.countByFarmId(farmId);
    }

    public long countAllSensors() {
        return sensorRepository.count();
    }

}
