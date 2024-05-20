import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination, {paginationClasses} from '@mui/material/Pagination';

import { useRecruitFilterStore } from 'src/store/RecruitFilterStore';
import { useGetRecruitList, useGetRecruitStarsList } from 'src/api/recruit';

import { SplashScreen } from 'src/components/loading-screen';

import RecruitMainCard from './recruit-main-card';


export default function RecruitMainList() {
    // 토큰 존재시만 불러와서 즐겨찾기 검증
    const token = localStorage.getItem('accessToken')

    const { positionIds, experienceTypes, closeTypes } = useRecruitFilterStore();
    const {recruitsData, recruitsError, recruitsLoading} = useGetRecruitList({ positionIds, experienceTypes, closeTypes})
    const {recruitStarsData, recruitStarsError, recruitStarsLoading} = useGetRecruitStarsList(token)
    const selectIdList = recruitStarsData?.getJobsResponses?.map((item) => item.jobId) || [];

    // 페이지네이션
    const [page, setPage] = useState<number>(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const pageCount = 12

    if (recruitsLoading || recruitStarsLoading) {
      return <SplashScreen />;
    }
    if (recruitsError || recruitStarsError) {
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
    }
    if (!recruitsData.totalPage) {
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>공고가 없습니다.</Typography>;
    }
    return (
        <>
            <Grid container spacing={2} mt={3}>
                {recruitsData?.getJobsResponses.slice((page - 1) * pageCount, page * pageCount).map((job, index) => {
                    const jobInfo = {
                        "jobId": job.jobId,
                        "endDate": job.endDate,
                        "title": job.title,
                        "companyName": job.companyName,
                        "salary": job.salary,
                        "positionIds": job.positionIds,
                        "selected": selectIdList.includes(job.jobId)
                    }
                    return (
                    <Grid key={index} xs={12} md={6} lg={4}>
                        <RecruitMainCard data={jobInfo}/>
                    </Grid>
                )}
                )}
            </Grid>
            <Pagination
                page={page}
                onChange={handleChange}
                count={Math.floor((recruitsData.totalPage - 1) / pageCount) + 1}
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
        </>
    )
}
