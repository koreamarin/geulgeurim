package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
public class JobPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="job_position_id")
    private Long jobPositionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="job_id", referencedColumnName = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="position_id", referencedColumnName = "position_id", nullable = true)
    private Position position;

    @Override
    public String toString() {
        return "JobPosition{" +
                "jobPositionId=" + jobPositionId +
                ", position=" + position +
                '}';
    }

    @Builder
    public JobPosition(Job job, Position position) {
        this.job = job;
        this.position = position;
    }
}