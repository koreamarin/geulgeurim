import Card from '@mui/material/Card';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableConttainer from '@mui/material/TableContainer'
// import Grid from '@mui/material/Unstable_Grid2';


// ----------------------------------------------------------------------


export default function InformationRecentComment() {
  return (
      <Card>
        {/* 필터 들어가기 => zustand 이용, 바뀔 때 pagination 초기화 */}
        {/* 테이블 구성 */}


        {/* 페이지 네이션, 위치 상태함수로 저장 */}

        <Pagination
              count={8}
              defaultPage={1}
              siblingCount={1}
              sx={{
                mt: 8,
                [`& .${paginationClasses.ul}`]: {
                  justifyContent: 'center',
                },
              }}
            />
      </Card>
  );
}
