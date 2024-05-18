import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, Grid, Paper, Button, Container, Typography } from '@mui/material';

import {fDate} from 'src/utils/format-time';

import { useGetCrewDetail } from 'src/api/community';

type Props = {
  id: string;
};

export default function CrewDetailView({ id }: Props) {
  const navigate = useNavigate();
  const { crew } = useGetCrewDetail(id);
  const crewDetails = crew;
  console.log(crewDetails);

  const handleApplyClick = () => {
    navigate(`/community/crew/apply/${id}`, { state: { crewDetails } });
  };

  if (!crewDetails) return <div>Loading...</div>;

  const getStatusProps = (status: string) => {
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
            {crewDetails.projectName}
          </Typography>
          <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'flex-end', color: statusProps.color }}>
            {statusProps.text}
          </Typography>
        </Grid>

        <Grid xs={10} md={8} sx={{ mx: 'auto' }}>
          <Typography variant="body2" textAlign='right'>
            등록일: {fDate(crewDetails.createdAt)}
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
            {crewDetails?.images?.map((url: string | undefined, index: React.Key | null | undefined) => (
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
