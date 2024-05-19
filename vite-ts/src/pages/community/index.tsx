import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/system';

import { useGetCommunityMain } from 'src/api/community';

import { CrewMainView } from 'src/sections/crew/view';
import { BoardMainView } from 'src/sections/board/view';
import { ShareMainView } from 'src/sections/share/view';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function CommunityHome() {
  const { community, communityLoading } = useGetCommunityMain();
  // console.log('community', community);
  console.log('newBoard', community.newBoard);
  console.log('popBoard', community.popBoard);
  console.log('newShare', community.newShare);
  console.log('newCrew', community.newCrew);
  if (communityLoading) {
    return <SplashScreen/>
  }
  return (
    <Container maxWidth="md" sx={{justifyContent: 'center'}}>
      <Helmet>
        <title>Community 메인페이지</title>
      </Helmet>
      <BoardMainView newBoard={community.newBoard} popBoard={community.popBoard}/>
      <ShareMainView newShare={community.newShare}/>
      <CrewMainView newCrew={community.newCrew}/>
    </Container>
  );
}
