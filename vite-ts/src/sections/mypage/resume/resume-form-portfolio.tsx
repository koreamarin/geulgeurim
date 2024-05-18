import { Fragment, useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useRowState } from 'src/hooks/useRowState';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom
} from 'src/components/table';

import ResumeFormPortfolioTable from './resume-form-portfolio-table';
import ResumeFormPortfolioUserPreview from './resume-form-portfolio-user-preview';
import ResumeFormPortfolioServicePreview from './resume-form-portfolio-service-preview';

// ----------------------------------------------------------------------


type CustomRowDataType = {
  pofolName : string
  pofolId : number
  createdAt : Date
  updatedAt : Date
  format : string
}

type CustomInputType = {
  pofolName : string
  pofolId : number
  createdAt : string
  updatedAt : string
  format : string
}

type Props = {
  portfolDatas :CustomInputType[]
}

const custom_TABLE_HEAD = [
  { id: 'pofolName', label: '포트폴리오 제목', align: 'left', minWidth:'150px' },
  { id: 'createdAt', label: '생성일', align: 'center',minWidth:'150px' },
  { id: 'updatedAt', label: '최근 수정일', align: 'center', minWidth:'120px' },
  { id: 'detail', label: '', align: 'center', width:'8px'}
]
// ----------------------------------------------------------------------

export default function RHFSelectPortfolio({portfolDatas}:Props) {
  const { control, setValue, getValues } = useFormContext()

  const { openRows, toggleRow } = useRowState()

  const [page, setPage] = useState<number>(1);
  const [tableData, setTableData] = useState<CustomRowDataType[]>([]);

  const denseHeight = 34;

  useEffect(() => {
    const dataChangeType = portfolDatas.map(item => ({
      pofolName: item.pofolName,
      pofolId: item.pofolId,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      format: item.format
    }));
    setTableData(dataChangeType);
  }, [portfolDatas]);

  const table = ResumeFormPortfolioTable({
    defaultOrderBy: 'createdAt',
    defaultSelected: getValues("portfolioIds")
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
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 420 }}>

            {/* 테이블 헤더 */}
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={custom_TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) => {
                const newValues = checked ? dataFiltered.map((row) => row.pofolId) : [];
                setValue("portfolioIds", newValues);
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.pofolId)
                )
              }}
            />

            {/* 테이블 */}
            <TableBody>
              {dataFiltered
                .slice(
                  (page - 1) * table.rowsPerPage,
                  (page - 1) * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <Fragment key={row.pofolId}>
                    <TableRow
                      hover
                      key={row.pofolId }
                      onClick={() => {
                        // 클릭시 form의 value에 접속해 변경
                        const newValues = getValues("portfolioIds").includes(row.pofolId) ?
                        getValues("portfolioIds").filter((id:number) => id !== row.pofolId)
                        : [...getValues("portfolioIds"), row.pofolId];
                        setValue("portfolioIds", newValues);
                        table.onSelectRow(row.pofolId)
                        console.log(table)
                      }}
                      selected={table.selected.includes(row.pofolId)}
                    >
                      <TableCell padding="checkbox">

                        <Controller
                          name="portfolioIds"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Checkbox
                              onBlur={onBlur}
                              onChange={(event) => {
                                let updatedValue;
                                if (event.target.checked) {
                                  updatedValue = [...value, row.pofolId].sort((a, b) => a - b);
                                } else {
                                  updatedValue = value.filter((id: number) => id !== row.pofolId);
                                }
                                onChange(updatedValue);
                                setValue("portfolioIds", updatedValue);
                              }}
                              checked={value.includes(row.pofolId)}
                      />
                          )}
                        />
                      </TableCell>
                      <TableCell> {row.pofolName } </TableCell>
                      <TableCell align="center">{row.createdAt.toLocaleDateString() }</TableCell>
                      <TableCell align="center">{row.updatedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          color={openRows[row.pofolId] ? 'inherit' : 'default'}
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleRow(row.pofolId)}}
                        >
                          <Iconify
                            icon={openRows[row.pofolId] ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ py: 0 }} colSpan={6}>
                        <Collapse in={openRows[row.pofolId]} unmountOnExit>
                          <Paper
                            variant="outlined"
                            sx={{
                              py: 2,
                              my: 2,
                              borderRadius: 1.5,
                              ...(openRows[row.pofolId] && {
                                boxShadow: (theme) => theme.customShadows.z20,
                              }),
                            }}
                          >
                              {row.format === 'USER' ?
                              <ResumeFormPortfolioUserPreview portfolId={row.pofolId}/>
                              :
                              <ResumeFormPortfolioServicePreview portfolId={row.pofolId}/>
                              }

                          </Paper>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                    </Fragment>
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

      {/* 선택 포트폴리오 */}
      <Card>
        {table.selected.map((item, index) => {
          const data = tableData.find(portfol => portfol.pofolId === item);
          return (
            <Accordion key={index} sx={{borderBottom: 'solid #00000014 1px'}}>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <IconButton onClick={(event) => {
                  event.stopPropagation();
                  const updatedSelected = getValues("portfolioIds").filter((id:number) => id !== item)
                  // form 삭제
                  setValue('portfolioIds', updatedSelected);
                  // 테이블 삭제
                  table.onSelectRow(item)
                  }}>
                  <Iconify color='#ff000073' icon="solar:trash-bin-trash-bold" />
                </IconButton>
                <Typography variant="subtitle2" alignContent='center' ml={2}>{data?.pofolName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data?.format === 'USER' ?
                  <ResumeFormPortfolioUserPreview portfolId={item}/>
                  :
                  <ResumeFormPortfolioServicePreview portfolId={item}/>
                  }
              </AccordionDetails>
            </Accordion>
        )})}
        </Card>
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
