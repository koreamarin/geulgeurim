import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';

import { ResumeDetail, IResumeResponse } from 'src/types/resume';
// ----------------------------------------------------------------------

type GetResumeProps = {
  searchType: string,
  searchWord: string,
  sortType: string,
  sort: string
}

type ResumeListResult = {
  getResumesResponse: IResumeResponse[],
  totalPage:number
}

const URL = endpoints.resume.list;

export function useGetResumeList({ searchType, searchWord, sortType, sort }:GetResumeProps) {
  const searchParams = new URLSearchParams();
  searchParams.append('searchType', searchType);
  searchParams.append('searchWord', searchWord);
  searchParams.append('sortType', sortType);
  searchParams.append('sort', sort);
  const queryUrl = `${URL}?${new URLSearchParams(searchParams).toString()}`
  const { data, isLoading, error, isValidating, mutate: resumesMutate } = useSWR(queryUrl, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      resumesData: (data as ResumeListResult) || {getResumesResponse : [], totalPage : 0},
      resumesLoading: isLoading,
      resumesError: error,
      resumesValidating: isValidating,
      resumesMutate
    }),
    [data, error, isLoading, isValidating, resumesMutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetResumeDetail(resumeId: number | undefined) {
  const { data, isLoading, error, isValidating } = useSWR(resumeId ? `${URL}/${resumeId}` : null, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      resumesDetailData: (data as ResumeDetail),
      resumesDetailLoading: isLoading,
      resumesDetailError: error,
      resumesDetailValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function postResumeList(resumeData: FormData) {

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'post',
      url: `${CUSTOM_API}${URL}`,
      data: resumeData,
      headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}`}
    })

    // SWR mutate를 이용하여 로컬 데이터 업데이트
    mutate(URL, (currentData: any) => {
      const updatedResumes = [...(currentData?.resumes || []), resumeData]

      return { ...currentData, resumes: updatedResumes };
    }, false);

    return true

  } catch (error) {
    console.log(error)
    return false
  }
}

// ----------------------------------------------------------------------

export async function deleteResumeId(resumeId: number) {

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'delete',
      url: `${CUSTOM_API}${URL}/${resumeId}`,
      headers: {'Authorization': `Bearer ${accessToken}`}
    })

    // SWR mutate를 이용하여 로컬 데이터 업데이트
    mutate(URL, async (data: ResumeListResult) => {
      if (data && data.getResumesResponse) {
        return {
          ...data,
          getResumesResponse: data.getResumesResponse.filter(resume => resume.resumeId !== resumeId),
          totalPage: data.totalPage ? data.totalPage - 1 : 0
        };
      }
      return data;
    }, false);
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
