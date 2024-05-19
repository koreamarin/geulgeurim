import axios from 'axios';
import { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CUSTOM_API } from 'src/config-global';

import Iconify from 'src/components/iconify';

import CrewItem from 'src/sections/blog/crew-item';

import { CrewMainItem } from 'src/types/blog';

import InformationRecentSort from './crew-recent-sort';
import InformationRecentSearchOption from './crew-recent-search-options';

// ----------------------------------------------------------------------
const POST_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'oldest', label: '과거 순' },
];

const POST_SEARCH_OPTIONS = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'author', label: '작성자' },
  { value: 'title+content', label: '제목+내용' },
];

export default function ShareRecentPost() {
  const [data, setData] = useState<CrewMainItem[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('title');
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(12);
  const [sort, setSort] = useState<string>('latest');
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchShares = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/crew/search', {
        params: {
          keyword,
          searchType,
          sort,
          page,
          size,
        },
        baseURL: CUSTOM_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log(response.data.content);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  }, [keyword, searchType, sort, page, size]);

  useEffect(() => {
    fetchShares();
  }, [fetchShares]);

  const router = useRouter();

  const changeSearchRef = useRef<string>('');

  const handleClick = () => {
    setKeyword(changeSearchRef.current);
    setPage(0);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleCardClick = (pk: number) => {
    router.push(paths.community.crew.detail(pk));
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleOptionBy = useCallback((newValue: string) => {
    setSearchType(newValue);
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSort(newValue);
  }, []);

  const writeShare = () => {
    router.push(paths.community.crew.write);
  };

  const maxColumns = 4;
  const numberOfRows = Math.ceil(Math.min(data.length, maxColumns * 3) / maxColumns); // 최대 3열까지만 허용

  const renderTable = Array.from({ length: numberOfRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {data
        .slice(rowIndex * maxColumns, rowIndex * maxColumns + maxColumns)
        .map((item: CrewMainItem) => (
          <td key={item.crewId} style={{ width: '25%' }}>
            <CrewItem crew={item} />
          </td>
        ))}
    </tr>
  ));

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3 }}
      >
        <Typography variant="h3" component="div" sx={{ color: 'black', ml: 3 }}>
          크루 모집 게시판
        </Typography>
      </Box>
      {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
      <Stack
        direction="row"
        spacing={1}
        paddingLeft={15}
        paddingRight={15}
        sx={{ height: 40, alignItems: 'center' }}
      >
        {/* search 조건 */}
        <InformationRecentSearchOption
          searchOption={searchType}
          onOption={handleOptionBy}
          searchOptionOptions={POST_SEARCH_OPTIONS}
        />

        {/* search */}
        <TextField
          size="small"
          placeholder="검색"
          onKeyUp={handleKeyUp}
          sx={{ flexGrow: 1, my: 1 }}
          onChange={(event) => {
            changeSearchRef.current = event.target.value;
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, color: 'text.disabled' }}
                  onClick={handleClick}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* sort */}
        <InformationRecentSort
          sort={sort}
          onSort={handleSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
        <Button
          sx={{
            bgcolor: '#22C55E',
            color: 'white',
            fontWeight: 'normal',
            fontSize: 11,
            ':hover': { color: 'black', fontWeight: 'bold' },
          }}
          onClick={writeShare}
        >
          글쓰기
        </Button>
      </Stack>

      {/* 테이블 구성 */}
      <Box paddingLeft={15} paddingRight={15} marginBottom={0}>
        {data.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ my: 3 }}>
            아직 작성한 글이 없습니다
          </Typography>
        ) : (
          <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
            {renderTable}
          </table>
        )}
      </Box>

      {/* 페이지 네이션, 위치 상태함수로 저장 */}
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        siblingCount={3}
        sx={{
          mt: 3,
          mb: 3,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </Card>
  );
}
