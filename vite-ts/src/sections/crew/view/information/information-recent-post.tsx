import axios from 'axios';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
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

// ----------------------------------------------------------------------

function createData(crewId: number, title: string, applyCnt: number) {
  const projectName:string = title.length > 14 ? `${title.substr(0, 14)}...` : `${title}`
  
  return { crewId, projectName, applyCnt};
}

interface Column {
  id: 'crewId' | 'projectName' | 'applyCnt';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const COLUMNS: Column[] = [
  { id: 'crewId', label: '#', minWidth: 1 },
  { id: 'projectName', label: '제목', minWidth: 160},
  {
    id: 'applyCnt',
    label: '지원자',
    minWidth: 75,
    align: 'center',
  }
];

type myCrew = {
  "crewId": number,
  "projectName": string,
  "applyCnt": number,
}
export default function InformationRecentPost() {
  const [data, setData] = useState<myCrew[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const router = useRouter();

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/community/crew/mycrew', {
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
        projectName: string;
        applyCnt: number;
      }) => 
        createData(
          item.crewId,
          item.projectName,
          item.applyCnt,
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

  const handleRowClick = (pk:number) => {
    router.push(paths.community.crew.detail(pk));
  }

  const pageCount = 10

  const table = useTable({ defaultRowsPerPage: pageCount })

  return (
      <Card sx={{p:3}}>
        <Box sx={{ borderBottom: '3px solid black'}}>
          <Typography variant="h5" component="div" sx={{ color: 'gray', ml: 3, mb: 1, mt: 3 }}>
            내가 작성한 크루 모집글
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.crewId} onClick={() => handleRowClick(row.crewId)} sx={{ cursor: 'pointer'}}>
                        {COLUMNS.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
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
