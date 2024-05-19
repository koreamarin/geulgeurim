import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Pagination, {paginationClasses} from '@mui/material/Pagination';

import RecruitMainCard from './recruit-main-card';


export default function RecruitMainList() {
    // 토큰 존재시만 불러와서 즐겨찾기 검증
    // const { resumesDetailData,  resumesDetailLoading } = useGetResumeDetail(copyId ? parseInt(copyId, 10) : undefined)
    const selectdummy = {
        "getJobsResponses": [
            {
                "jobId": 5,
                "secondLocate": {
                    "secondLocateKey": 101000,
                    "firstLocate": {
                        "firstLocateKey": 101000,
                        "firstLocateName": "서울"
                    },
                    "secondLocateName": "서울전체"
                },
                "startDate": "2024-05-08T00:00:00",
                "endDate": "2024-05-08T00:00:00",
                "title": "대감집 노예(경비견) 모집",
                "companyName": "대갑집",
                "positionIds": [
                    1,
                    2
                ]
            },
            {
                "jobId": 4,
                "secondLocate": {
                    "secondLocateKey": 101000,
                    "firstLocate": {
                        "firstLocateKey": 101000,
                        "firstLocateName": "서울"
                    },
                    "secondLocateName": "서울전체"
                },
                "startDate": "2024-05-08T00:00:00",
                "endDate": "2024-05-08T00:00:00",
                "title": "대감집 노예(경비견) 모집",
                "companyName": "대갑집",
                "positionIds": [
                    1,
                    2
                ]
            }
        ]
    }

    const dummy = {
        "getJobsResponses": [
            {
                "jobId": 2,
                "secondLocate": {
                    "secondLocateKey": 101000,
                    "firstLocate": {
                        "firstLocateKey": 101000,
                        "firstLocateName": "서울"
                    },
                    "secondLocateName": "서울전체"
                },
                "startDate": "2024-05-08T00:00:00",
                "endDate": "2024-05-08T00:00:00",
                "url": "https://board.jinhak.com/BoardV1/Upload/Job/News/Analysis/Images/200729_%EC%B1%84%EC%9A%A9_0729_171957.png",
                "title": "대감집 노예(경비견) 모집",
                "content": "한양 최대의 대감집에서 집지키는 개 역할을 하실 노예를 구합니다.",
                "companyName": "대갑집",
                "companyUrl": "https://koreamarin.github.io/project/",
                "jobType": "풀타임(24시간)",
                "experienceType": "경력무관",
                "minExperience": 0,
                "education": "석사졸업이상",
                "perk": "사료제공, 정문 옆 개집제공",
                "procedureInfo": "1.서류전형, 2.개소리면접, 3.임원과 담화, 4.신체검사",
                "salary": "초봉 8000만원",
                "closeType": "채용시",
                "openStatus": "PUBLIC",
                "fileUrl": "https://board.jinhak.com/BoardV1/Upload/Job/News/Analysis/Images/200729_%EC%B1%84%EC%9A%A9_0729_171957.png",
                "positionIds": [
                    1,
                    2
                ]
            },
            {
                "jobId": 3,
                "secondLocate": {
                    "secondLocateKey": 101000,
                    "firstLocate": {
                        "firstLocateKey": 101000,
                        "firstLocateName": "서울"
                    },
                    "secondLocateName": "서울전체"
                },
                "startDate": "2024-05-08T00:00:00",
                "endDate": "2024-05-08T00:00:00",
                "url": "https://board.jinhak.com/BoardV1/Upload/Job/News/Analysis/Images/200729_%EC%B1%84%EC%9A%A9_0729_171957.png",
                "title": "대감집 노예(경비견) 모집",
                "content": "한양 최대의 대감집에서 집지키는 개 역할을 하실 노예를 구합니다.",
                "companyName": "대갑집",
                "companyUrl": "https://koreamarin.github.io/project/",
                "jobType": "풀타임(24시간)",
                "experienceType": "경력무관",
                "minExperience": 0,
                "education": "석사졸업이상",
                "perk": "사료제공, 정문 옆 개집제공",
                "procedureInfo": "1.서류전형, 2.개소리면접, 3.임원과 담화, 4.신체검사",
                "salary": "초봉 8000만원",
                "closeType": "채용시",
                "openStatus": "PUBLIC",
                "fileUrl": "https://board.jinhak.com/BoardV1/Upload/Job/News/Analysis/Images/200729_%EC%B1%84%EC%9A%A9_0729_171957.png",
                "positionIds": [
                    1,
                    2
                ]
            }
        ],
        count: 2
    }

    // 더미데이터 이용중
    const selectIdList = selectdummy.getJobsResponses.map((item) => item.jobId);

    // 페이지네이션
    const [page, setPage] = useState<number>(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const pageCount = 12

    return (
        <>
            <Grid container spacing={2} mt={3}>
                {dummy?.getJobsResponses.slice((page - 1) * pageCount, page * pageCount).map((job) => {
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
                    <Grid xs={12} md={6} lg={4}>
                        <RecruitMainCard key={job.jobId} data={jobInfo}/>
                    </Grid>
                )}
                )}
            </Grid>
            <Pagination
                page={page}
                onChange={handleChange}
                count={Math.floor((dummy.count - 1) / pageCount) + 1}
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