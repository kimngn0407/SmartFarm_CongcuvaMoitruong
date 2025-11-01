package com.example.demo.Repositories;

import com.example.demo.Entities.CoordinatesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoordinatesRepository extends JpaRepository<CoordinatesEntity, Long> {
    List<CoordinatesEntity> findByFieldId(Long fieldId);
}

