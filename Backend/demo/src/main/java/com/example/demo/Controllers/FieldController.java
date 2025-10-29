package com.example.demo.Controllers;

import com.example.demo.DTO.FieldDTO;
import com.example.demo.Services.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fields")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @PostMapping
    public FieldDTO createField(@RequestBody FieldDTO dto) {
        return fieldService.createField(dto);
    }

    @GetMapping("/{farmId}/field")
    public List<FieldDTO> getFieldsByFarmId(@PathVariable Long farmId) {
        return fieldService.getFieldsByFarmId(farmId);
    }

    @GetMapping("/{id}")
    public FieldDTO getFieldById(@PathVariable Long id) {
        return fieldService.getFieldById(id);
    }

    @PutMapping("/{id}")
    public FieldDTO updateField(@PathVariable Long id, @RequestBody FieldDTO dto) {
        return fieldService.updateField(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Long id) {
        fieldService.deleteField(id);
    }
}
