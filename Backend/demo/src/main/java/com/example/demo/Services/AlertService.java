package com.example.demo.Services;

import com.example.demo.DTO.AlertResponseDTO;
import com.example.demo.DTO.SensorDataLastestDTO;
import com.example.demo.Entities.*;
import com.example.demo.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final SensorRepository sensorRepository;
    private final FieldRepository fieldRepository;
    private final Warning_thresholdRepository thresholdRepository;
    private final AlertRepository alertRepository;
    private final CropSeasonRepository cropSeasonRepository;

    // ✅ Get all alerts for statistics
    public List<AlertEntity> getAllAlerts() {
        return alertRepository.findAll();
    }

    // ✅ Get alerts by field
    public List<AlertResponseDTO> getAlertsByField(Long fieldId) {
        List<AlertEntity> alerts = alertRepository.findByFieldId(fieldId);
        List<AlertResponseDTO> responseDTOs = new ArrayList<>();
        
        for (AlertEntity alert : alerts) {
            responseDTOs.add(AlertResponseDTO.builder()
                .id(alert.getId())
                .status(alert.getStatus())
                .message(alert.getMessage())
                .groupType(alert.getGroupType())
                .ownerId(alert.getOwnerId())
                .sensorId(alert.getSensor() != null ? alert.getSensor().getId() : null)
                .fieldId(alert.getField() != null ? alert.getField().getId() : null)
                .type(alert.getType())
                .value(alert.getValue())
                .thresholdMin(alert.getThresholdMin())
                .thresholdMax(alert.getThresholdMax())
                .timestamp(alert.getTimestamp())
                .fieldName(alert.getField() != null ? alert.getField().getFieldName() : null)
                .sensorName(alert.getSensor() != null ? alert.getSensor().getSensorName() : null)
                .build());
        }
        
        return responseDTOs;
    }

    // ✅ Resolve alert
    public void resolveAlert(Long alertId) {
        Optional<AlertEntity> alertOpt = alertRepository.findById(alertId);
        if (alertOpt.isPresent()) {
            AlertEntity alert = alertOpt.get();
            alert.setStatus("GOOD");
            alertRepository.save(alert);
        }
    }

    // ✅ Mark alert as read
    public void markAlertAsRead(Long alertId) {
        Optional<AlertEntity> alertOpt = alertRepository.findById(alertId);
        if (alertOpt.isPresent()) {
            AlertEntity alert = alertOpt.get();
            // You can add a 'read' field to AlertEntity if needed
            // For now, we'll just update the status
            if ("CRITICAL".equals(alert.getStatus())) {
                alert.setStatus("WARNING");
            }
            alertRepository.save(alert);
        }
    }

    // Nhận danh sách sensor từ bên ngoài
    public List<AlertResponseDTO> createAlertsForAllSensors(List<SensorDataLastestDTO> sensorDataList) {
        List<AlertResponseDTO> allAlerts = new ArrayList<>();

        for (SensorDataLastestDTO data : sensorDataList) {
            Optional<SensorEntity> sensorOpt = sensorRepository.findById(data.getSensorId());
            if (sensorOpt.isEmpty()) continue;

            SensorEntity sensor = sensorOpt.get();

            // Gắn dữ liệu cho xử lý
            List<AlertResponseDTO> alerts = createAlertsFromSensorData(sensor, data);
            allAlerts.addAll(alerts);
        }

        return allAlerts;
    }
    public List<AlertResponseDTO> createAlertsFromSensorData(SensorEntity sensor, SensorDataLastestDTO data) {
        List<AlertResponseDTO> alerts = new ArrayList<>();

        FieldEntity field = sensor.getField();
        if (field == null){ return alerts;}
        Optional<CropSeasonEntity> cropSeasonEntity = cropSeasonRepository.findFirstByFieldIdOrderByPlantingDateDesc(field.getId());
        if(cropSeasonEntity.isEmpty()){
            return alerts;
        }
        Optional<Warning_thresholdEntity> thresholdOpt;
        thresholdOpt = thresholdRepository.findByCropSeasonId(cropSeasonEntity.get().getId());
        if (thresholdOpt.isEmpty()) return alerts;

        Warning_thresholdEntity threshold = thresholdOpt.get();
        double value = data.getValue();
        double min, max;
        String messages = "Alert for sensor ";
        switch (sensor.getType()) {
            case "Temperature":
                if (threshold.getMinTemperature() == null || threshold.getMaxTemperature() == null) return alerts;
                min = threshold.getMinTemperature();
                max = threshold.getMaxTemperature();
                messages += "Temperature";
                break;
            case "Humidity":
                if (threshold.getMinHumidity() == null || threshold.getMaxHumidity() == null) return alerts;
                min = threshold.getMinHumidity();
                max = threshold.getMaxHumidity();
                messages += "Humidity";
                break;
            case "Soil Moisture":
                if (threshold.getMinSoilMoisture() == null || threshold.getMaxSoilMoisture() == null) return alerts;
                min = threshold.getMinSoilMoisture();
                max = threshold.getMaxSoilMoisture();
                messages += "Soil Moisture";
                break;
            default:
                return alerts;
        }

        String status;
        double warningMargin = (max - min) * 0.1;

        if (value < min - warningMargin || value > max + warningMargin) {
            status = "Critical";
        } else if (value < min || value > max) {
            status = "Warning";
        } else {
            status = "Good";
        }

        AlertEntity alert = new AlertEntity();
        alert.setSensor(sensor);
        alert.setField(field);
        alert.setType(sensor.getType());
        alert.setValue(value);
        alert.setThresholdMin(min);
        alert.setThresholdMax(max);
        alert.setTimestamp(LocalDateTime.now());
        alert.setStatus(status);
        alert.setMessage(messages+ status);

        alert.setGroupType("s");
        alert.setOwnerId(sensor.getId());

        alertRepository.save(alert);

        alerts.add(AlertResponseDTO.builder()
                .id(alert.getId())
                .status(status)
                .message(alert.getMessage())
                .groupType(alert.getGroupType())
                .ownerId(alert.getOwnerId())
                .sensorId(sensor.getId())
                .fieldId(field.getId())
                .type(sensor.getType())
                .value(value)
                .thresholdMin(min)
                .thresholdMax(max)
                .timestamp(alert.getTimestamp())
                .fieldName(field.getFieldName())
                .sensorName(sensor.getSensorName())
                .build());

        return alerts;
    }
}
