package com.example.demo.Repositories;

import com.example.demo.Entities.FarmEntity;
import com.example.demo.Entities.FieldEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<FieldEntity, Long> {
    List<FieldEntity> findByFarmId(Long farmId);
}