import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';

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

const accessToken = localStorage.getItem('accessToken')


export function useGetPortfolios() {
  const URL = endpoints.portfolio.list;
  const { data, isLoading, error, isValidating, mutate: portfoliosMutate } = useSWR(URL, customFetcher);

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

export async function createUserFormat(data: any) {
  const URL = endpoints.portfolio.createUser;

  try {
    const response = await axios.post(`${CUSTOM_API}${URL}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }

}

// ----------------------------------------------------------------------

export async function createPortfolio(data: any) {
  const URL = endpoints.portfolio.create;

  try {
    await axios.post(`${CUSTOM_API}${URL}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function deletePortfolio (pofolId: number) {
  const URL = endpoints.portfolio.delete

  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    await axios.delete(`${CUSTOM_API}${URL}/${pofolId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    throw new Error('Failed to delete portfolio');
  }

}

// ----------------------------------------------------------------------


export function usePortfolioDetail(pofolId: number) {
  const URL = endpoints.portfolio.detail
  const { data, isLoading, error, isValidating } = useSWR(`${URL}/${pofolId}`, customFetcher);

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
  const { data, isLoading, error, isValidating } = useSWR(`${URL}/${pofolId}`, customFetcher);

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
