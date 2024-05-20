import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetApplyList } from 'src/api/recruit';

import { SplashScreen } from 'src/components/loading-screen';

export default function ApplyView() {
  
  const { applyData, applyLoading, applyError } = useGetApplyList();
  const [openModal, setOpenModal] = useState(false);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState<string>('');

  const router = useRouter()

  const handleOpenModal = (resumeUrl: string) => {
    setSelectedResumeUrl(resumeUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedResumeUrl('');
  };

  if (applyLoading) {
    return <SplashScreen />;
  }

  if (applyError) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
  }

  const getResultStatusColor = (status: string) => {
    if (status === 'SUCCESS') return 'blue';
    if (status === 'FAILED') return 'red';
    return 'black';
  };

  const getResultStatusText = (status: string) => {
    if (status === 'SUCCESS') return '합격';
    if (status === 'FAILED') return '불합격';
    return '미정';
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {applyData.getMyApplyedJobsResponses.map((job) => (
          <Grid xs={12} md={6} key={job.jobId}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {job.jobTitle.length > 15 ? `${job.jobTitle.slice(0, 15)}...` : job.jobTitle}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {job.position.map((pos) => (
                    <Chip key={pos} label={pos} />
                  ))}
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {job.companyName}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  마감일: {new Date(job.endDate).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ position: 'absolute', top: 16, right: 16, color: getResultStatusColor(job.resultStatus) }}
                >
                  {getResultStatusText(job.resultStatus)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" size="small" onClick={() => router.push(paths.recruit.details(job.jobId))}>
                    공고보기
                  </Button>
                  <Button variant="contained" size="small" onClick={() => handleOpenModal(job.resumeUrl)}>
                    제출 이력서 보기
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            overflow: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <img src={selectedResumeUrl} alt="Resume" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
