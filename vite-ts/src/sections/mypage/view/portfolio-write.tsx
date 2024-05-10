import React, { useState, useCallback, ChangeEvent } from 'react';
import {
  Container, Button, TextField, Box, Typography, Grid, IconButton, Paper, Select, MenuItem
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Upload } from 'src/components/upload';

type Entry = {
  title: string;
  program: string;
  contribution: string;
  content: string;
  file: File | null;
  firstDropdownValue: string;
  secondDropdownValue: string;
};


export default function PortfolioWriteView() {
  const [entries, setEntries] = useState<Entry[]>([{
    title: '',
    program: '',
    contribution: '',
    content: '',
    file: null,
    firstDropdownValue: '',
    secondDropdownValue: ''
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
    ]
  };


  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownValue, setSecondDropdownValue] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;


  const handleAddEntry = useCallback(() => {
    setEntries(prevEntries => [
      ...prevEntries,
      { title: '', program: '', contribution: '', content: '', file: null }
    ]);
  }, []);

  const handleRemoveEntry = useCallback((index: number) => {
    setEntries(prevEntries => prevEntries.filter((_, idx) => idx !== index));
  }, []);

  const handleFileChange = useCallback((file: File | null, index: number) => {
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, file } : entry
    ));
  }, []);

  const handleChange = useCallback((index: number, field: keyof Entry) => (event: ChangeEvent<HTMLInputElement>) => {
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, [field]: event.target.value } : entry
    ));
  }, []);

  const handleFirstDropdownChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setFirstDropdownValue(event.target.value as string);
    setSecondDropdownValue(''); // Reset second dropdown value when first dropdown changes
  }, []);

  const handleSecondDropdownChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setSecondDropdownValue(event.target.value as string);

    if (event.target.value === '선화') {

      setPreviewImages([
        'https://source.unsplash.com/random/6',
        'https://source.unsplash.com/random/7',
        'https://source.unsplash.com/random/8',
        'https://source.unsplash.com/random/9',
        'https://source.unsplash.com/random/10',

      ]);
    } else {
      setPreviewImages([]);
    }
  }, []);

  const handlePreviewImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // 페이지네이션
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = dummyPieces.pieceUrl.slice(indexOfFirstImage, indexOfLastImage);

  const renderImages = currentImages.map((url, index) => (
    <Box key={index} sx={{ width: 'calc(20% - 8px)', marginBottom: 3, height: '150px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => handlePreviewImageClick(indexOfFirstImage + index)}>
      <img src={url} alt={`Piece ${indexOfFirstImage + index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
    </Box>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dummyPieces.pieceUrl.length / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <button key={number} onClick={() => setCurrentPage(number)}
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
    </button>
  ));



  return (

    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mb: 4 }}>
        포트폴리오 추가 (글그림 포맷)
      </Typography>
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
                  value={firstDropdownValue}
                  onChange={handleFirstDropdownChange}
                  fullWidth
                  sx={{ width: '50%' }}
                >
                  <MenuItem value="파일 업로드">파일 업로드</MenuItem>
                  <MenuItem value="작품에서 가져오기">작품에서 가져오기</MenuItem>
                </Select>
                {firstDropdownValue === '작품에서 가져오기' && (
                  <Select
                    value={secondDropdownValue}
                    onChange={handleSecondDropdownChange}
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
      {firstDropdownValue === '파일 업로드' ? (
      <>
        <Grid item xs={12} md={6}>
          <Upload
            file={entry.file}
            onFileChange={(file) => handleFileChange(file, index)}
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
          {/* <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {dummyPieces.pieceUrl.map((url, idx) => (
                <Box key={idx} sx={{ width: 'calc(20% - 8px)', marginBottom: 3, height: '150px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => handlePreviewImageClick(idx)}>
                  <img src={url} alt={`Piece ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                </Box>
              ))}
            </Box>
          </Grid> */}


          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {renderImages}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
              {renderPageNumbers}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {selectedImageIndex !== null && (
            <Box sx={{ mb: 2 }}>
              <img src={dummyPieces.pieceUrl[selectedImageIndex]} alt="Selected" style={{ width: '100%', height: '330px', objectFit: 'cover' }} />
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



            {/* 폼: 작품 제목, 사용 프로그램, 작업 파트, 작업 내용 */}
            {/* <Grid item xs={6} md={6}>
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
            </Grid> */}
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          onClick={handleAddEntry}
        >
          Add Another Entry
        </Button>
      </Box>
    </Container>
  )


}
