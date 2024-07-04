package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="work_id")
    private Long workId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false, length = 31)
    private String company;

    @Column(name="start_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name="end_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;

    @Column(nullable = false)
    private String content;

    @Builder
    private Work(Resume resume, String company, LocalDateTime startDate, LocalDateTime endDate, String content) {
        this.resume = resume;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
    }
}
