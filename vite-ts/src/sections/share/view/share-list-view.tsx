import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table'
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TableConttainer from '@mui/material/TableContainer'
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

import ShareItem from 'src/sections/blog/share-item';

import InformationRecentSort from './share-recent-sort';
import InformationRecentSearchOption from './share-recent-search-options';

// ----------------------------------------------------------------------

function createDummyData(
  pk: number, userNickname: string, fullTitle: string, upload:Date, hit:number, comment_count:number, 
  pen: number, color: number, bg: number, pd: number, story: number, conti: number, status: string ) {
  const date = upload.toLocaleDateString()
  const stat = status === "INPROGRESS" ? 1 : 0;

  return { pk, userNickname, fullTitle, date, hit, comment_count, pen, color, bg, pd, story, conti, stat};
}

const dummy = [
  createDummyData(1, '김싸피', '프로젝트 같이하실 분 모집합니다.', new Date('2024-05-03'), 10, 5, 2, 1, 1, 0, 0, 0, 'INPROGRESS'),
  createDummyData(3, '이싸피', '판타지풍 회귀물 관심있으신 분', new Date('2024-05-03'), 3, 1, 0, 1, 1, 0, 1, 0, 'INPROGRESS'),
  createDummyData(4, '박싸피', '작은 프로젝트 같이 하실 분', new Date('2024-05-03'), 1, 0, 1, 0, 0, 1, 1, 1, 'INPROGRESS'),
  createDummyData(6, '최싸피', '기획부터 시작하실 분 모집!', new Date('2024-05-03'), 200, 10, 2, 1, 1, 0, 0, 0, 'INPROGRESS'),
  createDummyData(21, '정싸피', '기가막힌 아이디어가 있는데 ', new Date('2024-05-03'), 13, 2, 0, 1, 0, 1, 0, 0, 'CLOSED'),
  createDummyData(30, '조싸피', '옴니버스 개그만화 해보실 분', new Date('2024-05-03'), 5, 0, 0, 0, 1, 0, 1, 0, 'INPROGRESS'),
  createDummyData(41, '유싸피', '채색, 배경 한 분씩 구합니다.', new Date('2024-05-03'), 0, 0, 1, 1, 0, 0, 0, 0, 'INPROGRESS'),
  createDummyData(50, '선우싸피', '사람살려 여기 사람있어요', new Date('2024-05-03'), 1, 0, 0, 1, 1, 1, 1, 0, 'CLOSED'),
  createDummyData(76, '남궁싸피', '차 뒤에 기둥있어요', new Date('2024-05-03'), 1, 0, 0, 1, 1, 0, 1, 0, 'CLOSED'),
  createDummyData(101, '배싸피', '네이버 드가자~', new Date('2024-05-03'), 503, 15, 0, 1, 1, 0, 0, 0, 'INPROGRESS'),
  createDummyData(109, '류싸피', '포폴용 웹툰 만드실 분', new Date('2024-05-03'), 20, 2, 0, 1, 1, 0, 0, 0, 'INPROGRESS'),
  createDummyData(109, '윤싸피', '10~12화 완결 프로젝트 같이 하실 분', new Date('2024-05-03'), 20, 2, 0, 0, 0, 1, 1, 0, 'INPROGRESS'),
  createDummyData(109, '지싸피', '5화짜리 프로젝트 ㄱㄱ?', new Date('2024-05-03'), 20, 2, 1, 1, 0, 0, 0, 1, 'INPROGRESS'),
];

interface Column {
  id: 'pk' | 'title' | 'user' | 'date' | 'hit' | 'comment_count';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const POST_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];

const POST_SEARCH_OPTIONS = [
  { value: 'content&title', label: '제목+내용' },
  { value: 'content', label: '내용' },
  { value: 'title', label: '제목' },
];


export default function ShareRecentPost() {

  const router = useRouter();

  const changeSearchRef = useRef<string>('')

  const handleClick = () => {
    console.log(changeSearchRef.current)
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleCardClick = (pk:number) => {
    router.push(paths.community.board.detail(pk));
  }

  const pageCount = 12

  const table = useTable({ defaultRowsPerPage: pageCount })

  const [optionBy, setOptionBy] = useState('title');

  const handleOptionBy = useCallback((newValue: string) => {
    setOptionBy(newValue);
  }, []);

  const [sortBy, setSortBy] = useState('latest');

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  return (
      <Card sx={{p:3}}>
        <Box sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3}}>
          <Typography variant="h3" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
            자유 게시판
          </Typography>
        </Box>
        {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
        <Stack direction="row" spacing={1} paddingLeft={15} paddingRight={15}>
          {/* search 조건 */}
          <InformationRecentSearchOption searchOption={optionBy} onOption={handleOptionBy} searchOptionOptions={POST_SEARCH_OPTIONS}/>

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
          <InformationRecentSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
        </Stack>
        {/* 테이블 구성 */}
        <Box paddingLeft={15} paddingRight={15} marginBottom={0}>
          <table style={{width: '100%', textAlign: "center", borderSpacing: "10px 10px"}}>
            {dummy.slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            ).map((item, idx) => {
              console.log(item);
              return (
            <tr>
              <td key={item.pk}><ShareItem share={item}/></td>
              {/* <td><ShareItem /></td>
              <td><ShareItem /></td>
              <td><ShareItem /></td> */}
            </tr>
            )}
            )}
          </table>
        </Box>


        {/* 페이지 네이션, 위치 상태함수로 저장 */}

      <Pagination
            count={Math.floor((dummy.length - 1) / pageCount) + 1}
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
      </Card>
  );
}
