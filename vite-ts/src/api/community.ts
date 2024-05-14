import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { communityMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function useGeCommunityMain() {
  const URL = endpoints.post.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      community: (data?.map as communityMainItem) || [],
      communityLoading: isLoading,
      communityError: error,
      communityValidating: isValidating,
      communityEmpty: !isLoading && !data?.map.length,
    }),
    [data?.map, error, isLoading, isValidating]
  );

  return memoizedValue;
}
