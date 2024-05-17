import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

import MarketItem from 'src/sections/blog/market-item';

import InformationRecentSort from '../../share/view/share-recent-sort';
import InformationRecentSearchOption from '../../share/view/share-recent-search-options';
// prettier-ignore
function createDummyData(
  marketId: number, sellerId: number, sellerProfile: string, sellerNickname: string, sellerThumbnail: string, pieceId: number, marketThumbnail: string, title: string, price: number, created_at: Date, views:number,) {
  const createdAt = created_at.toLocaleDateString();
  const hit = views.toString();

  return { marketId, sellerId, sellerProfile, sellerNickname, sellerThumbnail, pieceId, marketThumbnail, title, price, createdAt, hit};
}
// prettier-ignore
const dummy = [

  createDummyData(1, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(2, 5, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴2', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    3, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 ', 0.0001, new Date('2024-05-14'), 9),

  createDummyData(3, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    2, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.00004, new Date('2024-05-14'), 8),

  createDummyData(4, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    4, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.00006, new Date('2024-05-14'), 7),

  createDummyData(5, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    5, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.0009, new Date('2024-05-14'), 6),

  createDummyData(6, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.00003, new Date('2024-05-14'), 5),

  createDummyData(7, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    7, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.0002, new Date('2024-05-14'), 4),

  createDummyData(8, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    8, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.000083, new Date('2024-05-14'), 3),

  createDummyData(9, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    10, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.000043, new Date('2024-05-14'), 2),

  createDummyData(10, 6, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '이세은3', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    34, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '이걸 외않사', 0.000053, new Date('2024-05-14'), 1),


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
    router.push(paths.nft.detail(pk));
  };

  const pageCount = 12;

  const maxColumns = 4;
  const numberOfRows = Math.ceil(Math.min(dummy.length, maxColumns * 3) / maxColumns); // 최대 3열까지만 허용

  const renderTable = Array.from({ length: numberOfRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {dummy.slice(rowIndex * maxColumns, rowIndex * maxColumns + maxColumns).map((data) => (
        <td key={data.marketId} style={{ width: '25%' }}>
          <MarketItem market={data} />
        </td>
      ))}
    </tr>
  ));

  const table = useTable({ defaultRowsPerPage: numberOfRows });

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
          NFT 작품 구매
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
      <Box paddingLeft={15} paddingRight={15} marginBottom={0} sx={{wordBreak: 'break-all',}}>
        <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }} >
          {renderTable}
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
