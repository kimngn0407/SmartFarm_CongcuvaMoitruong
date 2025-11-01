package com.example.demo.Controllers;

import com.example.demo.DTO.Fertilization_historyDTO;
import com.example.demo.Services.Fertilization_historyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fertilization")
public class Fertilization_historyController {

    @Autowired
    private Fertilization_historyService fertilizationHistoryService;

    @GetMapping
    public List<Fertilization_historyDTO> getByField(@RequestParam Long fieldId) {
        return fertilizationHistoryService.getByFieldId(fieldId);
    }

    @PostMapping
    public Fertilization_historyDTO create(@RequestBody Fertilization_historyDTO dto) {
        return fertilizationHistoryService.create(dto);
    }
}
