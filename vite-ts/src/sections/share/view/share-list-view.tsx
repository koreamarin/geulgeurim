import { useRef, useState, useCallback } from 'react';

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
import TableConttainer from '@mui/material/TableContainer';
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
// prettier-ignore
function createDummyData(
  shareId: number, userNickname: string, userProfile: string, thumbnail: string, title: string, created_at: Date, updated_at: Date, views:number, comment_count:number ) {
  const createdAt = created_at.toLocaleDateString();
  const updatedAt = updated_at.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comment_count.toString();

  return { shareId, userNickname, userProfile, thumbnail, title, hit, commentCnt, createdAt, updatedAt};
}
// prettier-ignore
const dummy = [
  createDummyData(1, '김싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '제 그림 어때요?',
    new Date('2024-05-03'), new Date('2024-05-04'), 10, 5),
  
  createDummyData(3, '이싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '펜터치 조절이 어렵네요',
    new Date('2024-05-03'), new Date('2024-05-04'), 3, 1),
  
  createDummyData(4, '박싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '쁘띠 그림체입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(6, '최싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '나보다 잘 그리는 사람?', new Date('2024-05-03'), new Date('2024-05-04'), 200, 10),
  
  createDummyData(21, '정싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '침착맨 그림체 따라하기', new Date('2024-05-03'), new Date('2024-05-04'), 13, 2),
  
  createDummyData(30, '조싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '이런 독창적인 그림체 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 5, 0),
  
  createDummyData(41, '유싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '안녕하세요? 그림 평가 해주세요', new Date('2024-05-03'), new Date('2024-05-04'), 0, 0),
  
  createDummyData(50, '선우싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '데뷔할 수 있을까요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(76, '남궁싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '간만에 수채화 그렸는데 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(101, '배싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '제 동생 그림입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 503, 15),
  
  createDummyData(109, '류싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '포폴용 웹툰 만드실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(109, '윤싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '10~12화 완결 프로젝트 같이 하실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(109, '지싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    '5화짜리 프로젝트 ㄱㄱ?', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
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

export default function ShareRecentPost() {
  const router = useRouter();

  const changeSearchRef = useRef<string>('');

  const handleClick = () => {
    console.log(changeSearchRef.current);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleCardClick = (pk: number) => {
    router.push(paths.community.board.detail(pk));
  };

  const pageCount = 12;

  const table = useTable({ defaultRowsPerPage: pageCount });

  const [optionBy, setOptionBy] = useState('title');

  const handleOptionBy = useCallback((newValue: string) => {
    setOptionBy(newValue);
  }, []);

  const [sortBy, setSortBy] = useState('latest');

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3 }}
      >
        <Typography variant="h3" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
          자유 게시판
        </Typography>
      </Box>
      {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
      <Stack direction="row" spacing={1} paddingLeft={15} paddingRight={15}>
        {/* search 조건 */}
        <InformationRecentSearchOption
          searchOption={optionBy}
          onOption={handleOptionBy}
          searchOptionOptions={POST_SEARCH_OPTIONS}
        />

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
        <InformationRecentSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Stack>
      {/* 테이블 구성 */}
      <Box paddingLeft={15} paddingRight={15} marginBottom={0}>
        <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
          {dummy
            .slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
            .map((item, idx) => (
              <tr>
                <td key={item.shareId}>
                  <ShareItem share={item} />
                </td>
                {/* <td><ShareItem /></td>
              <td><ShareItem /></td>
              <td><ShareItem /></td> */}
              </tr>
            ))}
          ;
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
