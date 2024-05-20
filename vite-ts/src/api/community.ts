import useSWR from 'swr';
import { useMemo } from 'react';

import { customFetcher } from 'src/utils/custom-axios';

// ----------------------------------------------------------------------

export function useGetCommunityMain() {
  const URL = "/api/v1/community"

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher);
  // console.log('Community Main' ,data)

  const memoizedValue = useMemo(
    () => ({
      community: (data) || [],
      communityLoading: isLoading,
      communityError: error,
      communityValidating: isValidating,
      newBoardEmpty: !isLoading && !data?.newBoard?.length,
      popBoardEmpty: !isLoading && !data?.popBoard?.length,
      newShareEmpty: !isLoading && !data?.newShare?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBoardList() {
  const URL = "/api/v1/community/board"

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  });
  // console.log('Board List' ,data)

  const memoizedValue = useMemo(
    () => ({
      boardList: (data) || [],
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetBoardDetail(boardId: string) {
  const URL = `/api/v1/community/board/${boardId}`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  });
  // console.log('Board Detail' ,data)

  const memoizedValue = useMemo(
    () => ({
      board: (data?.board) || [],
      commentList: (data?.commentList) || [],
      imageList: (data?.imageList) || [],
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data?.board,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetShareList() {
  const URL = `/api/v1/community/share`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  });
  // console.log('Share List' ,data)

  const memoizedValue = useMemo(
    () => ({
      share: (data) || [],
      shareLoading: isLoading,
      shareError: error,
      shareValidating: isValidating,
      shareEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetShareDetail(shareId: string) {
  const URL = `/api/v1/community/share/${shareId}`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  }); 
  // console.log('Share List' ,data)

  const memoizedValue = useMemo(
    () => ({
      share: (data?.share) || [],
      commentList: (data?.commentList) || [],
      imageList: (data?.imageList) || [],
      shareLoading: isLoading,
      shareError: error,
      shareValidating: isValidating,
      shareEmpty: !isLoading && !data?.share,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetBoardSearch(searchRef: string, optionBy: string, sortBy: string | null | undefined, page: number) {
  const URL = `/api/v1/community/board/search/keyword=${searchRef}&searchType=${optionBy}&sortBy=${sortBy}&page=?${page}`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  });
  console.log('Share List' ,data)

  const memoizedValue = useMemo(
    () => ({
      searchBoard: (data) || [],
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetCrewDetail(crewId: string) {
  const URL = `/api/v1/community/crew/detail/${crewId}`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  }); 
  console.log('Crew Detail' ,data)

  const memoizedValue = useMemo(
    () => ({
      crew: (data) || [],
      shareLoading: isLoading,
      shareError: error,
      shareValidating: isValidating,
      shareEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}

// ----------------------------------------------------------------------

export function useGetMyBoards(page: number) {
  const URL = `/api/v1/community/board/myboard?page=${page}&size=10`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  }); 
  console.log('My Board' ,data)

  const memoizedValue = useMemo(
    () => ({
      myBoard: (data) || [],
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMyComments(page: number) {
  const URL = `/api/v1/community/comment/board/mycomment?page=${page}&size=10`

  const token = `Bearer ${localStorage.getItem('accessToken')}`

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher, {
    refreshInterval: 0,  // disable automatic re-fetching
    revalidateOnFocus: false, // disable re-fetching when the window is focused
  }); 
  console.log('My Comments' ,data)

  const memoizedValue = useMemo(
    () => ({
      myComments: (data) || [],
      commentLoading: isLoading,
      commentError: error,
      commentValidating: isValidating,
      commentEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------