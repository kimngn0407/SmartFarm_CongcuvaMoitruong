package com.example.demo.Controllers;

import com.example.demo.DTO.CropGrowthStageDTO;
import com.example.demo.Services.CropGrowthStageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/growth-stages")
public class CropGrowthStageController {

    @Autowired
    private CropGrowthStageService stageService;

    @PostMapping
    public CropGrowthStageDTO createStage(@RequestBody CropGrowthStageDTO dto) {
        return stageService.createStage(dto);
    }

    @GetMapping
    public List<CropGrowthStageDTO> getStagesByPlantId(@RequestParam Long plantId) {
        return stageService.getStagesByPlantId(plantId);
    }

    @PutMapping("/{id}")
    public CropGrowthStageDTO updateStage(@PathVariable Long id, @RequestBody CropGrowthStageDTO dto) {
        return stageService.updateStage(id, dto);
    }
    @DeleteMapping("/{id}")
    public void deleteStage(@PathVariable Long id) {
        stageService.deleteStage(id);
    }
}
