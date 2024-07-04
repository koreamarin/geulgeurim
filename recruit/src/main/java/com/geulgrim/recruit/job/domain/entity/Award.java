package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Award {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="award_id")
    private Long awardId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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

    @Builder
    private Award(Resume resume, String awardName, LocalDateTime acquisitionDate, String institution, String score) {
        this.resume = resume;
        this.awardName = awardName;
        this.acquisitionDate = acquisitionDate;
        this.institution = institution;
        this.score = score;
    }

}
