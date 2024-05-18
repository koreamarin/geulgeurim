import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box, Grid, Paper, Button, Select, Dialog, MenuItem, Container, TextField, Typography,
  IconButton, DialogTitle, DialogActions, DialogContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetPiecesList } from 'src/api/piece';
import { createPortfolio, useGetPortfolios } from 'src/api/portfolio';

import { Upload } from 'src/components/upload';

type Entry = {
  title: string;
  program: string;
  contribution: string;
  content: string;
  file: File  | null;
  firstDropdownValue: string;
  secondDropdownValue: string;
  image: number;
};


export default function PortfolioWriteView() {

  const [type, setType] = useState('NONE');
  const { piecesData, piecesLoading, piecesError} = useGetPiecesList(type)
  const router = useRouter()
  const { portfoliosMutate } = useGetPortfolios();
  const [title, setTitle] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  // 1st item
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

  const files = useRef<File[]>([])


  useEffect(() => {
    const currentEntry = entries.find(entry => entry.firstDropdownValue === '작품에서 가져오기');
    if (currentEntry) {
      setType(currentEntry.secondDropdownValue);
    }
  }, [entries]);

  // entry 추가 로직
  const handleAddEntry = useCallback(() => {
    // next items
    setEntries(prevEntries => [
      ...prevEntries,
      { title: '', program: '', contribution: '', content: '', file: null, firstDropdownValue: '파일 업로드',
      secondDropdownValue: '', image: -1}
    ]);
  }, []);


  const handleRemoveEntry = useCallback((index: number) => {
    setEntries(prevEntries => prevEntries.filter((_, idx) => idx !== index));
  }, []);

  // entry index를 받아서 entry 내부 인자 변경 로직
  const handleChange = useCallback((index: number, field: keyof Entry) => (event: ChangeEvent<HTMLInputElement>) => {
    setEntries(prevEntries => prevEntries.map((entry, idx) =>
      idx === index ? { ...entry, [field]: event.target.value } : entry
    ));
  }, []);


  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentPieces = piecesData.slice(indexOfFirstImage, indexOfLastImage);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(piecesData.length / imagesPerPage); i+=1) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <Button key={number} onClick={() => setCurrentPage(number)}
      style={{
        fontSize: '12px',
        padding: '5px 8px',
        margin: '0 3px',
        cursor: 'pointer',
        backgroundColor: currentPage === number ? '#007bff' : 'transparent',
        color: currentPage === number ? '#fff' : '#000',
        border: 'none',
        borderRadius: '4px'
      }}>
      {number}
    </Button>
  ));

  // 인덱스를 잡아서 해당 엔트리에 이미지 인덱스 변경
  const changeImage = (index:number, imageIndex:number) => {
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

  // post api 연결
  const handleSubmit = async () => {

    const formData = new FormData();
    const inputData = {
      pofol_name : title,
      status : 'PUBLIC',
      pieces: entries.map((inputItem) => {
        console.log('초기데이터', inputItem)
        if (inputItem.file) {
          files.current = [...files.current, inputItem.file]
        }
        return (
        {
          "pieceId": inputItem.firstDropdownValue === '작품에서 가져오기' ? piecesData[inputItem.image].id : null,
          "title": inputItem.title,
          "program": inputItem.program,
          "contribution": inputItem.contribution,
          "content": inputItem.content,
          "identifier": inputItem.file ? inputItem.file.name : null
        }

      )}
      )
    }

    formData.append("portfolioRequest", new Blob([JSON.stringify(inputData)], {
      type: "application/json"
  }));

  files.current.forEach(file => {
    if (file instanceof File) {
      formData.append('files', file, file.name);
    }
  });

  await createPortfolio(formData)
  await portfoliosMutate()
  router.push(paths.mypage.portfolio)

  };

  const handleCancel = () => {
    setOpenDialog(true);
  };

  const handleClose = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      router.push(paths.mypage.portfolio);
    }
  };
  const selectPieces = (entryIndex:number) => {
    if (piecesLoading) {
      return (
      <Box>
        로딩중..
      </Box>
      )
    } if (piecesError) {
      return (

      <Box>
        네트워크 확인해주세요!
      </Box>
      )
    }
  //    if (piecesEmpty) {
  //     return (
  //     <Box>
  //       작품이 없습니다.
  //       <Button>
  //         작품 등록하기
  //       </Button>
  //     </Box>
  //     )
  // }

    return (

      currentPieces.map((piece, idx) => (
        <Box key={idx} sx={{ width: 'calc(20% - 8px)', marginBottom: 3, height: '150px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => changeImage(entryIndex, indexOfFirstImage + idx)}>
          <img src={piece?.fileUrl} alt={`Piece ${indexOfFirstImage + idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
          {indexOfFirstImage + idx}
        </Box>
      ))
    )
  }


  return (

    <Container maxWidth="md">
      <Typography variant="h3" sx={{ mb: 4 }}>
        포트폴리오 추가 (글그림 포맷)
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button>

      </Box>

    <TextField
      sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      label="제목"
      variant="outlined"
      fullWidth
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          marginTop: 2,
          marginBottom: 4,
        }}
      >
         <div style={{ height: '1px' }} />
      </Box>


  <Dialog
    open={openDialog}
    onClose={() => handleClose(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">포트폴리오 생성을 중단할까요?</DialogTitle>
    <DialogContent>
      포트폴리오 생성 과정을 취소하시면 지금까지의 변경사항이 저장되지 않습니다.
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose(true)} color="primary">
        네
      </Button>
      <Button onClick={() => handleClose(false)} color="primary" autoFocus>
        아니요, 계속 만들래요
      </Button>
    </DialogActions>
  </Dialog>


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
            <MenuItem value="PEN">선화</MenuItem>
            <MenuItem value="COLOR">채색</MenuItem>
            <MenuItem value="BG">배경</MenuItem>
            <MenuItem value="PD">PD</MenuItem>
            <MenuItem value="STORY">스토리</MenuItem>
            <MenuItem value="CONTI">콘티</MenuItem>
          </Select>
        )}
      </Box>
    </Grid>


      {/* 파일 업로드 클릭하면, 파일 업로드 항목과 폼 추가 */}
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
// 작품에서 가져오기
// 두 번째 드롭박스 클릭하면 그 종류만 가져와야 함.
        <>

          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {/* {renderImages} */}
            {selectPieces(index)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
              {renderPageNumbers}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
              {entry.image !== -1 ? (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={piecesData[entries[index].image]?.fileUrl}
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
