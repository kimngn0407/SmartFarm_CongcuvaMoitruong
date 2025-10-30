package com.example.demo.Controllers;

import com.example.demo.Services.SensorDataFakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SensorDataJobController {

    private final SensorDataFakeService sensorDataFakeService;

    @Scheduled(fixedRate = 1800000) // mỗi 60 giây
    public void run() {
        sensorDataFakeService.generateFakeSensorData();
    }
}

