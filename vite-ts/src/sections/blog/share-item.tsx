import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { ShareMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------

type shareProps = {
  share: ShareMainItem;
};

export default function ShareItem(shareItem: shareProps) {
  const { share } = shareItem;
  const linkTo = paths.community.share.detail(share.shareId);

  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log(share.userId);
  };

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

        <Link
          component={RouterLink}
          href=""
          // href={toProfile}
          onClick={toProfile}
        >
          <Avatar
            alt="123"
            src={share.userProfile}
            sx={{
              left: 24,
              zIndex: 9,
              bottom: -24,
              position: 'absolute',
            }}
          />
        </Link>

        <Link component={RouterLink} href={linkTo}>
          <Image
            alt="123"
            src={share.imageList && share.imageList.length !== 0 ? share.imageList[0].fileUrl : "../../../no_image.png"}
            ratio="4/3"
          />
        </Link>
      </Box>

      <ShareContent
        shareId={share.shareId.toString()}
        userId={share.userId}
        userNickname={share.userNickname}
        title={share.title}
        hit={share.hit}
        commentCnt={share.commentCnt}
        createdAt={share.createdAt}
        updatedAt={share.updatedAt}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type ShareContentProps = {
  shareId: string;
  userId: number;
  userNickname: string;
  title: string;
  hit: string;
  commentCnt: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
};

export function ShareContent({
  shareId,
  userId,
  userNickname,
  title,
  createdAt,
  hit,
  commentCnt,
  updatedAt,
}: ShareContentProps) {
  const linkTo = paths.community.share.detail(Number(shareId));

  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log(userId);
  };

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
          <Link
            color="inherit"
            style={{ textDecoration: 'none' }}
            component={RouterLink}
            href=""
            // href={toProfile}
            onClick={toProfile}
          >
            <TextMaxLine variant="subtitle2" line={1} persistent>
              {userNickname}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>

      <Link color="inherit" component={RouterLink} href={linkTo}>
        <TextMaxLine mt={1} variant="subtitle1" line={2} persistent>
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
          {fShortenNumber(commentCnt)}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(hit)}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
          pt: 1,
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
