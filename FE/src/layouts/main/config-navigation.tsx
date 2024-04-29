import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: '구인구직',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/recruit',
  },
  {
    title: '커뮤니티',
    path: '/community',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    children: [
      {
        items: [{ title: '자유 게시판', path: paths.custom }],
      },
      {
        items: [{ title: '그림 평가 게시판', path: paths.about }],
      },
      {
        items: [{ title: '크루 모집 게시판', path: paths.about }],
      },
    ],
  },
  {
    title: 'NFT마켓',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: '/nft-market',
  },
];
