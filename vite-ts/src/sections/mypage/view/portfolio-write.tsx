import React, { useState, useCallback, ChangeEvent } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box, Grid, Paper, Button, Select, MenuItem, Container, TextField, Typography, IconButton, Stack
} from '@mui/material';

import { Upload } from 'src/components/upload';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

type Entry = {
  title: string;
  program: string;
  contribution: string;
  content: string;
  file: File | string | null;
  firstDropdownValue: string;
  secondDropdownValue: string;
  image: number;
};


export default function PortfolioWriteView() {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([{
    title: '',
    program: '',
    contribution: '',
    content: '',
    file: null,
    firstDropdownValue: '파일 업로드',
    secondDropdownValue: '',
    image: -1
  }]);

  const dummyPieces = {
    pieceId: 1,
    pieceUrl: [
      'https://source.unsplash.com/random/6',
      'https://source.unsplash.com/random/7',
      'https://source.unsplash.com/random/8',
      'https://source.unsplash.com/random/9',
      'https://source.unsplash.com/random/10',
      'https://source.unsplash.com/random/11',
      'https://source.unsplash.com/random/12',
      'https://source.unsplash.com/random/13',
      'https://source.unsplash.com/random/14',
      'https://source.unsplash.com/random/15',
      'https://source.unsplash.com/random/16',
      'https://source.unsplash.com/random/17',
      'https://source.unsplash.com/random/18',
      'https://source.unsplash.com/random/19',
      'https://source.unsplash.com/random/20',
    ]
  };


  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;


  const handleAddEntry = useCallback(() => {
    console.log('변환전 확인', entries)
    setEntries(prevEntries => [
      ...prevEntries,
      { title: '', program: '', contribution: '', content: '', file: null, firstDropdownValue: '파일 업로드',
      secondDropdownValue: '', image: -1}
    ]);
  }, [entries]);

  const handleRemoveEntry = useCallback((index: number) => {
    setEntries(prevEntries => prevEntries.filter((_, idx) => idx !== index));
  }, []);

  const handleChange = useCallback((index: number, field: keyof Entry) => (event: ChangeEvent<HTMLInputElement>) => {
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, [field]: event.target.value } : entry
    ));
  }, []);


  // 페이지네이션
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = dummyPieces.pieceUrl.slice(indexOfFirstImage, indexOfLastImage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dummyPieces.pieceUrl.length / imagesPerPage); i+=1) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <Button key={number} onClick={() => setCurrentPage(number)}
      style={{
        fontSize: '12px',
        padding: '5px 8px', // Adjusted padding
        margin: '0 3px', // Adjusted margin
        cursor: 'pointer',
        backgroundColor: currentPage === number ? '#007bff' : 'transparent',
        color: currentPage === number ? '#fff' : '#000',
        border: 'none',
        borderRadius: '4px'
      }}>
      {number}
    </Button>
  ));

  const changeImage = (index:number, imageIndex:number) => {
    console.log()
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, 'image': imageIndex } : entry
    ));
  }

  const setFile = (file:Entry['file'], index:number) => {
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, file } : entry
    ));
  }

  const handleDropSingleFile = useCallback((index:number, acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        }), index
      );
    }
  }, []);

  const handleSubmit = () => {
    console.log('등록하자!!');
    router.push(paths.mypage.portfolio)
  };


  return (

    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mb: 4 }}>
        포트폴리오 추가 (글그림 포맷)
      </Typography>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Stack direction="row" alignItems="center" sx={{ my: 4 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 22px',
                fontSize: '17px',
                '&:hover': {
                  backgroundColor: '#388E3C',
                },
              }}
            >
              등록
            </Button>
          </Stack>
        </Grid>
      </Grid>



      {entries.map((entry, index) => (
        <Paper key={index} sx={{ mb: 4, position: 'relative', padding: 2 }}>
          <IconButton
            sx={{ position: 'absolute', right: 8, top: -20 }}
            onClick={() => handleRemoveEntry(index)}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={3}>

            {/* 드롭다운 */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Select
                  value={entry.firstDropdownValue}
                  onChange={handleChange(index, 'firstDropdownValue')}
                  fullWidth
                  sx={{ width: '50%' }}
                >
                  <MenuItem value="파일 업로드">파일 업로드</MenuItem>
                  <MenuItem value="작품에서 가져오기">작품에서 가져오기</MenuItem>
                </Select>
                {entry.firstDropdownValue === '작품에서 가져오기' && (
                  <Select
                    value={entry.secondDropdownValue}
                    onChange={handleChange(index, 'secondDropdownValue')}
                    fullWidth
                    sx={{ width: '50%', ml: 2 }}
                  >
                    <MenuItem value="선화">선화</MenuItem>
                    <MenuItem value="채색">채색</MenuItem>
                    <MenuItem value="배경">배경</MenuItem>
                    <MenuItem value="PD">PD</MenuItem>
                    <MenuItem value="스토리">스토리</MenuItem>
                    <MenuItem value="콘티">콘티</MenuItem>
                  </Select>
                )}
              </Box>
            </Grid>


            {/* 이미지 미리보기 또는 파일 업로드 */}

            {/* 파일 업로드 또는 폼 */}
      {entry.firstDropdownValue === '파일 업로드' ? (
      <>
        <Grid item xs={12} md={6}>
          <Upload
            accept={{ 'image/*': [] }}
            file={entry.file}
            onDrop={(acceptedFiles) => handleDropSingleFile(index, acceptedFiles)} onDelete={() => setFile(null, index)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="작품 제목"
            variant="outlined"
            value={entry.title}
            onChange={handleChange(index, 'title')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="사용 프로그램"
            variant="outlined"
            value={entry.program}
            onChange={handleChange(index, 'program')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="작업 파트"
            variant="outlined"
            value={entry.contribution}
            onChange={handleChange(index, 'contribution')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="작업 내용"
            variant="outlined"
            value={entry.content}
            onChange={handleChange(index, 'content')}
            multiline
            rows={4}
          />
        </Grid>
      </>
      ) : (
        <>

          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {/* {renderImages} */}
              {currentImages.map((url, idx) => (
                <Box key={idx} sx={{ width: 'calc(20% - 8px)', marginBottom: 3, height: '150px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => changeImage(index, indexOfFirstImage + idx)}>
                  <img src={url} alt={`Piece ${indexOfFirstImage + idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                  {indexOfFirstImage + idx}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
              {renderPageNumbers}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
              {selectedImageIndex !== null && entry.image !== -1 ? (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={dummyPieces.pieceUrl[entries[index].image]}
                    alt="Selected"
                    style={{ width: '100%', height: '330px', objectFit: 'cover' }}
                  />
                </Box>
              ) : (
                <Box sx={{ mb: 2 }}>
                  <img
                    src="https://geulgrim.s3.ap-northeast-2.amazonaws.com/no_image.png"
                    alt="이미지 준비중"
                    style={{ width: '100%', height: '330px', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Grid>


        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="작품 제목"
            variant="outlined"
            value={entry.title}
            onChange={handleChange(index, 'title')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="사용 프로그램"
            variant="outlined"
            value={entry.program}
            onChange={handleChange(index, 'program')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="작업 파트"
            variant="outlined"
            value={entry.contribution}
            onChange={handleChange(index, 'contribution')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="작업 내용"
            variant="outlined"
            value={entry.content}
            onChange={handleChange(index, 'content')}
            multiline
            rows={4}
          />
        </Grid>
        </>
      )}
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          onClick={handleAddEntry}
        >
          작품 추가
        </Button>
      </Box>

    </Container>
  )


}
