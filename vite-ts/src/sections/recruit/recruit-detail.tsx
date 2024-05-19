import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// import RecruitDetailMenu from './recruit-detail-menu';

type Props = {
    id:number
}

const jobData = {
    "jobId": 8,
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
    "title": "노예집 노예(경비견) 모집",
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
    "star": true,       // ???????????
    "positionIds": [
        1,
        2,
        3,
        4
    ]
}

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

export default function RecruitDetail({id}:Props) {
    const selectIdList = selectdummy.getJobsResponses.map((item) => item.jobId);

    const [selected, setSelected] = useState(selectIdList.includes(jobData.jobId));

    const token = localStorage.getItem('accessToken')

    const handleIconClick = (event:React.MouseEvent) => {
        if (selected && token) {
            console.log(`삭제 ${id} selected status: ${!selected}`);
        } else if (!selected && token) {
            console.log(`등록 ${id} selected status: ${!selected}`);
        } else {
            alert('로그인이 필요한 서비스입니다.')
        }
        setSelected((prevSelected:boolean) => !prevSelected);
    };
    return (
        <Box >
            {/* 메뉴 */}
            <Box sx={{ position: 'fixed', top: 60, width: '95%', zIndex: 1000, padding: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" sx={{ display: 'inline', fontWeight: 'bold' }}>
                            [{jobData.companyName}]
                        </Typography>
                        <Typography variant="h6" sx={{ display: 'inline', marginLeft: 1 }}>
                            {jobData.title}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                    {selected ? (
                        <Iconify icon="eva:star-fill" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
                    ) : (
                        <Iconify icon="eva:star-outline" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
                    )}
                    <Button variant="contained" color="primary">지원하기</Button>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={4} mt={2}>
                    <Typography variant="body2"><strong>경력</strong>: {jobData.experienceType}</Typography>
                    {jobData.experienceType === '경력' && <Typography variant="body2"><strong>최소 경력</strong>: {jobData.minExperience}</Typography>}
                    <Typography variant="body2"><strong>학력</strong>: {jobData.education}</Typography>
                    <Typography variant="body2"><strong>고용형태</strong>: {jobData.closeType}</Typography>
                    <Typography variant="body2"><strong>급여</strong>: {jobData.salary}</Typography>
                    <Typography variant="body2"><strong>지역</strong>: {jobData.secondLocate.firstLocate.firstLocateName} / {jobData.secondLocate.secondLocateName}</Typography>
                </Stack>
            </Box>

            {/* 내용 */}
            <Card sx={{ marginTop:13 }}>
                <CardContent>
                <Typography variant="h4" gutterBottom>{jobData.title}</Typography>
                <Image src={jobData.fileUrl} alt={jobData.title} style={{ width: '100%' }} />
                <Typography variant="body1" mt={2}>{jobData.content}</Typography>
                <Typography variant="body1" mt={2}>{jobData.perk}</Typography>
                <Typography variant="body1" mt={2}>{jobData.procedureInfo}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};
