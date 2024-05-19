import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
  Box, Grid, Paper, Button, Dialog, Tooltip,
  Container, FormGroup, Typography,
  IconButton, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// import { useGetPortfolios } from "src/api/test";
import { deletePortfolio, useGetPortfolios } from 'src/api/portfolio';

import { SplashScreen } from 'src/components/loading-screen';

interface Portfolio {
  pofolId: number;
  pofolName: string;
  openState: string;
  format: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}


export default function PortfolioView() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteOpen = (pofolId: number) => {
    setSelectedPortfolioId(pofolId);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setSelectedPortfolioId(null);
    setDeleteOpen(false);
  };

  const handlePortfolioWrite = () => {
    router.push(paths.mypage.portfolioWrite)
  };

  const handlePortfolioWriteUserFormat = () => {
    router.push(paths.mypage.portfolioWriteUserFormat)
  };

  const handleEditClick = (portfolioId: number) => {
    router.push(paths.mypage.portfolioEdit(portfolioId))
  };

  // const { portfolios, portfoliosLoading, portfoliosEmpty, portfoliosError} = useGetPortfolios()
  // const [portfolioState, setPortfolioState] = useState(portfolios);

  // if (portfoliosLoading) {
  //   return (
  //     <Box>
  //       <SplashScreen />
  //     </Box>
  //   )
  // }

  // if (portfoliosError) {
  //   return (
  //     <Box>
  //       에러 발생!
  //     </Box>
  //   )
  // }

  // if (portfoliosEmpty) {
  //   return (
  //     <Box>
  //       포트폴리오가 없습니다
  //     </Box>
  //   )
  // }


  const  { portfoliosData, portfoliosError, portfoliosLoading, portfoliosMutate } = useGetPortfolios()

  if (portfoliosLoading) return <Box><SplashScreen/></Box>;
  if (portfoliosError) return <Box>잘못된 접근입니다</Box>;

  const handleDelete = async () => {
    if (selectedPortfolioId === null) return;

    try {
      await deletePortfolio(selectedPortfolioId);
      await portfoliosMutate();
      // const updatedPortfolios = portfoliosData.filter(portfolio => portfolio.pofolId !== selectedPortfolioId );
      // setPortfolios(updatedPortfolios);
      handleDeleteClose();
    } catch (err) {
      console.error('Error deleting portfolio:', err);
    }
  };

  const handlePortfolioClick = (pofolId: number) => {
    const portfolio = portfoliosData.find(p => p.pofolId === pofolId);

    if (!portfolio) {
      console.error('Portfolio not found');
      return;
    }

    if (portfolio.format === "SERVICE") { // 글그램 포맷
      router.push(paths.mypage.portfolioDetail(pofolId));
    } else if (portfolio.format === "USER") {  // 사용자 포맷
      router.push(paths.mypage.portfolioDetailUserFormat(pofolId));
    }

  };


  return (
    <Container>

      <Typography variant="h2" sx={{ mb: 4 }}>
        {/* 포트폴리오 */}
      </Typography>

    {portfoliosData.map((portfolio: Portfolio) => (
      <Paper key={portfolio.pofolId} elevation={3} sx={{ p: 2, mt: 2, mb: 4, cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h3" onClick={() => handlePortfolioClick(portfolio.pofolId)}>
            {portfolio.pofolName}
          </Typography>
          {/* Toggle Switch and Edit Button grouped together */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Tooltip title="Edit">
              <IconButton color="primary" >
              {/* onClick={() => handleEditClick(portfolio.pofolId)} */}
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
              <IconButton color="secondary" onClick={() => handleDeleteOpen(portfolio.pofolId)}>
                  <DeleteIcon sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
            </FormGroup>
          </Box>

        </Box>

          {/* <Typography variant="body1" sx={{ mb: 2 }}>{portfolio.description}</Typography> */}


          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} sm={6} md={4} key={portfolio.pofolId}>
          {portfolio.fileUrl ? (
            <img
              src={portfolio.fileUrl}
              alt={portfolio.fileUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src="https://geulgrim.s3.ap-northeast-2.amazonaws.com/no_image.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
            </Grid>
          </Grid>

        </Paper>
      ))}

      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        p: 5, border: '2px dashed grey', borderRadius: '8px', mt: 6, cursor: 'pointer'
      }}
      onClick={handleOpen}>
        <Button sx={{ textTransform: 'none' }} startIcon={<AddIcon />}>
          포트폴리오 추가하기
        </Button>
      </Box>

      {/* Modal for adding new portfolio */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="add-portfolio-title">
        <DialogTitle id="add-portfolio-title">포트폴리오 추가</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box
              onClick={() => handlePortfolioWrite()}
              sx={{ cursor: 'pointer', border: '1px dashed gray', padding: 3, textAlign: 'center', marginX: 2 }}
             >
              <InsertDriveFileIcon sx={{ fontSize: 40 }} />
              <Typography>글그림 포맷</Typography>
            </Box>
            <Box
              onClick={() => handlePortfolioWriteUserFormat()}
              sx={{ cursor: 'pointer', border: '1px dashed gray', padding: 3, textAlign: 'center', marginX: 2 }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              <Typography>사용자 포맷</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>


  {/* Modal for confirming delete */}
  <Dialog open={deleteOpen} onClose={handleDeleteClose} aria-labelledby="delete-portfolio-title">
        <DialogTitle id="delete-portfolio-title">정말로 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            아니오
          </Button>
          <Button onClick={handleDelete} color="secondary">
            네
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
