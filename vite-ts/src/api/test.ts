// import useSWR from 'swr';
// import { useMemo } from 'react';

// import { endpoints, customFetcher } from 'src/utils/custom-axios';

// // ----------------------------------------------------------------------

// export function useGetPortfolios() {
//   const URL = endpoints.portfolio.list;

//   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJ1c2VySWQiOjMzLCJ1c2VyVHlwZSI6IklORElWSURVQUwiLCJpYXQiOjE3MTU1Njk1OTEsImV4cCI6MTcxNTYwNTU5MX0.Nt9nKvEV8TyY7uU1xrCeWtEbmjEeHk2gdaWj_czPRas'

//   const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${token}` } }], customFetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       portfolios: (data) || [],
//       portfoliosLoading: isLoading,
//       portfoliosError: error,
//       portfoliosValidating: isValidating,
//       portfoliosEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }
