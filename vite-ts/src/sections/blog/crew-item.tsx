import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { CrewMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------
type Props = {
  crew: CrewMainItem;
};

export default function PostItem(item: Props) {
  const { crew } = item;

  const linkTo = paths.community.crew.detail(crew.crewId);

  // 작성자 프로필로 이동
  const toProfile = () => {
    console.log('작성자 ID: ', crew.userId);
  };

  return (
    <Card >
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

        <Link component={RouterLink} href="" onClick={toProfile}>
          <Avatar
            alt="123"
            src={crew.userFileUrl}
            sx={{
              left: 24,
              zIndex: 9,
              bottom: -24,
              position: 'absolute',
            }}
          />
        </Link>

        <Link component={RouterLink} href={linkTo}>
          <Image alt="123" src={crew.imageList && crew.imageList.length !== 0 ? crew.imageList[0].fileUrl : "../../../no_image.png"} ratio="4/3" />
        </Link>
      </Box>

      <CrewContent
        crewId={crew.crewId}
        userId={crew.userId}
        userNickname={crew.userNickname}
        title={crew.projectName}
        createdAt={crew.createdAt}
        pen={crew.pen}
        color={crew.color}
        bg={crew.bg}
        pd={crew.pd}
        story={crew.story}
        conti={crew.conti}
        status={crew.status}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CrewContentProps = {
  crewId: number;
  userId: number;
  userNickname: string;
  title: string;
  createdAt: Date | string | number;
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: string;
};

export function CrewContent({
  crewId,
  userId,
  userNickname,
  title,
  createdAt,
  pen,
  color,
  bg,
  pd,
  story,
  conti,
  status,
}: CrewContentProps) {

  const linkTo = paths.community.crew.detail(crewId);

  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log('작성자 ID: ', userId);
  };

  return (
    <CardContent
      sx={{
        textAlign: 'left',
        pt: 2,
        width: 1,
      }}
    >
      <Stack
        spacing={0.5}
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 1.5,
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
            onClick={toProfile}
          >
            <TextMaxLine variant="subtitle2" line={1} persistent>
              {userNickname}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>

      {status === "INPROGRESS" ? (
        <Link color="inherit" component={RouterLink} href={linkTo}>
          <TextMaxLine mt={1} variant="subtitle1" line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
      ) : (
        <>
          <Link color="inherit" component={RouterLink} href={linkTo}>
            <TextMaxLine mt={1} variant="subtitle2" line={1} persistent>
              <del>{title}</del>
            </TextMaxLine>
          </Link>
          <TextMaxLine mt={1} variant="subtitle1" line={1} persistent>
            (모집 종료)
          </TextMaxLine>
        </>
      )}

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        sx={{
          mt: 1.5,
          typography: 'caption',
          color: 'black',
          fontWeight: 500,
          height: 80
        }}
      >
        {pen ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              선화:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {pen} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}

        {color ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              채색:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {color} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}

        {bg ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              배경:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {bg} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}
        {pd ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              기획/편집:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {pd} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}
        {story ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              스토리:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {story} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}
        {conti ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              콘티:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {conti} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <div />
        )}
      </Grid>

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
