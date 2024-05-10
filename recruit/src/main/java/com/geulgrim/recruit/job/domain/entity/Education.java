package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="education_id")
    private Long educationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="resume_id", referencedColumnName = "resume_id", nullable = false)
    private Resume resume;

    @Column(name="insitution_name", nullable = false, length = 31)
    private String institutionName;

    @Column(name="start_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name="end_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;

    @Column(name="education_status")
    @Enumerated(EnumType.STRING)
    private EducationStatus educationStatus;

    @Column(columnDefinition = "DECIMAL(4,2)")
    private BigDecimal gpa;
}
