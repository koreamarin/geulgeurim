import React, { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Grid, Paper, Switch, Tooltip, Container,
  FormGroup, Typography, IconButton, FormControlLabel
} from '@mui/material';

type Props = {
  id: string;
};

type ServicePortfolio = {
  id: number;
  pofol_name: string;
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

type UserPortfolio = {
  id: number;
  pofol_name: string;
  status: string;
  format: string;
  file_url: string[];
};

type Portfolio = ServicePortfolio | UserPortfolio;

const portfolio = {
  id: 1,
  pofol_name: "Digital Art Portfolio",
  status: "PUBLIC",
  format: "SERVICE",
  pieces: [
    {
      title: "Digital Landscape",
      program: "Photoshop",
      contribution: "100%",
      content: "",
      pieceUrl: "https://source.unsplash.com/random/1"
    },
    {
      title: "Digital Abstract",
      program: "Clip Studio",
      contribution: "기여도 80% 입니다.",
      content: "추상화풍의 웹툰을 그려봤어요. ",
      pieceUrl: "https://source.unsplash.com/random/2"
    }
  ]
}

const portfolio_user_format = {
  id: 8,
  pofol_name: "테스트 유저의 채색 포트폴리오",
  status: "PUBLIC",
  format: "USER",
  file_url: [
    "https://source.unsplash.com/random/1",
    "https://source.unsplash.com/random/2"
  ]
}


export default function PortfolioDetailView({ id }: Props) {
  const [portfolioState, setPortfolioState] = useState<Portfolio>(portfolio);


  const handleTogglePublic = () => {
    setPortfolioState(currentState => ({
      ...currentState,
      status: (currentState.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC')
    }));
  };

  return (
    <Container>
    <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{portfolioState.pofol_name}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch checked={portfolioState.status === "PUBLIC"} onChange={handleTogglePublic} />}
            label={portfolioState.status === 'PUBLIC' ? "Public" : "Private"}
            labelPlacement="start"
          />
        </FormGroup>
        <Tooltip title="Edit">
                <IconButton color="primary" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering any higher level click events
                  console.log('Delete action triggered'); // Replace with actual delete function call
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
      </Box>

      {/* 글그림 포맷 */}
      {portfolioState.format === "SERVICE" && 'pieces' in portfolioState && (
        portfolioState.pieces.map((piece, index) => (
          <Grid container spacing={2} key={index} sx={{ mt: 2, alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <img src={piece.pieceUrl} alt={piece.title} style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '800px' }} />
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

      {/* 사용자 포맷 */}
      {portfolioState.format === "USER" && 'file_url' in portfolioState && (
          portfolioState.file_url.map((url, index) => (
            <Grid item xs={12} key={index} sx={{ mt: 2 }}>
              <img
                src={url}
                alt={`Artwork ${index + 1}`}
                style={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain'
                }}
              />
            </Grid>
          ))
        )}
    </Paper>
  </Container>
  )


}
