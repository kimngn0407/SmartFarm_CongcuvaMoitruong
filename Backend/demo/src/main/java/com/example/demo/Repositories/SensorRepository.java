package com.example.demo.Repositories;

import com.example.demo.Entities.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<SensorEntity, Long> {
    List<SensorEntity> findByField_Id(Long fieldId);

    @Query("SELECT COUNT(s) FROM SensorEntity s WHERE s.farm.id = :farmId")
    long countByFarmId(@Param("farmId") Long farmId);

    @Query("SELECT COUNT(s) FROM SensorEntity s")
    long countAllSensors();

}
