import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import {
  Box,
  Card,
  Grid,
  Paper,
  Stack,
  Button,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { CUSTOM_API } from 'src/config-global';
import { useGetCrewDetail } from 'src/api/community';

import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

type Props = {
  id: string;
};
interface Column {
  id: 'crewRequestId' | 'message' | 'nickname';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

interface Column2 {
  id: 'crewRequestId' | 'message' | 'nickname' | 'button';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'crewRequestId', label: '#', minWidth: 12 },
  { id: 'message', label: '내용', minWidth: 160 },
  {
    id: 'nickname',
    label: '지원자',
    minWidth: 75,
    align: 'center',
  },
];

const COLUMNS2: Column2[] = [
  { id: 'crewRequestId', label: '#', minWidth: 12 },
  { id: 'message', label: '내용', minWidth: 160 },
  {
    id: 'nickname',
    label: '지원자',
    minWidth: 75,
    align: 'center',
  },
  {
    id: 'button',
    label: '',
    minWidth: 75,
    align: 'center',
  },
];

export default function CrewDetailView({ id }: Props) {
  const table = useTable();
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
      case 'INPROGRESS':
        return { color: 'green', text: '모집중' };
      case 'CLOSED':
        return { color: 'red', text: '모집종료' };
      default:
        return { color: 'inherit', text: '' };
    }
  };

  const statusProps = getStatusProps(crewDetails.status);
  console.log(crew);

  const handleAccept = async (crewRequestId: React.Key | null | undefined) => {
    try {
      const response = await axios.put('/api/v1/community/crew/accept', {
        params: {
          crewRequestId,
          crewId: id,
        },
        baseURL: CUSTOM_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const crewInfoList = response.data;
      if (crewInfoList && crewInfoList.length !== 0) {
        crewDetails.crewInfo = crewInfoList;
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error Accept:', error);
    }
  }

  const handleRefuse = async (crewRequestId: React.Key | null | undefined) => {
    try {
      const response = await axios.put('/api/v1/community/crew/refuse', {
        params: {
          crewRequestId,
          crewId: id,
        },
        baseURL: CUSTOM_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const crewInfoList = response.data;
      if (crewInfoList && crewInfoList.length !== 0) {
        crewDetails.crewInfo = crewInfoList;
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error Refuse:', error);
    }
  }

  return (
    <Container>
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <Grid
          xs={10}
          md={8}
          sx={{
            mx: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{ display: 'flex', alignItems: 'center', maxWidth: '720px' }}
          >
            {crewDetails.projectName}
          </Typography>
          <Typography
            variant="h5"
            sx={{ display: 'flex', justifyContent: 'flex-end', color: statusProps.color }}
          >
            {statusProps.text}
          </Typography>
        </Grid>

        <Grid xs={10} md={8} sx={{ mx: 'auto' }}>
          <Typography variant="body2" textAlign="right">
            등록일: {fDate(crewDetails.createdAt)}
          </Typography>
          <Card sx={{ mt: 8, p: 5 }}>
            <Typography variant="h4">{crewDetails.content}</Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center', mt: 5 }}
            >
              {crewDetails.pen !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  선화: {crewDetails.pen}
                </Typography>
              )}
              {crewDetails.color !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  채색: {crewDetails.color}
                </Typography>
              )}
              {crewDetails.bg !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  배경: {crewDetails.bg}
                </Typography>
              )}
              {crewDetails.pd !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  PD: {crewDetails.pd}
                </Typography>
              )}
              {crewDetails.story !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  스토리: {crewDetails.story}
                </Typography>
              )}
              {crewDetails.conti !== 0 && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  콘티: {crewDetails.conti}
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            {crewDetails?.images?.map(
              (url: string | undefined, index: React.Key | null | undefined) => (
                <Paper key={index} elevation={4} sx={{ p: 1 }}>
                  <img
                    src={url}
                    alt={`Gallery ${index}`}
                    style={{ width: '15rem', height: '15rem' }}
                  />
                </Paper>
              )
            )}
          </Box>
        </Grid>
        {crewDetails && crewDetails.owner ? (<></>) : (
          <Grid container justifyContent="center" mt={3}>
          <Button
            style={{ height: '2.8rem', fontSize: '1rem' }}
            variant="outlined"
            onClick={handleApplyClick}
            color="success"
            size="medium"
            sx={{ mb: 5, mt: 3 }}
            disabled={crewDetails.status === "CLOSED"}
          >
            지원하기
          </Button>
        </Grid>
        )}
        
        {crewDetails && crewDetails.owner ? (
          <Grid
            xs={10}
            md={8}
            sx={{ mx: 'auto', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            {/* 테이블 구성 */}
            <Box paddingLeft={3} mb={2}>
              <h2>합격자</h2>
            </Box>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table>
                  {/* 표 헤더 */}
                  <TableHead>
                    <TableRow>
                      {COLUMNS.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 56, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* 데이터가 없을 때 */}
                    {!crewDetails.crewInfo.filter(
                      (row: { status: string }) => row.status === 'SUCCESS'
                    ).length ? (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center" colSpan={COLUMNS.length}>
                          아직 합격자가 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      crewDetails.crewInfo
                        .filter((row: { status: string }) => row.status === 'SUCCESS')
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map(
                          (row: {
                            [x: string]: any;
                            crewRequestId: React.Key | null | undefined;
                          }) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.crewRequestId}>
                              {COLUMNS.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          )
                        )
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            {/* 테이블 구성 */}
            <Box paddingLeft={3} mb={2}>
              <h2>지원자</h2>
            </Box>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table>
                  {/* 표 헤더 */}
                  <TableHead>
                    <TableRow>
                      {COLUMNS2.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 56, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* 데이터가 없을 때 */}
                    {!crewDetails.crewInfo.filter(
                      (row: { status: string }) => row.status === 'PENDING'
                    ).length ? (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center" colSpan={COLUMNS2.length}>
                          아직 지원자가 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      crewDetails.crewInfo
                        .filter((row: { status: string }) => row.status === 'PENDING')
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map(
                          (row: { [x: string]: any; crewRequestId: React.Key | null | undefined; }) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.crewRequestId}>
                              {COLUMNS2.map((column) => {
                                const value = row[column.id];
                                let displayValue;

                                if (column.id === 'button') {
                                  displayValue = (
                                    <Grid sx={{ display: 'flex' }}>
                                      <Button onClick={() => handleAccept(row.crewRequestId)}
                                        sx={{
                                          bgcolor: '#22C55E',
                                          color: 'white',
                                          fontWeight: 'bold',
                                          fontSize: 15,
                                          mr: 1,
                                          ':hover': { color: '#22C55E', fontWeight: 'bold' },
                                        }}
                                      >
                                        수락
                                      </Button>
                                      <Button onClick={() => handleRefuse(row.crewRequestId)}
                                       sx={{
                                          bgcolor: '#ef5350',
                                          color: 'white',
                                          fontWeight: 'bold',
                                          fontSize: 15,
                                          ':hover': { color: '#ef5350', fontWeight: 'bold' },
                                        }}>거절</Button>
                                    </Grid>
                                  );
                                } else if (column.format && typeof value === 'number') {
                                  displayValue = column.format(value);
                                } else {
                                  displayValue = value;
                                }

                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {displayValue}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          )
                        )
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
}
