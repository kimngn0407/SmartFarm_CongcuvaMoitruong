package com.example.demo.Repositories;

import com.example.demo.Entities.Warning_thresholdEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Warning_thresholdRepository extends JpaRepository<Warning_thresholdEntity, Long> {
    Optional<Warning_thresholdEntity> findByCropSeasonId(Long cropSeasonId);
    //Warning_thresholdEntity findByCropSeasonIdAndType(Long cropSeasonId, String type);


}