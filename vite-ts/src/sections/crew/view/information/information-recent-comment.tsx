import axios from 'axios';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableConttainer from '@mui/material/TableContainer'
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CUSTOM_API } from 'src/config-global';

import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import { fontWeight } from '@mui/system';

// ----------------------------------------------------------------------

function createData(crewRequestId: number, fullTitle: string, stat: string, crewId: number,) {
  const message:string = fullTitle.length > 14 ? `${fullTitle.substr(0, 14)}...` : `${fullTitle}`

  let status: string;
  switch (stat) {
    case 'PENDING':
      status = '대기';
      break;
    case 'SUCCESS':
      status = '승인';
      break;
    case 'FAIL':
      status = '거절';
      break;
    default:
      status = stat;
  }
  return { crewRequestId, message, status, crewId };
}

interface Column {
  id: 'crewRequestId' | 'message' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'crewRequestId', label: '#', minWidth: 12 },
  { id: 'message', label: '내용', minWidth: 160},
  {
    id: 'status',
    label: '상태',
    minWidth: 75,
    align: 'center',
  },
];

type myApply = {
  "crewRequestId": number,
  "message" : string,
  "status" : string,
  "crewId" : number,
}

export default function InformationRecentPost() {
  const [data, setData] = useState<myApply[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/crew/myapply', {
        params: {
          page,
          size,
        },
        baseURL: CUSTOM_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const crewList = response.data.content;
      
      if(crewList && crewList.length !== 0) {
        const dataList = crewList.map((item : {
        crewId: number;
        message: string;
        status: string;
      }) => 
        createData(
          item.crewId,
          item.message,
          item.status,
          item.crewId,
        )
      );
      setData(dataList);
    }
      setTotalPages(response.data.totalPages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  }, [page, size]);
  
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);
  
  const handleRowClick = (crewId:number) => {
    router.push(paths.community.crew.detail(crewId));
  }

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const getStatusStyle = (status: string | number) => {
    switch (status) {
      case '대기':
        return { color: 'black', fontWeight: 'bold' };
      case '승인':
        return { color: 'green', fontWeight: 'bold' };
      case '거절':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  };



  const pageCount = 10

  const table = useTable({ defaultRowsPerPage: pageCount })

  return (
      <Card sx={{p:3}}>
        <Box sx={{ borderBottom: '3px solid black'}}>
          <Typography variant="h5" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
            내 크루 지원서
          </Typography>
        </Box>
 
        {/* 테이블 구성 */}
        <TableConttainer sx={{ position: 'relative', overflow: 'unset'}}>
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
                {!data.length ?
                (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align='center' colSpan={COLUMNS.length}>
                          아직 작성한 글이 없습니다
                        </TableCell>
                  </TableRow>
                )
                :
                  (data.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  ).map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.crewRequestId} onClick={() => handleRowClick(row.crewId)} sx={{ cursor: 'pointer'}}>
                        {COLUMNS.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} style={column.id === 'status' ? getStatusStyle(value) : {}}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                  ))
                  )
                }
              </TableBody>
            </Table>
          </Scrollbar>
        </TableConttainer>


        {/* 페이지 네이션, 위치 상태함수로 저장 */}

        <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        siblingCount={3}
        sx={{
          mt: 3,
          mb: 3,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
      </Card>
  );
}
