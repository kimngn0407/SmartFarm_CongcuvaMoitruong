package com.example.demo.Repositories;

import com.example.demo.Entities.CropSeasonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CropSeasonRepository extends JpaRepository<CropSeasonEntity, Long> {
    List<CropSeasonEntity> findByFieldId(Long fieldId);
    @Query("SELECT cs FROM CropSeasonEntity cs WHERE cs.plant.id = :plantId")
    List<CropSeasonEntity> findByPlantId(@Param("plantId") Long plantId);

    //CropSeasonEntity findByFieldIdAndIsActive(Long fieldId, boolean isActive);
    //@Query("SELECT cs FROM CropSeasonEntity cs WHERE cs.field.id = :fieldId AND cs.actualHarvestDate IS NULL")
    //Optional<CropSeasonEntity> findByFieldAndActive(@Param("fieldId") Long fieldId);
    Optional<CropSeasonEntity> findFirstByFieldIdOrderByPlantingDateDesc(Long fieldId);


}
