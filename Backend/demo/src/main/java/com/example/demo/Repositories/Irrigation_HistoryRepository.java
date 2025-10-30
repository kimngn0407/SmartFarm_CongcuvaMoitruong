package com.example.demo.Repositories;


import com.example.demo.Entities.Irrigation_HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Irrigation_HistoryRepository extends JpaRepository<Irrigation_HistoryEntity, Long> {
    List<Irrigation_HistoryEntity> findByFieldIdOrderByTimestampDesc(Long fieldId);
}
