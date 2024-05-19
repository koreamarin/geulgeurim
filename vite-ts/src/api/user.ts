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
