import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const homePage = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">made by
          SSAFY C108 화가, 난 화가 TEAM
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={6}>
            <Logo sx={{ mb: 3,  }} />
            <Typography
              variant="body2"
              sx={{
                maxWidth: 300,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              create By : SSAFY C108 화가, 난 화가 TEAM
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="body2" textAlign='end' sx={{ mt: 10 }}>
              © 2024-05
            </Typography>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );

  return homePage ? simpleFooter : mainFooter;
}
