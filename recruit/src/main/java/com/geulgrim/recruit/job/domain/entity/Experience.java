package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="experience_id")
    private Long experienceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(name="experience_title", nullable = false, length = 63)
    private String experienceTitle;

    @Column(name="experience_content", nullable = false)
    private String experienceContent;

    @Column(name="start_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name="end_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;
}
