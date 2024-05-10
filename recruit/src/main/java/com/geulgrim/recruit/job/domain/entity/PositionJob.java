package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;

@Entity
public class Position_job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="position_job_id")
    private Long positionJobId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="job_id", referencedColumnName = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="position_id", referencedColumnName = "position_id", nullable = false)
    private Position position;
}
