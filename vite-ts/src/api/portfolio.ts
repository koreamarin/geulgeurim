
import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';



// ----------------------------------------------------------------------

export async function useGetPortfolios() {
  // const URL = endpoints.portfolio.list;

  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJ1c2VySWQiOjMzLCJ1c2VyVHlwZSI6IklORElWSURVQUwiLCJpYXQiOjE3MTU1Njk1OTEsImV4cCI6MTcxNTYwNTU5MX0.Nt9nKvEV8TyY7uU1xrCeWtEbmjEeHk2gdaWj_czPRas'

  // // const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher);
  // const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { user_id: 33 } }], customFetcher);

  // const memoizedValue = useMemo(
  //   () => ({
  //     portfolios: (data) || [],
  //     portfoliosLoading: isLoading,
  //     portfoliosError: error,
  //     portfoliosValidating: isValidating,
  //     portfoliosEmpty: !isLoading && !data?.length,
  //   }),
  //   [data, error, isLoading, isValidating]
  // );

  // return memoizedValue;

  const url = `http://localhost:8080/api/v1/common/portfolio`;

  try {
    const response = await axios.get(url, {
      headers: {
        user_id: 33
      }
    });
    console.log('성공', response.data);
    return response.data;
  } catch (error) {
    console.error('에러!', error);
    throw error;
  }

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

export async function getPortfolioDetail(pofolId: number) {

  const url = `http://localhost:8080/api/v1/common/portfolio/detail/${pofolId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        user_id: 33
      }
    });
    console.log('상세보기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('상세보기 에러!', error);
    throw error;
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
