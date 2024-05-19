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

type PieceDetail = {
  id: number
  ownerId: number
  fileUrl: string
  name: string
  description: string
  pieceType: string
  nftType: string
  status: string
  createdAt: string
  updatedAt: string
}


export function useGetPiecesList(type: string) {
  const URL = endpoints.pieces.mine;
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

// ----------------------------------------------------------------------


export function useGetPiecesDetail(pieceId: number) {
  const URL = endpoints.pieces.detail
  const { data, isLoading, error, isValidating } = useSWR(`${URL}/${pieceId}`, customFetcher);

  const memoizedValue = useMemo(
    () => ({
      pieceDetailData: data as PieceDetail,
      pieceDetailLoading: isLoading,
      pieceDetailError: error,
      pieceDetailValidating: isValidating,

    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}
