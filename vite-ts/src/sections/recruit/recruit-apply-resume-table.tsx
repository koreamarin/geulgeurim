// eslint-disable-next-line import/no-extraneous-dependencies
import html2canvas from 'html2canvas';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Pagination, {paginationClasses} from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { submitRecruit } from 'src/api/recruit';
import { useGetResumeList } from 'src/api/mypageResume';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';
import {
  useTable,
  getComparator,
  TableHeadCustom,
} from 'src/components/table';

import RecruitApplyPreview from './recurit-apply-preview';

// ----------------------------------------------------------------------

type RowDataType = {
  title: string;
  createdAt: string;
  updatedAt: string;
  pk: number;
};

const TABLE_HEAD = [
  { id: 'title', label: '이력서 제목', align: 'left', minWidth: '150px' },
  { id: 'createdAt', label: '생성일', align: 'center', minWidth: '150px' },
  { id: 'updatedAt', label: '수정일', align: 'center', minWidth: '120px' },
  { id: 'button', label: '', align: 'center', minWidth: '120px' },
];

export default function RecruitApplyResumeTable({ recruitId }: { recruitId: number }) {
  const router = useRouter();
  const table = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState<RowDataType[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const hiddenPreviewRef = useRef<HTMLDivElement>(null);

  const { resumesData, resumesLoading, resumesError } = useGetResumeList({
    searchType: '',
    searchWord: '',
    sortType: '',
    sort: ''
  });

  useEffect(() => {
    if (resumesData && resumesData.getResumesResponse) {
      const data = resumesData.getResumesResponse.map((item) => ({
        pk: item.resumeId,
        title: item.resumeTitle,
        createdAt: item.createdAt.slice(0, 10),
        updatedAt: item.updatedAt.slice(0, 10)
      }));
      setTableData(data);
    }
  }, [resumesData]);

  const renderResumeList = () => {
    if (resumesLoading) {
      return <SplashScreen />;
    }

    if (resumesError) {
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
    }

    if (!resumesData.totalPage) {
      return (
        <>
          <Typography sx={{ textAlign: 'center', mt: 4 }}>이력서가 없습니다.</Typography>
          <Button onClick={() => { router.push(paths.mypage.resumeWrite) }} variant="outlined" color="success">
            이력서 추가하기
          </Button>
        </>
      );
    }

    return (
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size="medium" sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered.slice((page - 1) * pageCount, page * pageCount).map((row) => (
                <TableRow hover key={row.pk}>
                  <TableCell> {row.title} </TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">{row.updatedAt}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => handlePreviewClick(row.pk)}>
                      미리보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    )
  }

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const handlePreviewClick = async (pk: number) => {
    setSelectedResumeId(pk);
    setModalOpen(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const element = hiddenPreviewRef.current;
    if (element) {
      // 이미지 로드 완료 확인
      const images = element.getElementsByTagName('img');
      const imageLoadPromises = Array.from(images).map(img => {
        if (!img.complete) {
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }
        return Promise.resolve();
      });

      try {
        await Promise.all(imageLoadPromises);
        const canvas = await html2canvas(element, {
          scale: 2,
          allowTaint: true,
          useCORS: true,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          width: 1200
        });
        setCanvasImage(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error('이미지 로드 중 오류 발생:', error);
      }
    }
  };

  const handleSelectClick = async (pk: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = hiddenPreviewRef.current;
    if (element) {
      // 이미지 로드 완료 확인
      const images = element.getElementsByTagName('img');
      const imageLoadPromises = Array.from(images).map(img => {
        if (!img.complete) {
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }
        return Promise.resolve();
      });

      try {
        await Promise.all(imageLoadPromises);
        const canvas = await html2canvas(element, {
          scale: 2,
          allowTaint: true,
          useCORS: true,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          width: 1200
        });
        const canvasImageForm = canvas.toDataURL('image/png');
        await handleSubmitImage(canvasImageForm, pk);
      } catch (error) {
        console.error('이미지 로드 중 오류 발생:', error);
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCanvasImage(null);
  };

  const handleImageUpload = async (pk: number) => {
    if (!canvasImage) return;

    if (!window.confirm('제출 시 수정이 불가능합니다 정말로 제출하시겠습니까?')) return;

    await handleSubmitImage(canvasImage, pk);
  };

  // 제출!!

  const handleSubmitImage = async (image: string, pk: number) => {
    const byteString = atob(image.split(',')[1]);
    const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const formData = new FormData();
    formData.append('image_file', blob, 'resume.png');

    const submit = await submitRecruit(recruitId, pk, formData);
    if (submit) {
      enqueueSnackbar('제출 성공!');
      router.push(paths.recruit.main);
    } else {
      enqueueSnackbar('제출에 실패했습니다', { variant: 'error' });
    }
  };

  const pageCount = 7;
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {renderResumeList()}
      <Pagination
        page={page}
        onChange={handleChange}
        count={Math.floor((resumesData.totalPage - 1) / pageCount) + 1}
        defaultPage={1}
        siblingCount={1}
        sx={{
          mt: 3,
          mb: 3,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
      <div style={{ position: 'absolute', top: '-10000px' }}>
        <div ref={hiddenPreviewRef} style={{ width: '1200px', overflowX: 'hidden' }}>
          {selectedResumeId && <RecruitApplyPreview resumeId={selectedResumeId.toString()} />}
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            maxHeight: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
            overflowY: 'scroll',
            marginX: 'auto'
          }}
        >
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'white', zIndex: 1000, p: 2, boxShadow: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleModalClose} variant="contained">취소</Button>
            <Button onClick={() => handleImageUpload(selectedResumeId)} variant="contained" color="primary">제출하기</Button>
          </Box>
          <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            {canvasImage ? (
              <img src={canvasImage} alt="Resume Preview" style={{ width: '100%' }} />
            ) : (
              <Typography sx={{ textAlign: 'center', mt: 4 }}>이미지를 생성 중입니다...</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: RowDataType[];
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
