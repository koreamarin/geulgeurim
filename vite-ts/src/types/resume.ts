
// 학력 type
export type Education = {
    insitutionName : string,
    startDate : Date,
    endDate?: Date,
    educationStatus: 'COMPLETED' | 'ONGOING',
    gpa?: number
}

// 경력 type
export type Work = {
    company : string,
    startDate : Date,
    endDate : Date,
    content : string
}

// 수상내역... type
export type Award = {
    awardName : string,
    acquisitionDate : Date,
    institution?: string,
    score?: string
}

// 경험... type
export type Experience = {
    experienceTitle : string,
    experienceContent : string,
    startDate : Date,
    endDate : Date
}
