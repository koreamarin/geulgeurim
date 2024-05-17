// 학력 type
export type Education = {
  institutionName  ?: string,
  startDate? : Date,
  endDate?: Date,
  educationStatus?:string | undefined,
  gpa?: number | null
}

// 경력 type
export type Work = {
    company?: string,
    startDate? : Date,
    endDate? : Date,
    content? : string
}

// 수상내역... type
export type Award = {
    awardName? : string,
    acquisitionDate? : Date,
    institution?: string,
    score?: string
}

// 경험... type
export type Experience = {
    experienceTitle?: string,
    experienceContent? : string,
    startDate ?: Date,
    endDate ?: Date
}

// 포지션
export type Position = {
  positionId : number,
  resumePositionId: number
}

// 응답 type
export type IResumeResponse = {
  resumeId: number;
  fileUrl: string | null;
  resumeTitle: string;
  getResumePositionResponses: Position[];
  openStatus: string;
  essay: string;
  createdAt: string;
  updatedAt: string;
};

export type InputResume = {
  resumeTitle:string,
  essay?:string,
  openStatus?: string | undefined,
  fileUrl?:File | string,
  positionIds?: string[],
  pofolIds?: string[],
  createEducationRequests?: Education[],
  createWorkRequests?: Work[]
  createAwardRequests?: Award[]
  createExperienceRequests?: Experience[]
}
