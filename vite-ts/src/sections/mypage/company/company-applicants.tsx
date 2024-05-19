import { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetMyRecruitList } from 'src/api/recruit';

import { SplashScreen } from 'src/components/loading-screen';

import CompanyRecruitApplicants from './company-recruit-applicants';

type Job = {
  jobId: number;
  secondLocate: {
    secondLocateKey: number;
    firstLocate: {
      firstLocateKey: number;
      firstLocateName: string;
    };
    secondLocateName: string;
  };
  startDate: string;
  endDate: string;
  title: string;
  companyName: string;
  positionIds: number[];
};

export default function CompanyApplicants() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { recruitMineData, recruitMineLoading } = useGetMyRecruitList();
  const router = useRouter()

  if (recruitMineLoading) {
    return <SplashScreen />;
  }

  if (!recruitMineData || recruitMineData.getJobsResponses.length === 0) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">작성한 공고가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, display: 'flex', gap: 4 }}>
      <Paper sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ padding: 2 }}>내가 작성한 공고</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>날짜</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruitMineData.getJobsResponses.map((job) => (
                <TableRow key={job.jobId} onClick={() => setSelectedJob(job)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{job.title.length > 18 ? `${job.title.slice(0, 18)}...` : job.title}</TableCell>
                  <TableCell>{job.startDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => router.push(paths.recruit.details(job.jobId))}>이동하기</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ flex: 1 }}>
        {selectedJob ? (
          <CompanyRecruitApplicants jobId={selectedJob.jobId} />
        ) : (
          <Box sx={{ padding: 2 }}>
            <Typography>공고를 선택해주세요.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
