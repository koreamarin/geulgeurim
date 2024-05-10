import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import WorksListSort from './works-list-sort';
import WorksListSearchOption from './works-list-search-option';


// ----------------------------------------------------------------------
function createDummyData(piece_id: number, fileUrl: string, type: string, name: string, create_at: Date) {
  const date:string = create_at.toLocaleDateString()
  return { piece_id, fileUrl, type, name, date };
}

const dummy = [
  createDummyData(1, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg', 'PEN', '그림1', new Date('2024-05-03')),
  createDummyData(2, '', 'STORY', '스토리1', new Date('2024-05-03')),
  createDummyData(3, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg', 'COLOR', '그림2', new Date('2024-05-03')),
  createDummyData(4, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg', 'BG', '그림3', new Date('2024-05-03')),
  createDummyData(5, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg', 'PD', '그림4', new Date('2024-05-03')),
  createDummyData(6, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg', 'CONT', '그림5', new Date('2024-05-03')),
  createDummyData(7, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg', 'PEN', '그림6', new Date('2024-05-03')),
  createDummyData(8, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg', 'PEN', '그림7', new Date('2024-05-03')),
  createDummyData(9, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg', 'PEN', '그림8', new Date('2024-05-03')),
  createDummyData(10, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg', 'PEN', '그림9', new Date('2024-05-03')),
  createDummyData(11, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg', 'PEN', '그림10', new Date('2024-05-03')),
  createDummyData(12, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_11.jpg', 'PEN', '그림11', new Date('2024-05-03')),
];

const WORKS_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];

const WORKS_SEARCH_OPTIONS = [
  { value: 'content&title', label: '제목+내용' },
  { value: 'content', label: '내용' },
  { value: 'title', label: '제목' },
];


export default function WorksListPosts() {
  const router = useRouter()

  const { user } = useMockedUser();

  const gallery = dummy

  const theme = useTheme();

  const pageCount = 12

  const changeSearchRef = useRef<string>('')

  const handleClick = () => {
    console.log(changeSearchRef.current)
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const moveWrite = () => {
    router.push(paths.mypage.worksWrite)
  }

  const [optionBy, setOptionBy] = useState('title');

  const handleOptionBy = useCallback((newValue: string) => {
    setOptionBy(newValue);
  }, []);

  const [sortBy, setSortBy] = useState('latest');

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {user?.displayName} 님의 작품
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
          {/* search 조건 */}
          <WorksListSearchOption searchOption={optionBy} onOption={handleOptionBy} searchOptionOptions={WORKS_SEARCH_OPTIONS}/>

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
          <WorksListSort sort={sortBy} onSort={handleSortBy} sortOptions={WORKS_SORT_OPTIONS} />
          <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="contained" color="success" size="medium" onClick={moveWrite}>
            작품 등록
          </Button>
        </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {gallery.map((image) => {

          const category = () => {
          if (image.type === 'PEN') {
            return '선화'
          } if (image.type === 'COLOR') {
            return '채색'
          } if (image.type === 'BG') {
            return '배경'
          } if (image.type === 'PD') {
            return 'PD'
          } if (image.type === 'STORY') {
            return '스토리'
          } if (image.type === 'CONT') {
            return '콘티'
          }
            return '기타'
        }

          return (
          <Card key={image.piece_id} sx={{ cursor: 'pointer', color: 'common.white' }} onClick={() => router.push(paths.mypage.worksDetail(image.piece_id))}>
            <ListItemText
              sx={{
                p: 3,
                left: 0,
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
              }}
              primary={`${image.name} - ${category()}`}
              secondary={image.date}
              primaryTypographyProps={{
                noWrap: true,
                typography: 'h6',
              }}
              secondaryTypographyProps={{
                mt: 0.5,
                color: 'inherit',
                component: 'span',
                typography: 'subtitle2',
                sx: { opacity: 0.48 },
              }}
            />

            <Image
              alt="gallery"
              ratio="1/1"
              src={image.fileUrl ? image.fileUrl : `/no_image.png`}
              padding={image.fileUrl ? 0 : 10}
              overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
                theme.palette.grey[900]
              } 75%)`}
            />
          </Card>
        )})}


      </Box>
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
    </>
  );
}
