import { Box, Card, Button, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

function createDummyData(
  crew_id: number, user_id: number, project_name: string, content: string, created_at: string, updated_at: string,
  pen: number, color: number, bg: number, pd: number, story: number, conti: number, status: string,
  images: string[]
) {
  return {
    crew_id,
    user_id,
    project_name,
    content,
    created_at,
    updated_at,
    pen,
    color,
    bg,
    pd,
    story,
    conti,
    status, images
  };
}

const dummy = [
  createDummyData(
    1,
    1,
    '나의 동료가 되줘!',
    '네이버 웹툰 등재를 꿈꾸고 있습니다. 많이 지원해주세요.',
    '2024-04-29 16:07:38.886008',
    '',
    0,
    1,
    2,
    1,
    0,
    3,
    'INPROGRESS',
    ['https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/user/28_20240507043106.jpg'
  ]
  ),
  createDummyData(
    2,
    1,
    '주현이와 친구들',
    '판타지 웹툰, 생활 웹툰 고민 중입니다',
    '2024-04-29 16:40:35.559943',
    '',
    1,
    1,
    2,
    0,
    0,
    1,
    'INPROGRESS',
    []
  ),
  createDummyData(
    3,
    2,
    '코리아 마린???',
    '해병대 이야기. 병장이 사람을 살린 썰',
    '',
    '',
    1,
    0,
    1,
    0,
    0,
    1,
    'CLOSED',
    []
  ),
];

type Props = {
  id: string;
};

export default function CrewDetailView({ id }: Props) {
  const dummyData = dummy.find((item) => item.crew_id === parseInt(id, 10));
  const getStatusProps = (status) => {
    switch (status) {
      case "INPROGRESS":
        return { color: 'green', text: '모집중' };
      case "CLOSED":
        return { color: 'red', text: '모집종료' };
      default:
        return { color: 'inherit', text: '' };
    }
  };
  const statusProps = dummyData ? getStatusProps(dummyData.status) : { color: 'inherit', text: '' };


  return (
    <Container>
      <Grid container spacing={3} sx={{pt:3}}>
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8} mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3"sx={{ display: 'flex', alignItems: 'center' }}>
            {dummyData?.project_name}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            color: statusProps.color
          }}
        >
          {statusProps.text}
        </Typography>

         {/* {dummyData?.fileUrl && <Image
            alt="gallery"
            width='100%'
            src={dummyData?.fileUrl}
        />} */}
      </Grid>

      <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
      <Typography variant="body2" textAlign='right'>
            등록일 : {dummyData?.created_at}
          </Typography>
        {/* {dummyData?.fileUrl && <Image
            alt="gallery"
            width='100%'
            src={dummyData?.fileUrl}
        />} */}
        <Card sx={{marginTop:8, padding: 5}}>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, marginBottom: 2 }}>
            <Typography variant="h4">
            {dummyData?.content}
            </Typography>
          </Grid>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, marginBottom: 2 }}>
      <Typography variant="h6">
        <span>선화: {dummyData?.pen} · </span>
        <span>색상: {dummyData?.color} · </span>
        <span>배경: {dummyData?.bg} · </span>
        <span>PD: {dummyData?.pd} · </span>
        <span>스토리: {dummyData?.story} · </span>
        <span>컨티: {dummyData?.conti}</span>
      </Typography>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          {dummyData.images.map((url, index) => (
            <Paper key={index} elevation={4} sx={{ p: 1 }}>
              <img src={url} alt={`Gallery ${index}`} style={{ width: '15rem', height: '15rem' }} />
            </Paper>
          ))}
        </Box>
      </Grid>
    </Grid>


        </Card>
        <Grid container justifyContent="center" mt={3}>
          <Button  style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined"
          color="success" size="medium" sx={{ marginBottom: 5, marginTop: 3 }}>
            지원하기
          </Button>
        </Grid>
      </Grid>
    </Grid>
    </Container>
  );
}
