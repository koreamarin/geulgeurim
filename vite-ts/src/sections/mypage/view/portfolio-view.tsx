// import React from 'react';

// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton
} from '@mui/material';

export default function PortfolioView() {
  return (
    <Container>
  <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        포트폴리오
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          새 포트폴리오
        </Typography>
        <Grid container spacing={2}>
          {/* Example Item */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography>내맘대로 작업</Typography>
                <Typography variant="body2" color="text.secondary">사용 프로그램: Clip Studio</Typography>
              </Box>
              {/* <IconButton>
                <MoreVertIcon />
              </IconButton> */}
            </Box>
            <img src="https://source.unsplash.com/random" alt="portfolio" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          {/* Repeat for other items */}
        </Grid>
      </Paper>
    </Container>
  )
}
