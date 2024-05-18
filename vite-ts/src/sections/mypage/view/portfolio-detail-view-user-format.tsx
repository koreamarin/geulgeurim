import React, { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Grid, Paper, Switch, Button, Dialog, Tooltip, Container,
  FormGroup, Typography, IconButton, DialogTitle, DialogActions, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deletePortfolio, usePortfolioDetailUserFormat } from 'src/api/portfolio';


type Props = {
  id: string;
};

export default function PortfolioDetailUserView({ id }: Props) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [portfolioState, setPortfolioState] = useState<any>(null);

  const { portfolioDetailUserData, portfolioDeatilUserLoading, portfolioDetailUserError } = usePortfolioDetailUserFormat(parseInt(id, 10));

  useEffect(() => {
    if (portfolioDetailUserData) {
      setPortfolioState(portfolioDetailUserData);
    }
  }, [portfolioDetailUserData]);

  const handleTogglePublic = () => {
    setPortfolioState((currentState: any) => {
      if (!currentState) return null;
      return {
        ...currentState,
        status: currentState.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
      };
    });
  };


  const handleHome = () => {
    router.push(paths.mypage.portfolio);
  };


  if (portfolioDeatilUserLoading) return <Box>Loading...</Box>;
  if (portfolioDetailUserError) return <Box>Error loading portfolio: {portfolioDetailUserError.message}</Box>;

    // 삭제
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    const handleDelete = async () => {
      try {
        if (portfolioState) {
          await deletePortfolio(portfolioDetailUserData.pofolId);
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
        <Typography variant="h4" sx={{ mb: 2 }}>{portfolioDetailUserData.pofolName}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <FormControlLabel
              control={<Switch checked={portfolioState?.status === 'PUBLIC'} onChange={handleTogglePublic} />}
              label={portfolioState?.status === 'PUBLIC' ? 'Public' : 'Private'}
              labelPlacement="start"
            />
          </FormGroup>

          <Tooltip title="Edit">
            <IconButton color="primary" >
            {/* onClick={handleEditClick} */}
                <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton color="secondary" onClick={handleDeleteOpen}>
              <DeleteIcon sx={{ color: 'grey' }} />
            </IconButton>
          </Tooltip>
        </Box>


        {portfolioDetailUserData.fileUrls.map((url, index) => (
          <Grid item xs={12} key={index} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
              src={url}
              alt={`Artwork ${index + 1}`}
              style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
            />
          </Grid>
        ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        <Button variant="contained" onClick={handleHome}>
          홈으로
        </Button>
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
  );
}
