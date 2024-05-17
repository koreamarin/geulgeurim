import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';

import { IResumeResponse } from 'src/types/resume';
// ----------------------------------------------------------------------

type GetResumeProps = {
  searchType: string,
  searchWord: string,
  sortType: string,
  sort: string
}

const URL = endpoints.resume.list;

export function useGetResumeList({ searchType, searchWord, sortType, sort }:GetResumeProps) {
  const searchParams = new URLSearchParams();
  searchParams.append('searchType', searchType);
  searchParams.append('searchWord', searchWord);
  searchParams.append('sortType', sortType);
  searchParams.append('sort', sort);
  const queryUrl = `${URL}?${new URLSearchParams(searchParams).toString()}`
  const { data, isLoading, error, isValidating } = useSWR(queryUrl, fetcher);

  const memoizedValue = useMemo(
    () => ({
      resumes: (data?.getResumesResponse  as IResumeResponse[]),
      resumesLoading: isLoading,
      resumesError: error,
      resumesValidating: isValidating,
      resumesEmpty: !isLoading && data?.getResumesResponse.length === 0,
    }),
    [data?.getResumesResponse, error, isLoading, isValidating]);

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

export async function deleteResumeList(resumeData: FormData) {

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios ({
      method: 'delete',
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
