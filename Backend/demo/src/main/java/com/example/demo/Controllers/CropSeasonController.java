package com.example.demo.Controllers;

import com.example.demo.DTO.CropSeasonDTO;
import com.example.demo.Services.CropSeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seasons")
public class CropSeasonController {

    @Autowired
    private CropSeasonService seasonService;

    // ✅ Get all crop seasons for statistics
    @GetMapping("/all")
    public List<CropSeasonDTO> getAllCropSeasons() {
        return seasonService.getAllCropSeasons();
    }

    @PostMapping
    public CropSeasonDTO createSeason(@RequestBody CropSeasonDTO dto) {
        return seasonService.createSeason(dto);
    }

    @GetMapping
    public List<CropSeasonDTO> getSeasonsByFieldId(@RequestParam Long fieldId) {
        return seasonService.getSeasonsByFieldId(fieldId);
    }

    @GetMapping("/{id}")
    public CropSeasonDTO getSeasonById(@PathVariable Long id) {
        return seasonService.getSeasonById(id);
    }

    @PutMapping("/{id}")
    public CropSeasonDTO updateSeason(@PathVariable Long id, @RequestBody CropSeasonDTO dto) {
        return seasonService.updateSeason(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSeason(@PathVariable Long id) {
        seasonService.deleteSeason(id);
    }
}
