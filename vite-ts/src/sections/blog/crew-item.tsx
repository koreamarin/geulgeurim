import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { CrewMainItem } from 'src/types/blog';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------
type Props = {
  crew: CrewMainItem;
};

export default function PostItem(item: Props) {
  const { crew } = item;

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
          src={crew.userProfile}
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: 'absolute',
          }}
        />

        <Image alt="123" src={crew.thumbnail} ratio="4/3" />
      </Box>

      <CrewContent
        crewId={crew.crewId}
        userNickname={crew.userNickname}
        title={crew.title}
        createdAt={crew.date}
        hit={crew.hit}
        commentCnt={crew.commentCnt}
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
  userNickname: string;
  title: string;
  hit: string;
  commentCnt: string;
  createdAt: Date | string | number;
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: number;
};

export function CrewContent({
  crewId,
  userNickname,
  title,
  createdAt,
  hit,
  commentCnt,
  pen,
  color,
  bg,
  pd,
  story,
  conti,
  status,
}: CrewContentProps) {
  const mdUp = useResponsive('up', 'md');

  const linkTo = paths.community.crew.detail(crewId);

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
            href={linkTo}
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
          <></>
        )}

        {color ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              채색:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {color} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <></>
        )}

        {bg ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              배경:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {bg} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
        {pd ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              기획/편집:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {pd} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
        {story ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              스토리:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {story} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
        {conti ? (
          <Grid item>
            <Stack direction="row" alignItems="center">
              콘티:
              <Stack sx={{ fontWeight: 900 }}>&nbsp; {conti} </Stack> 명
            </Stack>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>

      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="flex-start"
        sx={{
          mt: 1.5,
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
