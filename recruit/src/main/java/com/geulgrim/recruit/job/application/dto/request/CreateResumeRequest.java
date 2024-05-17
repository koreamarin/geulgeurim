package com.geulgrim.recruit.job.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.List;

@Getter
@Setter
@ToString
public class CreateResumeRequest {
    private String resumeTitle;
    private String essay;
    private String openStatus;
    private List<Long> positionIds;
    private List<Long> pofolIds;
    private List<CreateEducationRequest> createEducationRequests;
    private List<CreateWorkRequest> createWorkRequests;
    private List<CreateAwardRequest> createAwardRequests;
    private List<CreateExperienceRequest> createExperienceRequests;
}
