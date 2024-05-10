package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResumePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="position_resume_id")
    private Long positionResumeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="position_id", referencedColumnName = "position_id", nullable = false)
    private Position position;
}
