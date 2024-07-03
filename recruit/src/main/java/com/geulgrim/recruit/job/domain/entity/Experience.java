package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="experience_id")
    private Long experienceId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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

    @Builder
    public Experience(Resume resume, String experienceTitle, String experienceContent, LocalDateTime startDate, LocalDateTime endDate) {
        this.resume = resume;
        this.experienceTitle = experienceTitle;
        this.experienceContent = experienceContent;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
