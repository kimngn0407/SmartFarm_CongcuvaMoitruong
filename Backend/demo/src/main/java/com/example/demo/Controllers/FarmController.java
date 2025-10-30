package com.example.demo.Controllers;

import com.example.demo.DTO.FarmDTO;
import com.example.demo.Services.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    @Autowired
    private FarmService farmService;

    @PostMapping
    public FarmDTO createFarm(@RequestBody FarmDTO farmDTO) {
        return farmService.createFarm(farmDTO);
    }

    @GetMapping
    public List<FarmDTO> getAllFarms() {
        return farmService.getAllFarms();
    }

    @GetMapping("/{id}")
    public FarmDTO getFarmById(@PathVariable Long id) {
        return farmService.getFarmById(id);
    }

    @PutMapping("/{id}")
    public FarmDTO updateFarm(@PathVariable Long id, @RequestBody FarmDTO farmDTO) {
        return farmService.updateFarm(id, farmDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteFarm(@PathVariable Long id) {
        farmService.deleteFarm(id);
    }
}
