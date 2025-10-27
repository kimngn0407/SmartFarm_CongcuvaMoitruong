package com.example.demo.Services;

import com.example.demo.DTO.HarvestDTO;
import com.example.demo.DTO.HarvestResponseDTO;
import com.example.demo.DTO.HarvestSummaryDTO;
import com.example.demo.Entities.CropSeasonEntity;
import com.example.demo.Entities.HarvestEntity;
import com.example.demo.Repositories.CropSeasonRepository;
import com.example.demo.Repositories.HarvestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class HarvestService {

    @Autowired
    private HarvestRepository harvestRepository;

    @Autowired
    private CropSeasonRepository cropSeasonRepository;

    // ✅ Get all harvests for frontend
    public List<HarvestResponseDTO> getAllHarvests() {
        try {
            List<HarvestEntity> entities = harvestRepository.findAll();
            return entities.stream()
                    .map(this::toResponseDTO)
                    .filter(dto -> dto != null)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error getting all harvests: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // ✅ Get harvests by field ID
    public List<HarvestResponseDTO> getHarvestsByFieldId(Long fieldId) {
        return harvestRepository.findByCropSeason_Field_Id(fieldId).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<HarvestDTO> getByCropSeasonId(Long cropSeasonId) {
        return harvestRepository.findByCropSeasonId(cropSeasonId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ Create harvest with enhanced data
    public HarvestResponseDTO createHarvest(HarvestResponseDTO dto) {
        try {
            // Find or create crop season based on fieldId and cropType
            CropSeasonEntity season = null;
            
            if (dto.getCropSeasonId() != null) {
                // If cropSeasonId is provided, use it
                season = cropSeasonRepository.findById(dto.getCropSeasonId())
                        .orElseThrow(() -> new RuntimeException("Crop season not found"));
            } else if (dto.getFieldId() != null && dto.getCropType() != null) {
                // If fieldId and cropType are provided, find matching crop season
                List<CropSeasonEntity> existingSeasons = cropSeasonRepository.findAll();
                if (!existingSeasons.isEmpty()) {
                    // Find season that matches the field and plant
                    for (CropSeasonEntity existingSeason : existingSeasons) {
                        if (existingSeason.getField() != null && 
                            existingSeason.getField().getId().equals(dto.getFieldId()) &&
                            existingSeason.getPlant() != null &&
                            existingSeason.getPlant().getPlantName().equals(dto.getCropType())) {
                            season = existingSeason;
                            break;
                        }
                    }
                    
                    // If no matching season found, use the first one
                    if (season == null) {
                        season = existingSeasons.get(0);
                    }
                } else {
                    throw new RuntimeException("No crop seasons available");
                }
            } else {
                throw new RuntimeException("Either cropSeasonId or fieldId+cropType must be provided");
            }

            HarvestEntity entity = new HarvestEntity();
            entity.setCropSeason(season);
            entity.setYieldKg(dto.getQuantity());
            entity.setHarvestDate(dto.getHarvestDate());

            HarvestEntity saved = harvestRepository.save(entity);
            return toResponseDTO(saved);
        } catch (Exception e) {
            System.err.println("Error in createHarvest: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // ✅ Update harvest
    public HarvestResponseDTO updateHarvest(Long id, HarvestResponseDTO dto) {
        try {
            System.out.println("Updating harvest ID: " + id);
            System.out.println("Update DTO: " + dto);
            System.out.println("Requested crop type: " + dto.getCropType());
            
            HarvestEntity entity = harvestRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Harvest not found"));

            // Try to update crop season if fieldId and cropType are provided
            if (dto.getFieldId() != null && dto.getCropType() != null) {
                try {
                    List<CropSeasonEntity> existingSeasons = cropSeasonRepository.findAll();
                    CropSeasonEntity matchingSeason = null;
                    
                    // Find season that matches the field and plant
                    for (CropSeasonEntity existingSeason : existingSeasons) {
                        if (existingSeason.getField() != null && 
                            existingSeason.getField().getId().equals(dto.getFieldId()) &&
                            existingSeason.getPlant() != null &&
                            existingSeason.getPlant().getPlantName().equals(dto.getCropType())) {
                            matchingSeason = existingSeason;
                            break;
                        }
                    }
                    
                    if (matchingSeason != null) {
                        entity.setCropSeason(matchingSeason);
                        System.out.println("Updated crop season to match: " + dto.getCropType());
                    } else {
                        System.out.println("No matching crop season found for: " + dto.getCropType());
                        // Keep existing crop season
                    }
                } catch (Exception cropSeasonError) {
                    System.err.println("Error updating crop season: " + cropSeasonError.getMessage());
                    // Continue with other updates
                }
            }

            // Update other fields
            if (dto.getQuantity() != null) {
                entity.setYieldKg(dto.getQuantity());
                System.out.println("Updated quantity to: " + dto.getQuantity());
            }
            if (dto.getHarvestDate() != null) {
                entity.setHarvestDate(dto.getHarvestDate());
                System.out.println("Updated harvest date to: " + dto.getHarvestDate());
            }

            HarvestEntity saved = harvestRepository.save(entity);
            System.out.println("Successfully saved harvest to database");
            
            HarvestResponseDTO response = toResponseDTO(saved);
            System.out.println("Response crop type: " + response.getCropType());
            return response;
        } catch (Exception e) {
            System.err.println("Error in updateHarvest: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // ✅ Delete harvest
    public void deleteHarvest(Long id) {
        if (!harvestRepository.existsById(id)) {
            throw new RuntimeException("Harvest not found");
        }
        harvestRepository.deleteById(id);
    }

    // ✅ Get harvest by ID
    public HarvestResponseDTO getHarvestById(Long id) {
        HarvestEntity entity = harvestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Harvest not found"));
        return toResponseDTO(entity);
    }

    public HarvestDTO create(HarvestDTO dto) {
        CropSeasonEntity season = cropSeasonRepository.findById(dto.getCropSeasonId())
                .orElseThrow(() -> new RuntimeException("Crop season not found"));

        HarvestEntity entity = new HarvestEntity();
        entity.setCropSeason(season);
        entity.setYieldKg(dto.getYieldKg());
        entity.setHarvestDate(dto.getHarvestDate());

        return toDTO(harvestRepository.save(entity));
    }

    public List<HarvestSummaryDTO> getYieldSummary() {
        return harvestRepository.summarizeYieldBySeason().stream()
                .map(row -> new HarvestSummaryDTO(
                        (Long) row[0],
                        ((Number) row[1]).floatValue()
                ))
                .collect(Collectors.toList());
    }

    // ✅ Get harvest statistics for frontend
    public HarvestStatsDTO getHarvestStats() {
        try {
            List<HarvestEntity> allHarvests = harvestRepository.findAll();
            
            long total = allHarvests.size();
            long completed = allHarvests.stream()
                    .filter(h -> h.getHarvestDate() != null && h.getHarvestDate().isBefore(java.time.LocalDate.now()))
                    .count();
            long pending = allHarvests.stream()
                    .filter(h -> h.getHarvestDate() != null && h.getHarvestDate().isAfter(java.time.LocalDate.now()))
                    .count();
            long scheduled = allHarvests.stream()
                    .filter(h -> h.getHarvestDate() != null && h.getHarvestDate().equals(java.time.LocalDate.now()))
                    .count();
            
            float totalQuantity = (float) allHarvests.stream()
                    .mapToDouble(h -> h.getYieldKg() != null ? h.getYieldKg() : 0)
                    .sum();

            return new HarvestStatsDTO(total, completed, pending, scheduled, totalQuantity);
        } catch (Exception e) {
            System.err.println("Error getting harvest stats: " + e.getMessage());
            e.printStackTrace();
            // Return default stats on error
            return new HarvestStatsDTO(0, 0, 0, 0, 0.0f);
        }
    }

    private HarvestDTO toDTO(HarvestEntity entity) {
        return new HarvestDTO(
                entity.getId(),
                entity.getCropSeason().getId(),
                entity.getYieldKg(),
                entity.getHarvestDate()
        );
    }

    // ✅ Convert to response DTO with all needed fields
    private HarvestResponseDTO toResponseDTO(HarvestEntity entity) {
        if (entity == null) {
            return null;
        }

        String status = "SCHEDULED";
        if (entity.getHarvestDate() != null) {
            if (entity.getHarvestDate().isBefore(java.time.LocalDate.now())) {
                status = "COMPLETED";
            } else if (entity.getHarvestDate().isAfter(java.time.LocalDate.now())) {
                status = "PENDING";
            }
        }

        // Safe navigation for relationships
        String fieldName = "Unknown Field";
        String cropType = "Unknown Crop";
        String notes = ""; // Don't auto-populate notes from database
        Long fieldId = null;
        Long cropSeasonId = null;

        if (entity.getCropSeason() != null) {
            cropSeasonId = entity.getCropSeason().getId();
            
            if (entity.getCropSeason().getField() != null) {
                fieldName = entity.getCropSeason().getField().getFieldName();
                fieldId = entity.getCropSeason().getField().getId();
            }
            
            if (entity.getCropSeason().getPlant() != null) {
                cropType = entity.getCropSeason().getPlant().getPlantName();
            }
            
            // Don't auto-populate notes from crop season
            // notes = entity.getCropSeason().getNote();
        }

        return HarvestResponseDTO.builder()
                .id(entity.getId())
                .fieldName(fieldName)
                .cropType(cropType)
                .harvestDate(entity.getHarvestDate())
                .quantity(entity.getYieldKg())
                .quality("Tốt") // Default quality
                .status(status)
                .notes(notes) // Will be empty by default
                .fieldId(fieldId)
                .cropSeasonId(cropSeasonId)
                .build();
    }

    // ✅ Inner class for statistics
    public static class HarvestStatsDTO {
        private long total;
        private long completed;
        private long pending;
        private long scheduled;
        private float totalQuantity;

        public HarvestStatsDTO(long total, long completed, long pending, long scheduled, float totalQuantity) {
            this.total = total;
            this.completed = completed;
            this.pending = pending;
            this.scheduled = scheduled;
            this.totalQuantity = totalQuantity;
        }

        // Getters
        public long getTotal() { return total; }
        public long getCompleted() { return completed; }
        public long getPending() { return pending; }
        public long getScheduled() { return scheduled; }
        public float getTotalQuantity() { return totalQuantity; }
    }
}
