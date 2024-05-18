import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { customFetcher, endpoints } from 'src/utils/custom-axios';

// ----------------------------------------------------------------------

type Pieces = {
  id: number,
  fileUrl: string,
  description: string,
  name: string,
  nftType: string,
  ownerId: number,
  type: string
}

const URL = endpoints.pieces.mine;

export function useGetPiecesList(type: string) {
  const vURL = `${URL}type=${type}`
  const { data, isLoading, error, isValidating } = useSWR(vURL, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      piecesData: (data as Pieces[]) || [],
      piecesLoading: isLoading,
      piecesError: error,
      piecesValidating: isValidating,

    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}
