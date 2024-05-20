import axios from 'axios';
import { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableConttainer from '@mui/material/TableContainer';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CUSTOM_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

import InformationRecentSort from './information-recent-sort';

// ----------------------------------------------------------------------

function createData(boardCommentId: number, fullTitle: string, upload: Date, boardId: number) {
  const date = new Date(upload).toLocaleDateString();
  const content: string = fullTitle.length > 10 ? `${fullTitle.substr(0, 10)}...` : `${fullTitle}`;

  return { boardCommentId, content, date, boardId };
}

interface Column {
  id: 'boardCommentId' | 'content' | 'date' | 'boardId';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'boardCommentId', label: '#', minWidth: 16 },
  { id: 'content', label: '내용', minWidth: 170 },
  {
    id: 'date',
    label: '날짜',
    minWidth: 100,
    align: 'right',
  },
];

const POST_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'oldest', label: '과거 순' },
];

interface CommentData {
  boardCommentId: number;
  content: string;
  date: string;
  boardId: number;
}

export default function InformationRecentPost() {
  const [data, setData] = useState<CommentData[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('content');
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(15);
  const [sort, setSort] = useState<string>('latest');
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const changeSearchRef = useRef<string>('');

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/comment/board/mycomment', {
        params: {
          keyword,
          searchType,
          sort,
          page,
          size,
        },
        baseURL: CUSTOM_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const commentData = response.data.content;
      const transformedCommentData = commentData.map(
        (item: { boardCommentId: number; content: string; createdAt: Date; boardId: number }) =>
          createData(item.boardCommentId, item.content, item.createdAt, item.boardId)
      );
      setData(transformedCommentData);
      setTotalPages(response.data.totalPages);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [keyword, searchType, sort, page, size]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleClick = () => {
    setKeyword(changeSearchRef.current);
    setPage(0);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleRowClick = (boardId: number) => {
    router.push(`/community/board/${boardId}`);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleSortBy = useCallback((newValue: string) => {
    setSort(newValue);
  }, []);

  const pageCount = 10;

  const table = useTable({ defaultRowsPerPage: pageCount });

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ borderBottom: '3px solid black' }}>
        <Typography variant="h5" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
          내가 작성한 댓글
        </Typography>
      </Box>
      {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
      <Stack direction="row" spacing={1} alignItems="center">
        {/* search */}
        <TextField
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
        <InformationRecentSort sort={sort} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>
      {/* 테이블 구성 */}
      <TableConttainer sx={{ position: 'relative', overflow: 'unset' }}>
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
              {!data.length ? (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center" colSpan={COLUMNS.length}>
                    아직 작성한 글이 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.boardCommentId}
                      onClick={() => handleRowClick(row.boardId)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {COLUMNS.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableConttainer>

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
