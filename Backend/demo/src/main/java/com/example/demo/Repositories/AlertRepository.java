package com.example.demo.Repositories;

import com.example.demo.Entities.AlertEntity;
import com.example.demo.Entities.FieldEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<AlertEntity, Long> {
    List<AlertEntity> findByFieldId(Long fieldId);     // ✅ đúng
}