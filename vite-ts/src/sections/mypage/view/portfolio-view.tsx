import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  Box, Grid, Paper, Button, Tooltip, Container,
  FormGroup, Typography, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';


const portfolios = [
  {
    id: 1,
    pofol_name: "Digital Art Portfolio",
    status: "PUBLIC",
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
    pofol_name: "Sketch Art Portfolio",
    status: "PUBLIC",
    description: "Various sketches and doodles .",
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
    pofol_name: "3D Models Portfolio",
    status: "PUBLIC",
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
  const [portfolioState, setPortfolioState] = useState(portfolios);
  const [open, setOpen] = useState(false);

  const handlePortfolioClick = (portfolioId: number) => {
    router.push(paths.mypage.portfolioDetail(portfolioId));
  };

  const handleTogglePublic = (portfolioId: number) => {
    const updatedPortfolios = portfolioState.map(portfolio => {
      if (portfolio.id === portfolioId) {
        return { ...portfolio, status: (portfolio.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC') };
      }
      return portfolio;
    });
    setPortfolioState(updatedPortfolios);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePortfolioWrite = () => {
    router.push(paths.mypage.portfolioWrite)
  };

  const handlePortfolioWriteUserFormat = () => {
    router.push(paths.mypage.portfolioWriteUserFormat)
  };

  const handleEditClick = (portfolioId: number) => {
    router.push(paths.mypage.portfolioEdit(portfolioId))
  };

  return (
    <Container>
      {portfolioState.map((portfolio) => (
        <Paper key={portfolio.id} elevation={3} sx={{ p: 2, mt: 2, mb: 4, cursor: 'pointer' }}>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <Typography variant="h4" onClick={() => handlePortfolioClick(portfolio.id)}>{portfolio.pofol_name}</Typography>

          {/* Toggle Switch and Edit Button grouped together */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={portfolio.status === "PUBLIC"}
                  onChange={() => handleTogglePublic(portfolio.id)}
                />
              }
              label={portfolio.status === 'PUBLIC' ? "Public" : "Private"}
              labelPlacement="start"
            /> */}
              <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => handleEditClick(portfolio.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={(e) => {

                  console.log('Delete action triggered');
                }}>
                  <DeleteIcon sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
            </FormGroup>
          </Box>

        </Box>

          {/* <Typography variant="body1" sx={{ mb: 2 }}>{portfolio.description}</Typography> */}

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


    </Container>
  );
}
