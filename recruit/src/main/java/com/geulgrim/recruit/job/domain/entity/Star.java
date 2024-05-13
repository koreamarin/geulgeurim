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
public class Star {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="star_id")
    private Long starId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="job_id", referencedColumnName = "job_id")
    private Job job;

    @Column(name="user_id", nullable = false)
    private Long userId;

}
