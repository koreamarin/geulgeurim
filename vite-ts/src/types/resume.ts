// 학력 type
export type Education = {
  institutionName  ?: string
  startDate? : Date
  endDate?: Date
  educationStatus?:string | undefined
  gpa?: number | null
}

export type EducationDetail = {
  educationId:number
  institutionName : string
  startDate: string
  endDate?: string
  educationStatus?:string
  gpa?: number | null
}

// 경력 type
export type Work = {
  company?: string
  startDate? : Date
  endDate? : Date
  content? : string
}

export type WorkDetail = {
  workId: number
  companyName?: string
  startDate? : string
  endDate? : string
  content? : string
}

// 수상내역... type
export type Award = {
    awardName? : string
    acquisitionDate? : Date
    institution?: string
    score?: string
}

export type AwardDetail = {
  awardId: number
  awardName? : string
  acquisitionDate? : string
  institution?: string
  score?: string
}

// 경험... type
export type Experience = {
    experienceTitle?: string
    experienceContent? : string
    startDate ?: Date
    endDate ?: Date
}

export type ExperienceDetail = {
  experienceId: number
  experienceTitle?: string
  experienceContent? : string
  startDate ?: string
  endDate ?: string
}

// 포지션
export type Position = {
  positionId : number
  resumePositionId: number
}

// 포트폴리오
export type Portfolio = {
  pofolId : number
  resumePofolId: number
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
  resumeTitle:string
  essay?:string
  openStatus?: string | undefined
  fileUrl?:File | string
  positionIds?: string[]
  pofolIds?: string[]
  createEducationRequests?: Education[]
  createWorkRequests?: Work[]
  createAwardRequests?: Award[]
  createExperienceRequests?: Experience[]
}

export type ResumeDetail = {
  resumeId:number
  resumeTitle:string
  essay:string
  openStatus?: string
  fileUrl?:string
  resumePositionResponses: Position[] | []
  resumePortfolioResponses: Portfolio[] | []
  educationResponses: EducationDetail[]
  workResponses: WorkDetail[]
  awardResponses: AwardDetail[]
  experienceResponses: ExperienceDetail[]
}

