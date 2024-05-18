import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';
// ----------------------------------------------------------------------

type PortfolioList = {
  pofolId: number
  pofolName: string
  openState: string
  format: string
  createdAt: string
  updatedAt: string
}[]

type Piece = {
  title: string
  program: string
  contribution: string
  content: string
  pieceUrl: string
}

type PortfolioDetail = {
  pofolId: number
  pofolName: string
  status: string
  pieces: Piece[]
}

type PortfolioUserDetail = {
  pofolId: number
  pofolName: string
  status: string
  fileUrls: string[]
}


export function useGetPortfolios() {
  const URL = endpoints.portfolio.list;
  const { data, isLoading, error, isValidating, mutate: portfoliosMutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      portfoliosData: (data as PortfolioList) || [],
      portfoliosLoading: isLoading,
      portfoliosError: error,
      portfoliosValidating: isValidating,
      portfoliosMutate
    }),
    [data, error, isLoading, isValidating, portfoliosMutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function usePortfolioDetail(pofolId: number) {
  const URL = endpoints.portfolio.detail
  const { data, isLoading, error, isValidating } = useSWR(`${URL}/${pofolId}`, fetcher);

  const memoizedValue = useMemo(
    () => ({
      portfolioDetailData: data as PortfolioDetail,
      portfolioDeatilLoading: isLoading,
      portfolioDetailError: error,
      portfolioDetailValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function usePortfolioDetailUserFormat(pofolId: number) {
  const URL = endpoints.portfolio.detailUserFormat
  const { data, isLoading, error, isValidating } = useSWR(`${URL}/${pofolId}`, fetcher);

  const memoizedValue = useMemo(
    () => ({
      portfolioDetailUserData: data as PortfolioUserDetail,
      portfolioDeatilUserLoading: isLoading,
      portfolioDetailUserError: error,
      portfolioDetailUserValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------


// export async function createUserFormat(eventData: ICalendarEvent) {
export async function createUserFormat(data: any) {
  // const URL = endpoints.portfolio.writeUser;
  /**
   * Work on server
   */
  await axios.post('http://localhost:8080/api/v1/common/portfolio/user',
  data,
  {headers : {
    user_id : 33
  }}  )
  .then((res) => console.log('성공', res))
  .catch((err) => console.log('에러!', err))

  // const data = { eventData };
  // await axios.post(URL, data);

  /**
   * Work in local
   */
  // mutate(
  //   URL,
  //   (currentData: any) => {
  //     const events: ICalendarEvent[] = [...currentData.events, eventData];

  //     return {
  //       ...currentData,
  //       events,
  //     };
  //   },
  //   false
  // );
}

// ----------------------------------------------------------------------

export async function createPortfolio(data: any) {
  // const URL = endpoints.portfolio.writeUser;
  /**
   * Work on server
   */
  await axios.post('http://localhost:8080/api/v1/common/portfolio',
  data,
  {headers : {
    user_id : 33
  }}  )
  .then((res) => console.log('성공', res))
  .catch((err) => console.log('에러!', err))

  // const data = { eventData };
  // await axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function deletePortfolio (pofolId: number) {
  const url = `http://localhost:8080/api/v1/common/portfolio/${pofolId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        user_id: 33
      }
    });
    return response.data;
  } catch (err) {
    console.error('Delete error:', err);
    return err;
  }

}


// ----------------------------------------------------------------------

export async function getPortfolioDetailUserFormat(pofolId: number) {

  const url = `http://localhost:8080/api/v1/common/portfolio/detail/user/${pofolId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        user_id: 33
      }
    });
    console.log('사용자 포맷 상세보기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('사용자 포맷 상세보기 에러!', error);
    throw error;
  }

}
