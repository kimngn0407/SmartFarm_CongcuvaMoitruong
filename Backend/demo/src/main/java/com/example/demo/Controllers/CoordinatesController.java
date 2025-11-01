package com.example.demo.Controllers;

import com.example.demo.DTO.CoordinatesDTO;
import com.example.demo.Services.CoordinatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coordinates")
public class CoordinatesController {

    @Autowired
    private CoordinatesService coordinatesService;

    @PostMapping
    public CoordinatesDTO createCoordinate(@RequestBody CoordinatesDTO dto) {
        return coordinatesService.createCoordinate(dto);
    }

    @GetMapping
    public List<CoordinatesDTO> getCoordinatesByFieldId(@RequestParam Long fieldId) {
        return coordinatesService.getCoordinatesByFieldId(fieldId);
    }

    @PutMapping("/{id}")
    public CoordinatesDTO updateCoordinate(@PathVariable Long id, @RequestBody CoordinatesDTO dto) {
        return coordinatesService.updateCoordinate(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCoordinate(@PathVariable Long id) {
        coordinatesService.deleteCoordinate(id);
    }
}
