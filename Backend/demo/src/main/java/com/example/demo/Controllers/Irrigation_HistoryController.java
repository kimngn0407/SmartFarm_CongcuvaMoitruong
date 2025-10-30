package com.example.demo.Controllers;

import com.example.demo.DTO.Irrigation_HistoryDTO;
import com.example.demo.Services.Irrigation_HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/irrigation")
public class Irrigation_HistoryController {

    @Autowired
    private Irrigation_HistoryService irrigationHistoryService;

    @GetMapping
    public List<Irrigation_HistoryDTO> getByField(@RequestParam Long fieldId) {
        return irrigationHistoryService.getByFieldId(fieldId);
    }

    @PostMapping
    public Irrigation_HistoryDTO create(@RequestBody Irrigation_HistoryDTO dto) {
        return irrigationHistoryService.create(dto);
    }
}
