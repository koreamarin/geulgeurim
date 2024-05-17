import React, { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Grid, Paper, Switch, Tooltip, Container, Button,
  FormGroup, Typography, IconButton, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getPortfolioDetail } from 'src/api/portfolio';

type Props = {
  id: string;
};

type ServicePortfolio = {
  pofolId: number;
  pofolName: string;
  status: string;
  format: string;
  pieces: {
    title: string;
    program: string;
    contribution: string;
    content: string;
    pieceUrl: string;
  }[];
};


export default function PortfolioDetailView({ id }: Props) {
  const router = useRouter()
  const [portfolioState, setPortfolioState] = useState<ServicePortfolio | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data: ServicePortfolio = await getPortfolioDetail(parseInt(id, 10));
        setPortfolioState(data);
      } catch (error) {
        console.error("Failed to fetch portfolio details:", error);
      }
    };
    fetchPortfolio();
  }, [id]);


  const handleTogglePublic = () => {
    setPortfolioState(currentState => {
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

  const handleEditClick = (portfolioId: number) => {
    router.push(paths.mypage.portfolioEdit(portfolioId))
  };

  if (!portfolioState) return <Box>Loading...</Box>;

  return (
    <Container>
    <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>{portfolioState.pofolName}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch checked={portfolioState.status === "PUBLIC"} onChange={handleTogglePublic} />}
            label={portfolioState.status === 'PUBLIC' ? "Public" : "Private"}
            labelPlacement="start"
          />
        </FormGroup>

        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => handleEditClick(portfolioState.pofolId)}>
              <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="secondary" onClick={(e) => {
            console.log('Delete action triggered'); // Replace with actual delete function call
          }}>
            <DeleteIcon sx={{ color: 'grey' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 글그림 포맷 */}
      {'pieces' in portfolioState && (
        portfolioState.pieces.map((piece, index) => (
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
              <Typography variant="body1" gutterBottom>사용 프로그램: {piece.program}</Typography>
              <Typography variant="body1" gutterBottom>기여도: {piece.contribution}</Typography>
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
  </Container>
  )


}
