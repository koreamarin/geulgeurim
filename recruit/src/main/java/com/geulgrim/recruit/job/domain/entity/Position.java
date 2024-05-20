package com.geulgrim.recruit.job.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="position_id")
    private Long positionId;

    @Column(name="position_name", nullable = false, length = 63)
    private String positionName;
}
