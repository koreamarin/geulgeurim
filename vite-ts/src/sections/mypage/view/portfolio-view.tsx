import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box, Grid, Paper, Button, Switch, Tooltip, Container,
  FormGroup, Typography, IconButton, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

const portfolios = [
  {
    id: 1,
    title: "Digital Art Portfolio",
    isPublic: "PUBLIC",
    description: "A collection of my digital artworks.",
    artworks: [
      {
        imageUrl: "https://source.unsplash.com/random/1",
        name: "Digital Landscape",
        software: "Photoshop"
      },
      {
        imageUrl: "https://source.unsplash.com/random/2",
        name: "Digital Abstract",
        software: "Clip Studio"
      }
    ]
  },
  {
    id: 2,
    title: "Sketch Art Portfolio",
    isPublic: "PUBLIC",
    description: "Various sketches and doodles.",
    artworks: [
      {
        imageUrl: "https://source.unsplash.com/random/3",
        name: "Coffee Sketch",
        software: "Pencil & Paper"
      }
    ]
  },
  {
    id: 3,
    title: "3D Models Portfolio",
    isPublic: "PUBLIC",
    description: "My 3D modeling projects.",
    artworks: [
      {
        imageUrl: "https://source.unsplash.com/random/4",
        name: "3D Robot",
        software: "Blender"
      },
      {
        imageUrl: "https://source.unsplash.com/random/5",
        name: "3D Car Model",
        software: "AutoCAD"
      }
    ]
  }
];

export default function PortfolioView() {
  const router = useRouter()
  // const navigate = useNavigate();
  const [portfolioState, setPortfolioState] = useState(portfolios);

  const handlePortfolioClick = (portfolioId: number) => {
    // navigate(`/portfolio/${portfolioId}`);
    router.push(paths.mypage.portfolioDetail(portfolioId))
  };

  const handleTogglePublic = (portfolioId: number) => {
    const updatedPortfolios = portfolioState.map(portfolio => {
      if (portfolio.id === portfolioId) {
        return { ...portfolio, isPublic: (portfolio.isPublic === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC') };
      }
      return portfolio;
    });
    setPortfolioState(updatedPortfolios);
  };

  return (
    <Container>
      {portfolioState.map((portfolio) => (
        <Paper key={portfolio.id} elevation={3} sx={{ p: 2, mt: 2, mb: 4, cursor: 'pointer' }}>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <Typography variant="h4" onClick={() => handlePortfolioClick(portfolio.id)}>{portfolio.title}</Typography>

          {/* Toggle Switch and Edit Button grouped together */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={portfolio.isPublic === "PUBLIC"}
                  onChange={() => handleTogglePublic(portfolio.id)}
                />
              }
              label={portfolio.isPublic === 'PUBLIC' ? "Public" : "Private"}
              labelPlacement="start"
            />
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </FormGroup>
          </Box>

        </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>{portfolio.description}</Typography>

          <Grid container spacing={2}>
            {portfolio.artworks.map((artwork, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img src={artwork.imageUrl} alt={artwork.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <Typography variant="h6">{artwork.name}</Typography>
                <Typography variant="body2">사용 프로그램: {artwork.software}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}
