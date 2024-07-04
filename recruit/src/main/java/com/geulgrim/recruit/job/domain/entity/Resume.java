package com.geulgrim.recruit.job.domain.entity;

import com.geulgrim.recruit.global.entity.BaseEntity;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Resume extends BaseEntity {
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
    private OpenStatus openStatus = OpenStatus.PRIVATE;

    @Column(name="file_url")
    private String fileUrl;

    @Builder
    private Resume(Long resumeId, Long userId, String resumeTitle, String essay, OpenStatus openStatus, String fileUrl) {
        this.resumeId = resumeId;
        this.userId = userId;
        this.resumeTitle = resumeTitle;
        this.essay = essay;
        this.openStatus = openStatus;
        this.fileUrl = fileUrl;
    }

    public void updateResumeTitle(String resumeTitle) {
        this.resumeTitle = resumeTitle;
    }

    public void updateEssay(String essay) {
        this.essay = essay;
    }

    public void updateOpenStatus(OpenStatus openStatus) {
        this.openStatus = openStatus;
    }

    public void updateFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
