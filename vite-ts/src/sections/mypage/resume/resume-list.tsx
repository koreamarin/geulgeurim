import { useRef, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetResumeList } from 'src/api/mypageResume';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';

import ResumeListCard from './resume-list-card';
import ResumeListSort from './resume-list-sort';
import ResumeListSearchOption from './resume-list-search-option';



// ----------------------------------------------------------------------


const WORKS_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'past', label: '과거 순' },
  { value: 'update', label: '최근 수정' },
  { value: 'pastUpdate', label: '과거 수정' },
];

const WORKS_SEARCH_OPTIONS = [
  { value: 'essay', label: '자소서' },
  { value: 'title', label: '제목' },
];


export default function ResumeList() {
  // 검색 창 입력 값
  const changeSearchRef = useRef<string>('')

  // 검색 조건
  const [optionBy, setOptionBy] = useState('title');

  // 검색 조건 변경
  const handleOptionBy = useCallback((newValue: string) => {
    setOptionBy(newValue);
  }, []);

  // 검색 입력 후 enter
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  // 정렬 조건
  const [sortBy, setSortBy] = useState('latest');

  // 정렬 조건 변경
  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
    if (newValue === 'latest') {
      querySort.current = 'create'
      querySortBy.current = 'desc'
    }
    if (newValue === 'past') {
      querySort.current = 'create'
      querySortBy.current = 'asc'
    }
    if (newValue === 'update') {
      querySort.current = 'update'
      querySortBy.current = 'desc'
    }
    if (newValue === 'pastUpdate') {
      querySort.current = 'update'
      querySortBy.current = 'asc'
    }
  }, []);

  const querySearch = useRef<string>('')
  const querySort = useRef<string>('create')
  const querySortBy = useRef<string>('desc')

  // 페이지네이션
  const [page, setPage] = useState<number>(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const pageCount = 5


  // useSWR 관리
  const { resumesData, resumesLoading, resumesError, resumesMutate } = useGetResumeList({
    searchType:optionBy,
    searchWord: querySearch.current,
    sortType:querySort.current,
    sort:querySortBy.current})

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  if (resumesError) {
    enqueueSnackbar('에러 발생! 다시 로그인해주세요');
    localStorage.clear();
    router.push(paths.recruit.main)
  }

  const userName = localStorage.getItem('nickname')
  const userId = localStorage.getItem('userId')

  // 새 이력서 form 이동
  const moveWrite = () => {
    router.push(paths.mypage.resumeWrite)
  }

  // 검색 창 입력 값 출력(추후 api에 추가)
  const handleClick = async  () => {
    console.log(changeSearchRef.current)
    querySearch.current = changeSearchRef.current
    await resumesMutate()
  };

  // 조건 랜더
  const renderResumeList = () => {
    if (resumesLoading) {
      return <SplashScreen />;
    }
    if (!resumesData.totalPage) {
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>이력서가 없습니다.</Typography>;
    }
    return resumesData.getResumesResponse.slice((page - 1) * pageCount, page * pageCount).map((item, index) => {
      const positionList = item.getResumePositionResponses.map(positionItem => positionItem.positionId);
      return (
        <ResumeListCard
          key={index}
          resumeId={item.resumeId}
          resumeTitle={item.resumeTitle}
          essay={item.essay}
          openStatus={item.openStatus}
          fileUrl={item.fileUrl}
          updateAt={item.updatedAt}
          createAt={item.createdAt}
          position={positionList}
        />
      );
    });
  }



    return (
      <>
        <Typography variant="h3" sx={{ mb: 5 }}>
          {userName || `사용자${userId}` } 님의 이력서
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* search 조건 */}
          <ResumeListSearchOption searchOption={optionBy} onOption={handleOptionBy} searchOptionOptions={WORKS_SEARCH_OPTIONS}/>

          {/* search */}
          <TextField
            placeholder="검색"
            onKeyUp={handleKeyUp}
            sx={{ flexGrow: 1, my: 1 }}
            onChange={(event) => {changeSearchRef.current = event.target.value}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleClick} />
                </InputAdornment>
              )
            }}
          />

          {/* sort */}
          <ResumeListSort sort={sortBy} onSort={handleSortBy} sortOptions={WORKS_SORT_OPTIONS} />
          <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="contained" color="success" size="medium" onClick={moveWrite}>
            새 이력서
          </Button>
        </Stack>
        {renderResumeList()}
        <Pagination
          page={page}
          onChange={handleChange}
          count={Math.floor((resumesData.totalPage - 1) / pageCount) + 1}
          defaultPage={1}
          siblingCount={1}
          sx={{
            mt: 3,
            mb: 3,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      </>
    );
  }

