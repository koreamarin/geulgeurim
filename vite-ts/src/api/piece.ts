import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { endpoints, customFetcher } from 'src/utils/custom-axios';

import { CUSTOM_API } from 'src/config-global';

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

const accessToken = localStorage.getItem('accessToken')

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

// ----------------------------------------------------------------------

export async function createPiece(data: any) {
  const URL = endpoints.pieces.create;

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

export async function deletePiece(pieceId: number) {
  const URL = endpoints.pieces.delete;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    await axios.delete(`${CUSTOM_API}${URL}/${pieceId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error('Error deleting piece:', error);
    throw new Error('Failed to delete piece');
  }

}
