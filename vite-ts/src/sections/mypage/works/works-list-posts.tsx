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

import { useGetPiecesList } from 'src/api/piece';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import WorksListSort from './works-list-sort';
import WorksListSearchOption from './works-list-search-option';


// ----------------------------------------------------------------------

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
  const userName = localStorage.getItem('nickname')
  const type = 'NONE'
  const { piecesData, piecesLoading, piecesError} = useGetPiecesList(type)

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

  const category = (pieceType: string) => {
    switch (pieceType) {
      case 'PEN':
        return '선화';
      case 'COLOR':
        return '채색';
      case 'BG':
        return '배경';
      case 'PD':
        return 'PD';
      case 'STORY':
        return '스토리';
      case 'CONTI':
        return '콘티';
      default:
        return '';
    }
  };

  if (piecesLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (piecesError) {
    return <Typography>Error loading pieces</Typography>;
  }

  return (
    <>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {userName} 님의 작품
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
  {piecesData.map((image) => (
          <Card
            key={image.id}
            sx={{ cursor: 'pointer', color: 'common.white' }}
            onClick={() => router.push(paths.mypage.worksDetail(image.id))}
          >
            <ListItemText
              sx={{
                p: 3,
                left: 0,
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
              }}
              primary={`${image.name} - ${category(image.type)}`}
              // secondary={new Date(image.created_at).toLocaleDateString()} // Adjust date formatting if necessary
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
              src={image.fileUrl || '/no_image.png'}
              padding={image.fileUrl ? 0 : 10}
              overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${theme.palette.grey[900]} 75%)`}
            />
          </Card>
        ))}
      </Box>
      <Pagination
        count={Math.floor((piecesData.length - 1) / pageCount) + 1}
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
