import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box'
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

import InformationRecentSort from './information-recent-sort';

// ----------------------------------------------------------------------

function createDummyData(pk: number, fullTitle: string, upload:Date, hit:number, post_pk:number) {
  const date = upload.toLocaleDateString()
  const title:string = fullTitle.length > 10 ? `${fullTitle.substr(0, 10)}...` : `${fullTitle}`

  return { pk, title, date, hit, post_pk};
}

const dummy = [
  createDummyData(1, '댓글1', new Date('2024-05-03'), 10, 5),
  createDummyData(3, '댓글2', new Date('2024-05-03'), 3, 1),
  createDummyData(4, '댓글3', new Date('2024-05-03'), 1, 3),
  createDummyData(6, '댓글댓글댓글', new Date('2024-05-03'), 200, 10),
  createDummyData(21, '오늘은 20240503 17시44분', new Date('2024-05-03'), 13, 2),
  createDummyData(30, '집갈시간이다!!!', new Date('2024-05-03'), 5, 0),
  createDummyData(41, '개미는 뚠뚠 오늘도 뚠뚠', new Date('2024-05-03'), 0, 2),
  createDummyData(50, '댓글 마무리!', new Date('2024-05-03'), 1, 13),
  createDummyData(76, '댓글댓글댓글', new Date('2024-05-03'), 1, 2),
  createDummyData(101, '이 댓글은 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다.', new Date('2024-05-03'), 503, 15),
  createDummyData(109, '취업하고싶당', new Date('2024-05-03'), 20, 1),
];

interface Column {
  id: 'pk' | 'title' | 'date' | 'hit' | 'post_pk';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'pk', label: '#', minWidth: 16 },
  { id: 'title', label: '내용', minWidth: 170},
  {
    id: 'date',
    label: '날짜',
    minWidth: 100,
    align: 'right',
  },
];

const POST_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];


export default function InformationRecentPost() {

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

  const pageCount = 7

  const table = useTable({ defaultRowsPerPage: pageCount })

  const [sortBy, setSortBy] = useState('latest');

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  return (
      <Card sx={{p:3}}>
        <Box sx={{ borderBottom: '3px solid black'}}>
          <Typography variant="h5" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
            내가 작성한 댓글
          </Typography>
        </Box>
        {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
        <Stack direction="row" spacing={1}>
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
        <TableConttainer sx={{ position: 'relative', overflow: 'unset'}}>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.pk} onClick={() => handleRowClick(row.post_pk)} sx={{ cursor: 'pointer'}}>
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
