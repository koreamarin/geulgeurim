import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';


type UserDetail = {
  userId: number,
  email?: string,
  birthday?: string,
  name: string,
  nickname?: string,
  wallet?: string,
  userType?: string,
  fileUrl?: string,
  phoneNum?: string,
  fcmToken?: string
}

type CompanyInfo = {
    userId: number
    manager: string
    company: string
    thumbnail: string | null
    birthday: string
    address: string
    introduce: string | null
    ceo_name: string
}

export function useGetUserDetail() {
  const URL = endpoints.user.detail
  const { data, isLoading, error, isValidating } = useSWR(`${URL}`, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      userDetailData: data as UserDetail,
      userDetailLoading: isLoading,
      userDetailError: error,
      userDetailValidating: isValidating,

    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetCompanyDetail() {
  const URL = endpoints.company.info
  const { data, isLoading, error, isValidating } = useSWR(`${URL}`, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      companyDetailData: data as CompanyInfo,
      companyDetailLoading: isLoading,
      companyDetailError: error,
      companyDetailValidating: isValidating,

    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}

