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

type ResumeListResult = {
  getJobsResponses: any[],
  totalPage:number
}

type ResumeStarsResult = {
  getJobsResponses: any[]
}

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
      recruitsData: (data as ResumeListResult) || {getResumesResponse : [], totalPage : 0},
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
      recruitStarsData: (data as ResumeStarsResult) || {getResumesResponse : []},
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



// export function useGetResumeDetail(resumeId:number | undefined) {
//   const URL = endpoints.resume.list;
//   const { data, isLoading, error, isValidating } = useSWR(resumeId ? `${URL}/${resumeId}` : null, customFetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       resumesDetailData: (data as ResumeDetail),
//       resumesDetailLoading: isLoading,
//       resumesDetailError: error,
//       resumesDetailValidating: isValidating,
//     }),
//     [data, error, isLoading, isValidating]);

//   return memoizedValue;
// }

// // ----------------------------------------------------------------------

// export async function postResumeList(resumeData: FormData) {
//   const URL = endpoints.resume.list;
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     await axios ({
//       method: 'post',
//       url: `${CUSTOM_API}${URL}`,
//       data: resumeData,
//       headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}`}
//     })

//     // SWR mutate를 이용하여 로컬 데이터 업데이트
//     mutate(URL, (currentData: any) => {
//       const updatedResumes = [...(currentData?.resumes || []), resumeData]

//       return { ...currentData, resumes: updatedResumes };
//     }, false);

//     return true

//   } catch (error) {
//     console.log(error)
//     return false
//   }
// }

// // ----------------------------------------------------------------------

// export async function deleteResumeId(resumeId: number) {
//   const URL = endpoints.resume.list;
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     await axios ({
//       method: 'delete',
//       url: `${CUSTOM_API}${URL}/${resumeId}`,
//       headers: {'Authorization': `Bearer ${accessToken}`}
//     })

//     // SWR mutate를 이용하여 로컬 데이터 업데이트
//     mutate(URL, async (data: ResumeListResult) => (
//        {
//         ...data,
//         getResumesResponse: data.getResumesResponse.filter(resume => resume.resumeId !== resumeId),
//         totalPage: data.totalPage - 1
//       }
//     ), false);
//     return true
//   } catch (error) {
//     console.log(error)
//     return false
//   }
// }
