import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

import InformationRecentSort from './board-recent-sort';
import InformationRecentSearchOption from './board-recent-search-options';

// ----------------------------------------------------------------------

function createDummyData(pk: number, fullTitle: string, user:String, upload:Date, hit:number, comment_count:number) {
  const date = upload.toLocaleDateString()
  const comment:string = comment_count !== 0 ? ` [${comment_count}]` : ``
  const title:string = fullTitle.length > 40 ? `${fullTitle.substr(0, 40)}...${comment}` : `${fullTitle}${comment}`

  return { pk, title, user, date, hit, comment_count};
}

const dummy = [
  createDummyData(1, 'PD작가가 되려고 하는데 어떻게 할까요?', '김무준', new Date('2024-05-03'), 10, 5),
  createDummyData(3, '여러분 비질란테 어떻게 보셨나요?', '이주현', new Date('2024-05-03'), 3, 1),
  createDummyData(4, '집에 가고싶당 집에서 누워서 자고 싶어', '배상훈', new Date('2024-05-03'), 1, 0),
  createDummyData(6, '기안84님 만남! (어그로X 인증사진)', '류지원', new Date('2024-05-03'), 200, 10),
  createDummyData(21, '글그림에 처음 가입합니다 잘부탁드려요', '윤지현', new Date('2024-05-03'), 13, 2),
  createDummyData(30, '기둥 뒤에 차 있어요', '이세은', new Date('2024-05-03'), 5, 0),
  createDummyData(41, '싸탈하고 취업하고 싶어요!!!ㅠㅠ', '무준소리', new Date('2024-05-03'), 0, 0),
  createDummyData(50, '사람살려 여기 사람있어요', '상훈소리', new Date('2024-05-03'), 1, 0),
  createDummyData(76, '차 뒤에 기둥있어요', '주현소리', new Date('2024-05-03'), 1, 0),
  createDummyData(101, '이 글은 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다.', '지원소리', new Date('2024-05-03'), 503, 15),
  createDummyData(109, '취업하고싶당', '지현소리', new Date('2024-05-03'), 20, 2),
];

interface Column {
  id: 'pk' | 'title' | 'user' | 'date' | 'hit' | 'comment_count';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'pk', label: '#', minWidth: 16 },
  { id: 'title', label: '제목', minWidth: 300},
  { id: 'user', label: '작성자', minWidth: 100},
  {
    id: 'date',
    label: '날짜',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'hit',
    label: '조회수',
    minWidth: 80,
    align: 'center',
  }
];

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


export default function BoardRecentPost() {

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

  const handleRowClick = (pk:number) => {
    router.push(paths.community.board.detail(pk));
  }

  const writeBoard = () => {
    router.push(paths.community.board.write);
  }

  const pageCount = 15

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
          <Typography variant="h3" component="div" sx={{ color: 'black', ml: 3,}}>
            자유 게시판
          </Typography>
        </Box>
        {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
        <Stack direction="row" spacing={1} paddingLeft={15} paddingRight={15} sx={{height: 40, alignItems: 'center'}}>
          {/* search 조건 */}
          <InformationRecentSearchOption searchOption={optionBy} onOption={handleOptionBy} searchOptionOptions={POST_SEARCH_OPTIONS}/>

          {/* search */}
          <TextField
            size='small'
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
          <Button sx={{bgcolor: '#22C55E', color: 'white', fontWeight: 'normal', fontSize: 11, ':hover': {color: 'black', fontWeight: 'bold'}}} onClick={writeBoard}>글쓰기</Button>
        </Stack>
        {/* 테이블 구성 */}
        <TableConttainer sx={{ position: 'relative', overflow: 'unset', paddingX: 15, paddingY: 3}}>
          <Scrollbar>
            <Table>
              {/* 표 헤더 */}
              <TableHead>
                <TableRow>
                  {COLUMNS.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 56, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* 데이터가 없을 때 */}
                {!dummy.length ?
                (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align='center' colSpan={COLUMNS.length}>
                          아직 작성한 글이 없습니다
                        </TableCell>
                  </TableRow>
                )
                :
                  (dummy.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  ).map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.pk} onClick={() => handleRowClick(row.pk)} sx={{ cursor: 'pointer'}}>
                        {COLUMNS.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                  ))
                  )
                }
              </TableBody>
            </Table>
          </Scrollbar>
        </TableConttainer>


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
