import useSWR from 'swr';
import { useMemo } from 'react';

import { customFetcher, endpoints } from 'src/utils/custom-axios';

import { communityMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function useGetCommunityMain() {
  const URL = "/api/v1/community"

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJ1c2VySWQiOjMzLCJ1c2VyVHlwZSI6IklORElWSURVQUwiLCJpYXQiOjE3MTU1Njk1OTEsImV4cCI6MTcxNTYwNTU5MX0.Nt9nKvEV8TyY7uU1xrCeWtEbmjEeHk2gdaWj_czPRas'

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher);
  console.log('adas' ,data)

  const memoizedValue = useMemo(
    () => ({
      community: (data?.map) || [],
      communityLoading: isLoading,
      communityError: error,
      communityValidating: isValidating,
      newBoardEmpty: !isLoading && !data?.newBoard.length,
      popBoardEmpty: !isLoading && !data?.popBoard.length,
      newShareEmpty: !isLoading && !data?.newShare.length,
    }),
    [data?.map, data?.newBoard.length, data?.newShare.length, data?.popBoard.length, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBoardList() {

}

// ----------------------------------------------------------------------

export function useGetBoardDetail() {
  
}

// ----------------------------------------------------------------------

export function useGetShareList() {

}

// ----------------------------------------------------------------------

export function useGetShareDetail() {

}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
