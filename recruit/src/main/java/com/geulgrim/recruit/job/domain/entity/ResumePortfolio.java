package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumePortfolio {
    @Id
    @Column(name="resume_pofol_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumePofolId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(name="pofol_id", nullable = false)
    private Long pofolId;
}
