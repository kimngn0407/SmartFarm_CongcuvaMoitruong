package com.example.demo.Services;

import com.example.demo.DTO.SensorDataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertServiceCron {


    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Gọi API check cảnh báo cho một sensor đơn lẻ (dùng khi cronjob vừa ghi dữ liệu xong).
     */
    public void checkAndCreateAlert(List<SensorDataDTO> sensorDataDTO) {
        String alertApiUrl = "http://localhost:8080/api/alerts/generate";
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<List<SensorDataDTO>> entity = new HttpEntity<>(sensorDataDTO, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(alertApiUrl, entity, String.class);

            System.out.println("Single alert checked. Status: " + response);
        } catch (Exception e) {
            System.err.println("Error calling check-single alert API: " + e.getMessage());
        }
    }

    /**
     * Gọi API tạo toàn bộ alert từ danh sách dữ liệu mới nhất.
     */
    public void generateAlertsFromLatestData() {
        String alertApiUrl = "http://localhost:8080/api/alerts/generate";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.postForEntity(alertApiUrl, entity, String.class);

            System.out.println("Generated all alerts from latest data. Status: " + response.getStatusCode());
        } catch (Exception e) {
            System.err.println("Error calling generate alert API: " + e.getMessage());
        }
    }
}
