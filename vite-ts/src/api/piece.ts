import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/custom-axios';

// import { IResumeResponse } from 'src/types/resume';
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

export function useGetPiecesList() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      piecesData: (data as Pieces[]),
      piecesLoading: isLoading,
      piecesError: error,
      piecesValidating: isValidating,
      piecesEmpty: !isLoading && data.length === 0,
    }),
    [data, error, isLoading, isValidating]);

  return memoizedValue;
}


// ----------------------------------------------------------------------

export async function getPieceDetail(pieceId: number) {

  const url = `http://localhost:8080/api/v1/common/piece/detail/${pieceId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        user_id: 33
      }
    });
    console.log('작품 상세보기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('작품 상세보기 에러!', error);
    throw error;
  }

}
