import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { passedOrNot, useGetSubmittList } from 'src/api/recruit';

import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';

type Applicant = {
  resumeId: number;
  resumeTitle: string;
  resumeUrl: string;
  resultStatus: string;
};

export default function CompanyRecruitApplicants({ jobId }: { jobId: number }) {
  const [open, setOpen] = useState(false);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState<string>('');
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const { recruitSubmittData, recruitSubmittLoading, recruitSubmittMutate } = useGetSubmittList(jobId);
  const { enqueueSnackbar } = useSnackbar();

  if (recruitSubmittLoading) {
    return <SplashScreen />;
  }

  if (!recruitSubmittData || recruitSubmittData.getSubmittedResumesResponse.length === 0) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">아직 지원자가 없습니다.</Typography>
      </Box>
    );
  }

  const handleOpen = (resumeUrl: string, resumeId: number) => {
    setSelectedResumeUrl(resumeUrl);
    setSelectedResumeId(resumeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedResumeUrl('');
    setSelectedResumeId(null);
  };

  const handleStatusChange = async (status: 'SUCCESS' | 'FAIL') => {
    if (selectedResumeId !== null) {
      const success = await passedOrNot(jobId, selectedResumeId, status);
      if (success) {
        recruitSubmittMutate();
        handleClose();
        enqueueSnackbar('합격 여부 수정 성공!');
      } else {
        enqueueSnackbar('합격 여부 수정 실패!', { variant: 'error' });
      }
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '미결정';
      case 'SUCCESS':
        return '합격';
      case 'FAIL':
        return '불합격';
      default:
        return 'Unknown';
    }
  };

  const getChipColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'success';
      case 'FAIL':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ padding: 2 }}>지원 원서</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>지원자</TableCell>
              <TableCell align="right">결과 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruitSubmittData.getSubmittedResumesResponse.map((applicant: Applicant) => (
              <TableRow key={applicant.resumeId} onClick={() => handleOpen(applicant.resumeUrl, applicant.resumeId)} sx={{ cursor: 'pointer' }}>
                <TableCell>{applicant.resumeTitle}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={getStatusLabel(applicant.resultStatus)}
                    color={getChipColor(applicant.resultStatus)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'auto'
        }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusChange('SUCCESS')}
            >
              합격
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusChange('FAIL')}
            >
              불합격
            </Button>
          </Box>
          <img src={selectedResumeUrl} alt="Resume" style={{ width: '100%' }} />
        </Box>
      </Modal>
    </Box>
  );
}
