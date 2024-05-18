import React, { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Grid, Paper, Switch, Tooltip, Container, Button,
  FormGroup, Typography, IconButton, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getPortfolioDetailUserFormat } from 'src/api/portfolio';

type Props = {
  id: string;
};

type UserPortfolio = {
  pofolId: number;
  pofolName: string;
  status: string;
  format: string;
  fileUrls: string[];
};

export default function PortfolioDetailUserView({ id }: Props) {
  const router = useRouter();
  const [portfolioState, setPortfolioState] = useState<UserPortfolio | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data: UserPortfolio = await getPortfolioDetailUserFormat(parseInt(id, 10));
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


  const handleEditClick = () => {
    if (portfolioState) {
      router.push(`${paths.mypage.portfolioEdit}/${portfolioState.pofolId}`)
    }
  };


  const handleHome = () => {
    router.push(paths.mypage.portfolio);
  };

  if (!portfolioState) return <Box>Loading...</Box>;

  return (
    <Container>

      <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>{portfolioState.pofolName}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <FormControlLabel
              control={<Switch checked={portfolioState.status === "PUBLIC"} onChange={handleTogglePublic} />}
              label={portfolioState.status === 'PUBLIC' ? "Public" : "Private"}
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
            <IconButton color="secondary" onClick={() => console.log('Delete action triggered')}>
              <DeleteIcon sx={{ color: 'grey' }} />
            </IconButton>
          </Tooltip>
        </Box>


        {portfolioState.fileUrls.map((url, index) => (
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
        {/* <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button> */}
      </Box>



      </Paper>
    </Container>
  );
}
