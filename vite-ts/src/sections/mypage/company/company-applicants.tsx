// import { useState } from 'react';

import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TableRow from '@mui/material/TableRow';
// import Grid from '@mui/material/Unstable_Grid2';
// import TableBody from '@mui/material/TableBody';
// import TableHead from '@mui/material/TableHead';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import SearchIcon from '@mui/icons-material/Search';
// import TableCell from '@mui/material/TableCell';
// import InputAdornment from '@mui/material/InputAdornment';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// const mockNotices = [
//   { id: 101, title: 'OOO팀 보조 채용 공고입니다.', date: '2024.04.19', views: 9, applications: 6 },
//   { id: 102, title: 'OO팀 신입 모집 공고입니다.', date: '2024.04.18', views: 47, applications: 30 },
//   { id: 103, title: 'OO팀 서포터 채용 공고입니다.', date: '2024.04.17', views: 100, applications: 13 },
//   { id: 104, title: 'OO팀 스태프 모집 공고입니다.', date: '2024.04.17', views: 12, applications: 6 },
//   { id: 105, title: 'OO팀 인턴 채용 공고입니다.', date: '2024.04.16', views: 23, applications: 19 },
//   { id: 106, title: 'OO팀 스토리 채용 공고입니다.', date: '2024.04.15', views: 110, applications: 23 }
// ];

// const mockApplications = [
//   { id: 1, name: '김철수', date: '2024.04.19' },
//   { id: 2, name: '이서희', date: '2024.04.18' },
//   { id: 3, name: '최보라', date: '2024.04.17' },
//   { id: 4, name: '박찬희', date: '2024.04.17' },
//   { id: 5, name: '정재희', date: '2024.04.13' },
//   { id: 6, name: '애드설리', date: '2024.04.11' }
// ];

export default function CompanyApplicants() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

  return (
    <Box sx={{ padding: 4 }}>
        ㅁㄴㅇㄹㄴㅁㄹ
      {/* <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            내가 작성한 공고
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>제목</TableCell>
                    <TableCell>날짜</TableCell>
                    <TableCell>조회수</TableCell>
                    <TableCell>지원수</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockNotices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell>{notice.title}</TableCell>
                      <TableCell>{notice.date}</TableCell>
                      <TableCell>{notice.views}</TableCell>
                      <TableCell>{notice.applications}</TableCell>
                      <TableCell>
                        <Button variant="contained" size="small">
                          이동
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockNotices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <Grid xs={12} md={6}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            지원 원서
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>지원자</TableCell>
                    <TableCell>날짜</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.name}</TableCell>
                      <TableCell>{application.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockApplications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid> */}
    </Box>
  );
}



