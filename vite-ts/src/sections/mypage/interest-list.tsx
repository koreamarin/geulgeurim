import { useState } from "react";

import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography"
import Pagination, {paginationClasses} from '@mui/material/Pagination';

import { useGetRecruitStarsList } from "src/api/recruit"

import { SplashScreen } from "src/components/loading-screen"

import InterestListCard from "./interest-list-card";

export default function InterestList() {
    const token = localStorage.getItem('accessToken')
    const {recruitStarsData, recruitStarsError, recruitStarsLoading} = useGetRecruitStarsList(token)
    const userName = localStorage.getItem('nickname')
    const userId = localStorage.getItem('userId')

    // 페이지네이션
    const [page, setPage] = useState<number>(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const pageCount = 12
    console.log(recruitStarsData)
    // 조건 랜더링
    const rander = () => {
        if (recruitStarsLoading) {
            return <SplashScreen />;
        }
        if (recruitStarsError) {
            return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
        }
        if (!recruitStarsData.getJobsResponses.length) {
            return <Typography sx={{ textAlign: 'center', mt: 4 }}>관심 공고가 없습니다.</Typography>;
        }
        return (
            <>
            <Grid container spacing={2} mt={3}>
                {recruitStarsData?.getJobsResponses.slice((page - 1) * pageCount, page * pageCount).map((job, index) => {
                    const jobInfo = {
                        "jobId": job.jobId,
                        "endDate": job.endDate,
                        "title": job.title,
                        "companyName": job.companyName,
                        "salary": job.salary,
                        "positionIds": job.positionIds,
                        "selected": true
                    }
                    return (
                    <Grid key={index} xs={12} md={6} lg={4}>
                        <InterestListCard data={jobInfo}/>
                    </Grid>
                )}
                )}
            </Grid>
            <Pagination
                page={page}
                onChange={handleChange}
                count={Math.floor((recruitStarsData.getJobsResponses.length - 1) / pageCount) + 1}
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
    return (
        <>
            <Typography variant="h3" sx={{ mb: 5 }}>
            {userName || `사용자${userId}` } 님의 관심공고
            </Typography>
            {rander()}
        </>
    )
}