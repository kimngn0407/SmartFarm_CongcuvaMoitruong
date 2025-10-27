package com.example.demo.Controllers;

import com.example.demo.DTO.SensorDTO;
import com.example.demo.Services.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @PostMapping
    public SensorDTO createSensor(@RequestBody SensorDTO dto) {
        return sensorService.createSensor(dto);
    }

    @GetMapping
    public List<SensorDTO> getSensorsByFieldId(@RequestParam Long fieldId) {
        return sensorService.getSensorsByFieldId(fieldId);
    }

    @GetMapping("/{id}")
    public SensorDTO getSensorById(@PathVariable Long id) {
        return sensorService.getSensorById(id);
    }

    @PutMapping("/{id}")
    public SensorDTO updateSensor(@PathVariable Long id, @RequestBody SensorDTO dto) {
        return sensorService.updateSensor(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
    }

    @GetMapping("/farm/{farmId}/count")
    public ResponseEntity<Long> countSensorsByFarmId(@PathVariable Long farmId) {
        long count = sensorService.countSensorsByFarmId(farmId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAllSensors() {
        long count = sensorService.countAllSensors();
        return ResponseEntity.ok(count);
    }



}
