package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.EnumType.STRING;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="resume_id")
    private Long resumeId;

    @Column(name="user_id", nullable = false, length = 63)
    private Long userId;

    @Column(name="resume_title", nullable = false)
    private String resumeTitle;

    private String essay;

    @Column(name="open_status", nullable = false)
    @Enumerated(STRING)
    private OpenStatus openStatus = OpenStatus.CLOSE;

    @Column(name="file_url")
    private String fileUrl;
}
