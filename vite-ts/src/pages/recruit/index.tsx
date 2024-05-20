import { Helmet } from 'react-helmet-async';

import { RecruitListView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>구인구직 리스트</title>
      </Helmet>

      <RecruitListView />
    </>
  );
}
