import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';
// ----------------------------------------------------------------------

type GetRecruitProps = {
  positionIds: number[]
  experienceTypes: string[]
  closeTypes: string[]
}

type RecruitListResult = {
  getJobsResponses: any[],
  totalPage:number
}

type RecruitStarsResult = {
  getJobsResponses: any[]
}

type FirstLocate = {
  firstLocateKey: number;
  firstLocateName: string;
}

type SecondLocate = {
  secondLocateKey: number;
  firstLocate: FirstLocate;
  secondLocateName: string;
}

type JobResponse = {
  jobId: number;
  secondLocate: SecondLocate;
  startDate: string;
  endDate: string;
  url: string;
  title: string;
  content: string;
  companyName: string;
  companyUrl: string;
  jobType: string;
  experienceType: string;
  minExperience: number;
  education: string;
  perk: string;
  procedureInfo: string;
  salary: string;
  closeType: string;
  openStatus: string;
  fileUrl: string;
  star: boolean;
  positionIds: number[];
  applyStatus: boolean;
}

type GetMyRecruitProps = {
  getJobsResponses: {
    jobId: number;
    secondLocate: {
      secondLocateKey: number;
      firstLocate: {
        firstLocateKey: number;
        firstLocateName: string;
      };
      secondLocateName: string;
    };
    startDate: string;
    endDate: string;
    title: string;
    companyName: string;
    positionIds: number[];
  }[];
  totalPage: number;
};




export function useGetRecruitList({ positionIds, experienceTypes, closeTypes}:GetRecruitProps) {
  const URL = endpoints.recruit.list;
  const searchParams = new URLSearchParams();
  if (positionIds.length > 0) searchParams.append('positionIds', positionIds.join(','))
  else searchParams.append('positionIds', (''))
  if (experienceTypes.length > 0) searchParams.append('experienceTypes', experienceTypes.join(','));
  else searchParams.append('experienceTypes', (''))
  if (closeTypes.length > 0) searchParams.append('closeTypes', closeTypes.join(','));
  else searchParams.append('closeTypes', (''))
  const queryUrl = `${URL}?${new URLSearchParams(searchParams).toString()}`
  const { data, isLoading, error, isValidating, mutate: recruitsMutate } = useSWR(queryUrl, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      recruitsData: (data as RecruitListResult) || {getResumesResponse : [], totalPage : 0},
      recruitsLoading: isLoading,
      recruitsError: error,
      recruitsValidating: isValidating,
      recruitsMutate
    }),
    [data, error, isLoading, isValidating, recruitsMutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

// 관심 공고 조회

export function useGetRecruitStarsList(token:string | null) {
  const URL = endpoints.recruit.stars;

  const checkToken = !!token
  const { data, isLoading, error, isValidating, mutate: recruitStarsMutate } = useSWR(checkToken ? URL : null, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      recruitStarsData: (data as RecruitStarsResult) || {getResumesResponse : []},
      recruitStarsLoading: isLoading,
      recruitStarsError: error,
      recruitStarsValidating: isValidating,
      recruitStarsMutate
    }),
    [data, error, isLoading, isValidating, recruitStarsMutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

// 관심 공고 등록

export async function submitRecruitStar(recruitId:number) {
  const URL = endpoints.recruit.stars;
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'post',
      url: `${CUSTOM_API}${URL}`,
      data: {
        'jobId' : recruitId
      },
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

// ----------------------------------------------------------------------

// 관심 공고 삭제

export async function deleteRecruitStar(recruitId:number) {
  const URL = endpoints.recruit.stars;
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'delete',
      url: `${CUSTOM_API}${URL}`,
      data: {
        'jobId' : recruitId
      },
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

// ----------------------------------------------------------------------

// 공고 상세 조회

export function useGetRecruitDetailList(id:number) {
  const URL = `${endpoints.recruit.detail}/${id}`;
  const { data, isLoading, error, isValidating, mutate: recruitDetailMutate } = useSWR(URL, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      recruitDetailData: (data as JobResponse) || {},
      recruitDetailLoading: isLoading,
      recruitDetailError: error,
      recruitDetailValidating: isValidating,
      recruitDetailMutate
    }),
    [data, error, isLoading, isValidating, recruitDetailMutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

// 공고 등록

export async function submitRecruit(recruitId:number, resumeId:number, Data: FormData) {

  const URL = `${endpoints.recruit.submit}/${recruitId}/submitted/${resumeId}`;

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'post',
      url: `${CUSTOM_API}${URL}`,
      data: Data,
      headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}`}
    })
    return true

  } catch (error) {
    console.log(error)
    return false
  }
}

// ----------------------------------------------------------------------

// 작성한 공고

export function useGetMyRecruitList(page: number = 0, size: number = 20) {
  const URL =  endpoints.company.myRecruit;
  const queryURL = `${URL}?page=${page}&size=${size}`;

  const { data, isLoading, error, isValidating, mutate: recruitMineMutate } = useSWR(queryURL, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      recruitMineData: (data as GetMyRecruitProps) || { getJobsResponses: [], totalPage: 0 },
      recruitMineLoading: isLoading,
      recruitMineError: error,
      recruitMineValidating: isValidating,
      recruitMineMutate,
    }),
    [data, error, isLoading, isValidating, recruitMineMutate]
  );

  return memoizedValue;
}


type GetSubmittListProps = {
  getSubmittedResumesResponse : {
    resumeId: number
    resultStatus: string
    resumeUrl: string
    resumeTitle: string
  }[]
}

// ----------------------------------------------------------------------

// 지원자 리스트

export function useGetSubmittList(recruit: number) {
  const URL =  endpoints.company.submittList;
  const queryURL = `${URL}/${recruit}/submitted`;

  const { data, isLoading, error, isValidating, mutate: recruitSubmittMutate } = useSWR(queryURL, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      recruitSubmittData: (data as GetSubmittListProps) || { getJobsResponses: []},
      recruitSubmittLoading: isLoading,
      recruitSubmittError: error,
      recruitSubmittValidating: isValidating,
      recruitSubmittMutate,
    }),
    [data, error, isLoading, isValidating, recruitSubmittMutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// 합격 여부 수정


export async function passedOrNot(recruitId:number, resumeId:number, resultStatus: 'SUCCESS' | 'FAIL') {

  const URL = `${endpoints.recruit.submit}/${recruitId}/submitted/${resumeId}`;

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios({
      method: 'put',
      url: `${CUSTOM_API}${URL}`,
      data: { resultStatus },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// ----------------------------------------------------------------------

// 내가 낸 이력서 확인

type ApplyResponse = {
  resumeUrl: string;
  resultStatus: string;
  jobTitle: string;
  position: string[];
  companyName: string;
  endDate: string;
  jobId: number;
};

type ApplyResponses = {
  getMyApplyedJobsResponses: ApplyResponse[];
  totalPage: number;
};

export function useGetApplyList() {
  const URL =  endpoints.recruit.apply;

  const { data, isLoading, error, isValidating, mutate: applyMutate } = useSWR(URL, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      applyData: (data as ApplyResponses) || { getMyApplyedJobsResponses: [], totalPage:0},
      applyLoading: isLoading,
      applyError: error,
      applyValidating: isValidating,
      applyMutate,
    }),
    [data, error, isLoading, isValidating, applyMutate]
  );

  return memoizedValue;
}