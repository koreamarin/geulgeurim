import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import Scrollbar from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import ResumeFormPortfolioTable from './resume-form-portfolio-table';

// ----------------------------------------------------------------------

type CustomRowDataType = {
  pofolName : string,
  pofolId : number,
  createAt : Date,
  updateAt : Date,
}

const dummyData = [
  {
    pofolName : "더미데이터 제목1",
	  pofolId : 1,
    createAt: '2022-04-05',
    updateAt: '2024-04-01',
    status : 'PUBLIC'
  },
  {
    pofolName : "더미데이터 제목2",
	  pofolId : 2,
    createAt: '2022-04-05',
    updateAt: '2024-04-01',
    status : 'PUBLIC'
  }
]

const custom_TABLE_HEAD = [
  { id: 'pofolName', label: '포트폴리오 제목', align: 'left' },
  { id: 'createAt', label: '생성일', align: 'center' },
  { id: 'updateAt', label: '최근 수정일', align: 'center' },
]
// ----------------------------------------------------------------------

export default function Test() {
  const [page, setPage] = useState<number>(1);
  const [tableData, setTableData] = useState<CustomRowDataType[]>([]);

  const denseHeight = 34;

  useEffect(() => {
    const dummyDataChangeType = dummyData.map(item => ({
      pofolName: item.pofolName,
      pofolId: item.pofolId,
      createAt: new Date(item.createAt),
      updateAt: new Date(item.updateAt),
    }));
    setTableData(dummyDataChangeType);
  }, []);

  const table = ResumeFormPortfolioTable({
    defaultOrderBy: 'createAt',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };


  return (
    <div>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        {table.selected}
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>

            {/* 테이블 헤더 */}
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={custom_TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.pofolId )
                )
              }
            />

            {/* 테이블 */}
            <TableBody>
              {dataFiltered
                .slice(
                  (page - 1) * table.rowsPerPage,
                  (page - 1) * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <TableRow
                    hover
                    key={row.pofolId }
                    onClick={() => table.onSelectRow(row.pofolId )}
                    selected={table.selected.includes(row.pofolId )}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={table.selected.includes(row.pofolId )} />
                    </TableCell>
                    <TableCell> {row.pofolName } </TableCell>
                    <TableCell align="center">{row.createAt.toLocaleDateString() }</TableCell>
                    <TableCell align="center">{row.updateAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      {/* 페이지네이션 */}
      <Pagination
        count={Math.ceil(dataFiltered.length / 5)}
        defaultPage={1}
        page={page}
        onChange={handleChangePage}
        siblingCount={1}
        sx={{
          mt: 3,
          mb: 3,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />


    </div>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: CustomRowDataType[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
