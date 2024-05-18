import axios from 'axios';
import { useRef, useState, useCallback, useEffect, ChangeEvent } from 'react';

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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetBoardList, useGetBoardSearch } from 'src/api/community';

import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

import { BoardMainItem } from 'src/types/blog';

import InformationRecentSort from './board-recent-sort';
import InformationRecentSearchOption from './board-recent-search-options';

// ----------------------------------------------------------------------
// prettier-ignore
function createDummyData(pk: number, fullTitle: string, userNickname:String, upload:Date, hit:number, comment_count:number) {
  const date = upload.toLocaleDateString();
  const comment:string = comment_count !== 0 ? ` [${comment_count}]` : ``
  const title:string = fullTitle.length > 40 ? `${fullTitle.substr(0, 40)}...${comment}` : `${fullTitle}${comment}`

  return { pk, title, userNickname, date, hit, comment_count};
}

// prettier-ignore
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
  { value: 'content&title', label: '제목+내용' },
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

  const fetchBoards = async () => {
    try {
      const response = await axios.get('/api/v1/community/board/search', {
        params: {
          keyword,
          searchType,
          sort,
          page,
          size,
        },
        baseURL: 'http://localhost:8080',
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
  };

  useEffect(() => {
    fetchBoards();
  }, [keyword, searchType, page, size, sort]);

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
        <Typography variant="h3" component="div" sx={{ color: 'black', ml: 3 }}>
          자유 게시판
        </Typography>
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
