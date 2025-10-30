package com.example.demo.Services;

import java.util.ArrayList;

import com.example.demo.DTO.SensorDataDTO;
import com.example.demo.Entities.SensorDataEntity;
import com.example.demo.Entities.SensorEntity;
import com.example.demo.Repositories.FieldRepository;
import com.example.demo.Repositories.SensorDataRepository;
import com.example.demo.Repositories.SensorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SensorDataFakeService {

    private final FieldRepository fieldRepository;
    private final SensorRepository sensorRepository;
    private final SensorDataRepository sensorDataRepository;
    private final AlertServiceCron alertServiceCron; // <-- THÊM DÒNG NÀY

    public void generateFakeSensorData() {
        List<SensorEntity> sensors = sensorRepository.findAll();
        ArrayList<SensorDataEntity> sensorDataEntities = new ArrayList<>();
        for (SensorEntity sensor : sensors) {
            SensorDataEntity data = new SensorDataEntity();
            data.setSensor(sensor);
            data.setTime(LocalDateTime.now());
            data.setValue(generateFakeValue(sensor));

            sensorDataEntities.add(data);

        }

        // Lưu dữ liệu sensor giả lập
        List<SensorDataEntity> savedData = sensorDataRepository.saveAll(sensorDataEntities);

        List<SensorDataDTO> dtos = savedData.stream()
                .map(entity -> {
                    SensorDataDTO dto = new SensorDataDTO();
                    dto.setSensorId(entity.getSensor().getId());
                    dto.setValue(entity.getValue());
                    dto.setTime(entity.getTime());
                    return dto;
                })
                .collect(Collectors.toList());

        alertServiceCron.checkAndCreateAlert(dtos);
        //Convert lai
        // Gọi đến API tạo alert
        //alertService.checkAndCreateAlert(savedData);
    }

    private Double generateFakeValue(SensorEntity sensor) {
        String type = sensor.getType();
        if (type == null) return Math.random() * 100;

        switch (type.toUpperCase()) {
            // Nhiệt độ từ 10 đến 45 độ
            case "TEMPERATURE":
                return 10 + Math.random() * 35;
            //Độ ẩm từ 50 đến 80%
            case "HUMIDITY":
                return 30 + Math.random() * 65; // 95 - 30 = 65

            // từ 3 đến dưới 60%
            case "SOIL MOISTURE":
                return 15 + Math.random() * 45;
            default:
                return Math.random() * 100;
        }
    }
}


