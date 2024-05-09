import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { ShareMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------

type shareProps = {
    pk: number;
    userNickname: string;
    fullTitle: string;
    date:string;
    hit:number;
    comment_count:number;
    pen: number;
    color: number;
    bg: number;
    pd: number;
    story: number;
    conti: number;
    status: number;
};

export default function PostItem(share: shareProps) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');
  console.log('확인',share)
  const shareItem = share;
  // eslint-disable-next-line react/destructuring-assignment
  // console.log('1', shareItem)

  // const latestPost = index === 0 || index === 1 || index === 2;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            zIndex: 9,
            width: 88,
            height: 36,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Avatar
          alt="123"
          src="https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png"
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: 'absolute',
          }}
        />

        <Image
          alt="123"
          src="https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png"
          ratio="4/3"
        />
      </Box>

      <ShareContent
        shareId={shareItem.pk}
        userNickname={shareItem.userNickname}
        title={shareItem.fullTitle}
        totalViews={shareItem.hit}
        totalComments={shareItem.comment_count}
        createdAt={shareItem.date}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type ShareContentProps = {
  shareId: number;
  userNickname: string;
  title: string;
  index?: number;
  totalViews: number;
  totalComments: number;
  createdAt: Date | string | number;
};

export function ShareContent({
  shareId,
  userNickname,
  title,
  createdAt,
  totalViews,
  totalComments,
  index,
}: ShareContentProps) {
  const mdUp = useResponsive('up', 'md');

  const linkTo = paths.community.share.detail(shareId);

  // 상훈이형 오면 물어보기
  // const toProfile = paths.mypage.root;
  const toProfile = '';

  const latestPostLarge = index === 0;

  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        textAlign: 'left',
        pt: 4,
        width: 1,
      }}
    >
      <Stack
        spacing={0.5}
        direction="row"
        justifyContent="flex-start"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} href={toProfile} >
            <TextMaxLine variant={mdUp && latestPostLarge ? 'h5' : 'subtitle2'} line={1} persistent>
              {userNickname}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>

      <Link color="inherit" component={RouterLink} href={linkTo}>
        <TextMaxLine mt={1} variant={mdUp && latestPostLarge ? 'h5' : 'subtitle1'} line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="flex-start"
        sx={{
          mt: 3,
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(totalComments)}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(totalViews)}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
          pt: 1
        }}
      >
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {fDate(createdAt)}
      </Typography>
      </Stack>
    </CardContent>
  );
}
