package com.example.demo.Repositories;

import com.example.demo.Entities.HarvestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HarvestRepository extends JpaRepository<HarvestEntity, Long> {
    List<HarvestEntity> findByCropSeasonId(Long cropSeasonId);
    
    // ✅ Find harvests by field ID through crop season
    List<HarvestEntity> findByCropSeason_Field_Id(Long fieldId);

    @Query("SELECT h.cropSeason.id, SUM(h.yieldKg) FROM HarvestEntity h GROUP BY h.cropSeason.id")
    List<Object[]> summarizeYieldBySeason();
}
