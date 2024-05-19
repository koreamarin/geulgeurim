import { Helmet } from 'react-helmet-async';

import { CrewMypageView } from 'src/sections/crew/view/index';

// ----------------------------------------------------------------------

export default function CrewHome() {
  return (
    <>
      <Helmet>
        <title>마이페이지 크루</title>
      </Helmet>
      
      <CrewMypageView />
    </>
  );
}
