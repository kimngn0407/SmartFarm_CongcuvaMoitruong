package com.example.demo.DTO;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class FieldDTO {
    private Long id;
    private Long farmId;
    private String fieldName;
    private String status;
    private LocalDateTime dateCreated;

    private Double area;
    private String region;
}