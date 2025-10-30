package com.example.demo.Repositories;

import com.example.demo.Entities.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<SensorEntity, Long> {
    List<SensorEntity> findByFieldId(Long fieldId);
}
