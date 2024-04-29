import { Helmet } from 'react-helmet-async';

import { Custom } from 'src/sections/custom/view';

// ----------------------------------------------------------------------

export default function CustomPage() {
  return (
    <>
      <Helmet>
        <title>커스텀 테스트</title>
      </Helmet>

      <Custom />
    </>
  );
}
