package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Award {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="award_id")
    private Long awardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(name="award_name", nullable=false, length=63)
    private String awardName;

    @Column(name="acquisition_date", nullable=false, columnDefinition="TIMESTAMP")
    private LocalDateTime acquisitionDate;

    @Column(name="institution", length = 31)
    private String institution;

    @Column(name="score", length = 15)
    private String score;
}
