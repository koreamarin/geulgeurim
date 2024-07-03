package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

@Entity
@NoArgsConstructor
@Getter
public class ResumePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="position_resume_id")
    private Long positionResumeId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="position_id", referencedColumnName = "position_id", nullable = false)
    private Position position;

    @Builder
    private ResumePosition(Resume resume, Position position) {
        this.resume = resume;
        this.position = position;
    }
}
