package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.ExperienceTypeEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static jakarta.persistence.EnumType.STRING;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Job {
    @Id
    @Column(name="job_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="second_locate_key", referencedColumnName = "second_locate_key")
    private SecondLocate secondLocate;

    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name="start_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name="end_date", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false, length = 63)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(name="company_name", nullable = false, length = 31)
    private String companyName;

    @Column(name="company_url")
    private String companyUrl;

    @Column(name="job_type", nullable = false, length = 63)
    private String jobType;

    @Column(name="experience_type", nullable = false, length = 63)
    @Enumerated(STRING)
    private ExperienceTypeEnum experienceType;

    @Column(name="min_experience")
    private int minExperience;

    @Column(nullable=false, length = 31)
    @Enumerated(STRING)
    private EducationEnum education;

    private String perk;

    @Column(name="procedure_info", nullable = false)
    private String procedureInfo;

    private String salary;

    @Column(name="close_type", nullable = false)
    @Enumerated(STRING)
    private CloseType closeType;

    @Column(name="open_status", nullable = false)
    @Enumerated(STRING)
    private OpenStatus openStatus;

    @Column(name="file_url", nullable = false)
    private String fileUrl;

    @Column(name="saramin_id", nullable = true)
    private Long saraminId;

    @OneToMany(mappedBy = "job", fetch = FetchType.EAGER)
    private List<JobPosition> jobPositions;
}
