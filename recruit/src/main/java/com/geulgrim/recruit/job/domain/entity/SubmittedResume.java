package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.job.domain.entity.Enums.ResultStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
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
    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus = ResultStatus.PENDING;

    @Column(name="resume_url")
    private String resumeUrl;

    @Builder
    private SubmittedResume(Job job, Resume resume, ResultStatus resultStatus, String resumeUrl) {
        this.job = job;
        this.resume = resume;
        this.resultStatus = resultStatus;
        this.resumeUrl = resumeUrl;
    }

    public void updateResultStatus(ResultStatus resultStatus) {
        this.resultStatus = resultStatus;
    }
}
