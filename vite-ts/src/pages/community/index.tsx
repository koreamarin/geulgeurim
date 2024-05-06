import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/system';

import { CrewMainView } from 'src/sections/crew/view';
import { BoardMainView } from 'src/sections/board/view';
import { ShareMainView } from 'src/sections/share/view';

// ----------------------------------------------------------------------

export default function CommunityHome() {
  return (
    <Container maxWidth="md" sx={{justifyContent: 'center'}}>
      <Helmet>
        <title>Community 메인페이지</title>
      </Helmet>
      <BoardMainView />
      <ShareMainView />
      <CrewMainView />
    </Container>
  );
}
