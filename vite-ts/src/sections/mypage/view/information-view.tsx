import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InformationProfile from '../information-profile';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';


export default function InformationView() {
  const { user } = useMockedUser();
  return (
    <Container>
      <Box>
        <Typography variant="h3" component="h1">
            {user?.displayName} 님
        </Typography>
        <InformationProfile />
      </Box>
    </Container>
  );
}
