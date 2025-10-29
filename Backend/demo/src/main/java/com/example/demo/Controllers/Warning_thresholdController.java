package com.example.demo.Controllers;

import com.example.demo.DTO.Warning_thresholdDTO;
import com.example.demo.Services.Warning_thresholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thresholds")
public class Warning_thresholdController {

    @Autowired
    private Warning_thresholdService warningThresholdService;

    @PostMapping
    public Warning_thresholdDTO createThreshold(@RequestBody Warning_thresholdDTO dto) {
        return warningThresholdService.create(dto);
    }

    @GetMapping
    public Warning_thresholdDTO getThresholdByCropSeason(@RequestParam Long cropSeasonId) {
        return warningThresholdService.getByCropSeasonId(cropSeasonId);
    }

    @PutMapping("/{id}")
    public Warning_thresholdDTO updateThreshold(@PathVariable Long id, @RequestBody Warning_thresholdDTO dto) {
        return warningThresholdService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteThreshold(@PathVariable Long id) {
        warningThresholdService.delete(id);
    }
}
