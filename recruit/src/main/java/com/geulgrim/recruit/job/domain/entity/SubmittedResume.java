package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.job.domain.entity.Enums.ResultStatus;
import jakarta.persistence.*;

@Entity
public class SubmittedResume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="submitted_id")
    private Long submittedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="job_id", referencedColumnName = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(name="result", nullable = false)
    private ResultStatus resultStatus = ResultStatus.PENDING;
}
