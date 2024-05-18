import axios from 'axios';
import { useRef, useState, useCallback, useEffect, ChangeEvent } from 'react';

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

import { useGetShareList } from 'src/api/community';

import Iconify from 'src/components/iconify';

import ShareItem from 'src/sections/blog/share-item';

import { ShareMainItem } from 'src/types/blog';

import InformationRecentSort from './share-recent-sort';
import InformationRecentSearchOption from './share-recent-search-options';

// ----------------------------------------------------------------------
// prettier-ignore
function createDummyData(
  shareId: number, userId: number, userNickname: string, userProfile: string, fileId: number, thumbnail: string, fileType: string, title: string, created_at: Date, updated_at: Date, views:number, comment_count:number ) {
  const createdAt = created_at.toLocaleDateString();
  const updatedAt = updated_at.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comment_count.toString();
  const imageList = [{
    'shareImageId': fileId,
    'fileUrl': thumbnail,
    'imageType': fileType,
  },]

  return { shareId, userId, userNickname, userProfile, imageList, title, hit, commentCnt, createdAt, updatedAt};
}
// prettier-ignore
const dummy = [
  createDummyData(1, 1, '김싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL', '제 그림 어때요?',
    new Date('2024-05-03'), new Date('2024-05-04'), 10, 5),
  
  createDummyData(3, 2, '이싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL', '펜터치 조절이 어렵네요',
    new Date('2024-05-03'), new Date('2024-05-04'), 3, 1),
  
  createDummyData(4, 3, '박싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '쁘띠 그림체입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(6, 4, '최싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '나보다 잘 그리는 사람?', new Date('2024-05-03'), new Date('2024-05-04'), 200, 10),
  
  createDummyData(21, 5, '정싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '침착맨 그림체 따라하기', new Date('2024-05-03'), new Date('2024-05-04'), 13, 2),
  
  createDummyData(30, 6, '조싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '이런 독창적인 그림체 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 5, 0),
  
  createDummyData(41, 7, '유싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '안녕하세요? 그림 평가 해주세요', new Date('2024-05-03'), new Date('2024-05-04'), 0, 0),
  
  createDummyData(50, 8, '선우싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '데뷔할 수 있을까요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(76, 9, '남궁싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '간만에 수채화 그렸는데 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(101, 10, '배싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '제 동생 그림입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 503, 15),
  
  createDummyData(109, 11, '류싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '포폴용 웹툰 만드실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(110, 12, '윤싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '10~12화 완결 프로젝트 같이 하실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(111, 13, '지싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
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
  { value: 'author', label: '작성자' },
];

export default function ShareRecentPost() {
  const [data, setData] = useState<ShareMainItem[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('title');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>('latest');
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchShares = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/share/search', {
        params: {
          keyword,
          searchType,
          sort,
          page,
          size,
        },
        baseURL: 'https://글그림.com',
        // baseURL: 'http://localhost:8080',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log(response.data);
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
    router.push(paths.community.share.detail(pk));
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
    router.push(paths.community.share.write);
  };

  const pageCount = 12;

  const maxColumns = 4;
  const numberOfRows = Math.ceil(Math.min(data.length, maxColumns * 3) / maxColumns); // 최대 3열까지만 허용

  const renderTable = Array.from({ length: numberOfRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {data
        .slice(rowIndex * maxColumns, rowIndex * maxColumns + maxColumns)
        .map((item: ShareMainItem) => (
          <td key={item.shareId} style={{ width: '25%' }}>
            <ShareItem share={item} />
          </td>
        ))}
    </tr>
  ));


  const [optionBy, setOptionBy] = useState('title');

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3 }}
      >
        <Typography variant="h3" component="div" sx={{ color: 'black', ml: 3 }}>
          그림 공유 게시판
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
          searchOption={optionBy}
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
        <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
          {renderTable}
        </table>
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
