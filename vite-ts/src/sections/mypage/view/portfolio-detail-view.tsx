import React, { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Grid, Paper, Switch, Button, Dialog, Tooltip,
  Container, FormGroup, Typography, IconButton, DialogTitle, DialogActions, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deletePortfolio, usePortfolioDetail } from 'src/api/portfolio';

type Props = {
  id: string;
};

export default function PortfolioDetailView({ id }: Props) {
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { portfolioDetailData, portfolioDetailError, portfolioDeatilLoading } = usePortfolioDetail(parseInt(id, 10));

  const handleTogglePublic = () => {
    if (!portfolioDetailData) return;
    portfolioDetailData.status = portfolioDetailData.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
  };

  const handleHome = () => {
    router.push(paths.mypage.portfolio);
  };


  if (portfolioDeatilLoading) return <Box>Loading...</Box>;
  if (portfolioDetailError) return <Box>Error loading portfolio: {portfolioDetailError.message}</Box>;

  // 삭제
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDelete = async () => {
    try {
      if (portfolioDetailData) {
        await deletePortfolio(portfolioDetailData.pofolId);
        router.push(paths.mypage.portfolio); // 삭제 후 포트폴리오 목록으로 이동
      }
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
    }
    handleDeleteClose();
  };

  return (
    <Container>
    <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>{portfolioDetailData.pofolName}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <FormControlLabel
              control={<Switch checked={portfolioDetailData.status === "PUBLIC"} onChange={handleTogglePublic} />}
              label={portfolioDetailData.status === 'PUBLIC' ? "Public" : "Private"}
              labelPlacement="start"
            />
        </FormGroup>

        <Tooltip title="Edit">
          <IconButton color="primary" >
          {/* onClick={() => handleEditClick(portfolioState.pofolId)} */}
              <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="secondary" onClick={handleDeleteOpen}>
            <DeleteIcon sx={{ color: 'grey' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 글그림 포맷 */}
      {'pieces' in portfolioDetailData && (
        portfolioDetailData.pieces.map((piece, index) => (
          <Grid container spacing={2} key={index} sx={{ mt: 3, alignItems: 'center'}}>
           <Grid item xs={12} md={6}>
              <img
                src={piece.pieceUrl ? piece.pieceUrl : "https://geulgrim.s3.ap-northeast-2.amazonaws.com/no_image.png"}
                alt={piece.title}
                style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '800px' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{piece.title}</Typography>
              <br />
              <Typography variant="h6" gutterBottom>사용 프로그램:</Typography>
              <Typography variant="body1" gutterBottom>{piece.program}</Typography>
              <Typography variant="h6" gutterBottom>기여도:</Typography>
              <Typography variant="body1" gutterBottom>{piece.contribution}</Typography>
              <Typography variant="h6" gutterBottom>내용:</Typography>
              <Typography variant="body1" gutterBottom>{piece.content}</Typography>
            </Grid>
          </Grid>
        ))
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          marginTop: 6,
          marginBottom: 2,
        }}
      >
        <Button variant="contained" onClick={handleHome}>
          홈으로
        </Button>
        {/* <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button> */}
      </Box>

    </Paper>

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
  )


}
