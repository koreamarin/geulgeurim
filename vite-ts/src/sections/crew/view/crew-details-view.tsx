import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Assuming createDummyData is defined elsewhere or you have actual API calls to fetch data
function createDummyData(
  crew_id: number, user_id: number, project_name: string, content: string, created_at: string, updated_at: string,
  pen: number, color: number, bg: number, pd: number, story: number, conti: number, status: string,
  images: string[]
) {
  return {
    crew_id, user_id, project_name, content, created_at, updated_at,
    pen, color, bg, pd, story, conti, status, images
  };
}

const dummyDataArray = [
  createDummyData(
    1, 1, '나의 동료가 되줘!', '네이버 웹툰 등재를 꿈꾸고 있습니다. 많이 지원해주세요.',
    '2024-04-29 16:07:38.886008', '', 0, 1, 2, 1, 0, 3, 'INPROGRESS',
    ['https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/user/28_20240507043106.jpg']
  ),
  createDummyData(
    2, 1, '주현이와 친구들', '판타지 웹툰, 생활 웹툰 고민 중입니다.',
    '2024-04-29 16:40:35.559943', '', 1, 1, 2, 0, 0, 1, 'INPROGRESS', []
  ),
  createDummyData(
    3, 2, '코리아 마린???', '해병대 이야기. 병장이 사람을 살린 썰', '', '',
    1, 0, 1, 0, 0, 1, 'CLOSED', []
  )
];

type CrewDetail = {
  crew_id: number;
  user_id: number;
  project_name: string;
  content: string;
  created_at: string;
  updated_at: string;
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: string;
  images: string[];
};

type Props = {
  id: string;
};

export default function CrewDetailView({ id }: Props) {
  const navigate = useNavigate();
  const [crewDetails, setCrewDetails] = useState<CrewDetail | undefined>();

  useEffect(() => {
    // Simulate fetching data
    const foundData = dummyDataArray.find(item => item.crew_id === parseInt(id, 10));
    setCrewDetails(foundData);
  }, [id]);

  const handleApplyClick = () => {
    navigate(`/community/crew/apply/${id}`, { state: { crewDetails } });
  };

  if (!crewDetails) return <div>Loading...</div>;

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

  const statusProps = getStatusProps(crewDetails.status);

  return (
    <Container>
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <Grid xs={10} md={8} sx={{ mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
            {crewDetails.project_name}
          </Typography>
          <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'flex-end', color: statusProps.color }}>
            {statusProps.text}
          </Typography>
        </Grid>

        <Grid xs={10} md={8} sx={{ mx: 'auto' }}>
          <Typography variant="body2" textAlign='right'>
            등록일: {crewDetails.created_at}
          </Typography>
          <Card sx={{ mt: 8, p: 5 }}>
            <Typography variant="h4">
              {crewDetails.content}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              선화: {crewDetails.pen} · 채색: {crewDetails.color} · 배경: {crewDetails.bg} · PD: {crewDetails.pd} · 스토리: {crewDetails.story} · 콘티: {crewDetails.conti}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            {crewDetails.images.map((url, index) => (
              <Paper key={index} elevation={4} sx={{ p: 1 }}>
                <img src={url} alt={`Gallery ${index}`} style={{ width: '15rem', height: '15rem' }} />
              </Paper>
            ))}
          </Box>
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Button style={{ height: '2.8rem', fontSize: '1rem' }} variant="outlined" onClick={handleApplyClick} color="success" size="medium" sx={{ mb: 5, mt: 3 }}>
            지원하기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
