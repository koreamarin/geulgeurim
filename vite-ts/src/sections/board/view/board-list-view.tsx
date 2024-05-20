import axios from 'axios';
import { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useRouter } from 'src/routes/hooks';

import { CUSTOM_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { BoardMainItem } from 'src/types/blog';

import InformationRecentSort from './board-recent-sort';
import InformationRecentSearchOption from './board-recent-search-options';

// ----------------------------------------------------------------------
interface Column {
  id: 'boardId' | 'title' | 'userNickname' | 'createdAt' | 'hit' | 'commentCnt';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'boardId', label: '#', minWidth: 16 },
  { id: 'title', label: '제목', minWidth: 300 },
  { id: 'userNickname', label: '작성자', minWidth: 100 },
  {
    id: 'createdAt',
    label: '날짜',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'hit',
    label: '조회수',
    minWidth: 80,
    align: 'center',
  },
];

const POST_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];

const POST_SEARCH_OPTIONS = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'author', label: '작성자' },
  { value: 'title+content', label: '제목+내용' },
];

function createBoardData(
  pk: number,
  fullTitle: string,
  userNickname: String,
  upload: Date,
  hit: number,
  commentCnt: number
) {
  const createdAt = new Date(upload).toLocaleDateString();
  const comment: string = commentCnt !== 0 ? ` [${commentCnt}]` : ``;
  const title: string =
    fullTitle.length > 40 ? `${fullTitle.substr(0, 40)}...${comment}` : `${fullTitle}${comment}`;
  const boardId = pk;
  return { boardId, title, userNickname, createdAt, hit, commentCnt };
}

export default function BoardRecentPost() {
  const [data, setData] = useState<BoardMainItem[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('title');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>('latest');
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const changeSearchRef = useRef<string>('');

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/board/search', {
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
      const boardData = response.data.content;
      const transformedBoardData = boardData.map(
        (item: {
          boardId: number;
          title: string;
          userNickname: String;
          createdAt: Date;
          hit: number;
          commentCnt: number;
        }) =>
          createBoardData(
            item.boardId,
            item.title,
            item.userNickname,
            item.createdAt,
            item.hit,
            item.commentCnt
          )
      );
      setData(transformedBoardData);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
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

  const handleOptionBy = useCallback((newValue: string) => {
    setSearchType(newValue);
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSort(newValue);
  }, []);

  const writeBoard = () => {
    router.push('/community/board/write');
  };

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3 }}
      >
        <Box ml={3}>
          <h2>자유 게시판</h2>
        </Box>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        paddingLeft={15}
        paddingRight={15}
        sx={{ height: 40, alignItems: 'center' }}
      >
        <InformationRecentSearchOption
          searchOption={searchType}
          onOption={handleOptionBy}
          searchOptionOptions={POST_SEARCH_OPTIONS}
        />
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
        <InformationRecentSort sort={sort} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
        <Button
          sx={{
            bgcolor: '#22C55E',
            color: 'white',
            fontWeight: 'normal',
            fontSize: 11,
            ':hover': { color: 'black', fontWeight: 'bold' },
          }}
          onClick={writeBoard}
        >
          글쓰기
        </Button>
      </Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset', paddingX: 15, paddingY: 3 }}>
        <Scrollbar>
          <Table>
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
              {!data?.length ? (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center" colSpan={COLUMNS.length}>
                    아직 작성한 글이 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.boardId}
                    onClick={() => handleRowClick(row.boardId)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {COLUMNS.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'object' ? value.toString() : value}{' '}
                          {/* 여기서 날짜를 문자열로 변환 */}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
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
