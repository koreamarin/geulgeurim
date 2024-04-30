import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: '구인구직',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: paths.recruit.main,
  },
  {
    title: '커뮤니티',
    path: paths.community.root,
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    children: [
      {
        items: [{ title: '자유 게시판', path: paths.community.board.main }],
      },
      {
        items: [{ title: '그림 평가 게시판', path: paths.community.share.main }],
      },
      {
        items: [{ title: '크루 모집 게시판', path: paths.community.crew.main }],
      },
    ],
  },
  {
    title: 'NFT마켓',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: '/nft',
  },
];
