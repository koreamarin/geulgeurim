import { useRef, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Iconify from 'src/components/iconify';

import ResumeListCard from './resume-list-card';
import ResumeListSort from './resume-list-sort';
import ResumeListSearchOption from './resume-list-search-option';

// ----------------------------------------------------------------------

const dummy = {
  "getResumesResponse": [
      {
        "resumeId": 41,
        "resumeTitle": "이력서",
        "essay": "저는 월급 루팡입니다.",
        "openStatus": "PRIVATE",
        "fileUrl": "https://k.kakaocdn.net/dn/cD4BaL/btsAaYmkBz8/2YJ6o7gqIk52caVsddDW10/img_110x110.jpg",
        "getResumePositionResponses": [
          {
              "resumePositionId": 65,
              "positionId": 1
          },
          {
              "resumePositionId": 66,
              "positionId": 2
          },
        ]
      },
      {
        "resumeId": 42,
        "resumeTitle": "이력서",
        "essay": `"잠재력이 있는 산업군에서의 덕업일치"

        잠재력이 큰 시장에서 변화를 주도하는 회사, 즐기며 좋아하는 분야의 회사에서 일하고 싶습니다. 웹툰은 학창시절부터 빠지지 않는 존재였는데, 특히 이말년시리즈같은 개그물을 주로 봤습니다. 야후에서 연재되던 이말년시리즈가 네이버에서 연재되어 좋아하는 만화를 보기 위해 네이버 웹툰을 보기 시작한 뒤부터 지금까지 매일 웹툰을 보고 있습니다. 좋아하기도 하지만, 새로운 컨텐츠가 끊임없이 생기고 여러 기술을 적용할 수 있는 웹툰 시장의 장래성 또한 끌렸습니다. 웹툰은 게임, 영화, 드라마 등 다른 컨텐츠로 파생되기도 하고, VR을 비롯한 다양한 신기술을 적용할 수 있습니다. 그리고 한국뿐만 아니라 해외 시장을 개척할 잠재력 또한 큽니다. 네이버 웹툰은 독자의 편의성을 고려해 오전 12시에 제공되던 웹툰을 오후 11시에 제공하는 등 필요한 서비스를 제공하며, 새로운 컨텐츠를 바탕으로 해외 웹툰 시장을 개척하고 있습니다. 1위의 자리를 유지하고 있지만 끊임없이 개선점을 찾는 네이버 웹툰에 이끌렸으며, 웹툰 시장의 파이를 키우고 싶습니다.`,
        "openStatus": "PRIVATE",
        "fileUrl": "",
        "getResumePositionResponses": [
          {
              "resumePositionId": 75,
              "positionId": 1
          },
          {
              "resumePositionId": 76,
              "positionId": 2
          }
        ]
      }
  ]
}

const WORKS_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];

const WORKS_SEARCH_OPTIONS = [
  { value: 'essay&title', label: '제목+자소서' },
  { value: 'essay', label: '자소서' },
  { value: 'title', label: '제목' },
];


export default function ResumeList() {
  const router = useRouter()

  // 유저 더미
  const { user } = useMockedUser();

  // 검색 창 입력 값
  const changeSearchRef = useRef<string>('')

  // 검색 창 입력 값 출력(추후 api에 추가)
  const handleClick = () => {
    console.log(changeSearchRef.current)
  };

  // 검색 조건
  const [optionBy, setOptionBy] = useState('title');

  // 검색 조건 변경
  const handleOptionBy = useCallback((newValue: string) => {
    setOptionBy(newValue);
  }, []);

  // 검색 입력 후 enter
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  // 정렬 조건
  const [sortBy, setSortBy] = useState('latest');
  
  // 정렬 조건 변경
  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  // 새 이력서 form 이동
  const moveWrite = () => {
    router.push(paths.mypage.worksWrite)
  }

  const pageCount = 8

    return (
      <>
        <Typography variant="h3" sx={{ mb: 5 }}>
          {user?.displayName} 님의 이력서
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* search 조건 */}
          <ResumeListSearchOption searchOption={optionBy} onOption={handleOptionBy} searchOptionOptions={WORKS_SEARCH_OPTIONS}/>

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
          <ResumeListSort sort={sortBy} onSort={handleSortBy} sortOptions={WORKS_SORT_OPTIONS} />
          <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="contained" color="success" size="medium" onClick={moveWrite}>
            새 이력서
          </Button>
        </Stack>

        {dummy.getResumesResponse.map((item, index) => {
          const positionList: number[] = item.getResumePositionResponses.map((positionItem) => positionItem.positionId)
          return <ResumeListCard key={index} resumeId={item.resumeId} resumeTitle={item.resumeTitle} essay={item.essay}
          openStatus={item.openStatus} fileUrl={item.fileUrl} position={positionList} />
        })}
        <Pagination
            count={Math.floor((dummy.getResumesResponse.length - 1) / pageCount) + 1}
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
      </>
    );
  }

