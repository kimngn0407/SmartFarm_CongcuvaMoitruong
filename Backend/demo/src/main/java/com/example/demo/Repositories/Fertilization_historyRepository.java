package com.example.demo.Repositories;

import com.example.demo.Entities.Fertilization_historyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Fertilization_historyRepository extends JpaRepository<Fertilization_historyEntity, Long> {
    List<Fertilization_historyEntity> findByFieldIdOrderByFertilizationDateDesc(Long fieldId);
}