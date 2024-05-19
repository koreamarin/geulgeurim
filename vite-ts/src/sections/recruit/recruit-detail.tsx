import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { deleteRecruitStar, submitRecruitStar, useGetRecruitStarsList } from 'src/api/recruit';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import { RecruitApply } from './recruit-apply';

type Props = {
    id:number
}

const positions = [
  { value: 1, label: '선화' },
  { value: 2, label: '밑색' },
  { value: 3, label: '명암' },
  { value: 4, label: '후보정' },
  { value: 5, label: '작화' },
  { value: 6, label: '어시' },
  { value: 7, label: '각색' },
  { value: 8, label: '콘티' },
  { value: 9, label: '표지' },
  { value: 10, label: '삽화' },
  { value: 11, label: '배경' },
  { value: 12, label: '채색' },
  { value: 13, label: '편집' },
  { value: 14, label: '작가' },
  { value: 15, label: '공고확인' }
];

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
    "endDate": "2024-05-30T00:00:00",
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
    "star": true,
    "positionIds": [
        1,
        2,
        3,
        4
    ]
}

export default function RecruitDetail({id}:Props) {
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('accessToken')
  // 즐겨찾기 유무 파악
  const {recruitStarsData, recruitStarsError, recruitStarsLoading, recruitStarsMutate} = useGetRecruitStarsList(token)
  const selectIdList = recruitStarsData?.getJobsResponses?.map((item) => item.jobId) || [];
  const [selected, setSelected] = useState(selectIdList.includes(jobData.jobId));



  const positionList = jobData.positionIds.map(p_id => {
    const position = positions.find(pos => pos.value === p_id);
    return position ? position.label : null;
  })

  const end = new Date(jobData.endDate).getTime();
  const now = new Date().getTime();
  const diffInMs = end - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const calculateDDay = () => diffInDays >= 0 ? `D-${diffInDays}` : `D+${Math.abs(diffInDays)}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = () => {
    if (token) {
      setIsModalOpen(true);
    } else {
      alert('로그인이 필요한 서비스입니다')
    }
  };

  const handleIconClick = async (event:React.MouseEvent) => {
    event.stopPropagation();
    if (selected && token) {
      setSelected((prevSelected:boolean) => !prevSelected);
      const deleteStar = await deleteRecruitStar(id)
      if (!deleteStar) {
        enqueueSnackbar('즐겨찾기 삭제 실패!', { variant: 'error' });
        setSelected((prevSelected:boolean) => !prevSelected);
      } else {
        await recruitStarsMutate()
      }
    } else if (!selected && token) {
      setSelected((prevSelected:boolean) => !prevSelected);
      const submitStar = await submitRecruitStar(id)
      if (!submitStar) {
        enqueueSnackbar('즐겨찾기 등록 실패!', { variant: 'error' });
        setSelected((prevSelected:boolean) => !prevSelected);
      } else {
        await recruitStarsMutate()
      }
    } else {
      alert('로그인이 필요한 서비스입니다.')
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dDay = calculateDDay();

  return (
      <Box >
          {/* 메뉴 */}
          <Box sx={{ position: 'sticky', top: 60, width: '100%', zIndex: 2, padding: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
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
                  <Button disabled={diffInDays < 0} variant="contained" color="primary" onClick={handleApplyClick}>지원하기</Button>
                  </Stack>
              </Stack>
              <Stack direction="row" spacing={4} mt={2} justifyContent="space-between" minHeight='70px'>
                <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <Typography variant="body2"><strong>경력</strong>: {jobData.experienceType}</Typography>
                  {jobData.experienceType === '경력' && <Typography variant="body2"><strong>최소 경력</strong>: {jobData.minExperience}</Typography>}
                  <Typography variant="body2"><strong>학력</strong>: {jobData.education}</Typography>
                  <Typography variant="body2"><strong>직군</strong>: {positionList}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <Typography variant="body2"><strong>근무형태</strong>: {jobData.jobType}</Typography>
                  <Typography variant="body2"><strong>근무급여</strong>: {jobData.salary}</Typography>
                  <Typography variant="body2"><strong>근무지역</strong>: {jobData.secondLocate.firstLocate.firstLocateName} / {jobData.secondLocate.secondLocateName}</Typography>
                  <Typography variant="body2"><strong>마감방식</strong>: {jobData.closeType}</Typography>

                </Box>
                <Box sx={{display: 'flex', alignContent:'center', justifyContent:'center'}}>
                  <Typography variant="h3" gutterBottom  sx={{margin: 'auto 0px'}}>{dDay}</Typography>
                </Box>
              </Stack>
          </Box>

          {/* 내용 */}
          <Card sx={{ marginY:5 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>{jobData.title}</Typography>
                <Image src={jobData.fileUrl} alt={jobData.title} style={{ width: '100%' }} />
                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>직무 상세 내용</Typography>
                    {jobData.content}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>직원 복지</Typography>
                    {jobData.perk}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>절차 정보</Typography>
                    {jobData.procedureInfo}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>회사 정보</Typography>
                    <Typography variant="body2"><strong>회사 이름</strong>: {jobData.companyName}</Typography>
                    <Typography variant="body2"><strong>회사 주소</strong>: <Link href={jobData.companyUrl} target="_blank" rel="noopener">{jobData.companyUrl}</Link></Typography>
                    <Typography variant="body2"><strong>공고 주소</strong>: <Link href={jobData.url} target="_blank" rel="noopener">{jobData.url}</Link></Typography>
                  </CardContent>
                </Card>
              </CardContent>
          </Card>
          {/* 모달 컴포넌트 */}
        <RecruitApply open={isModalOpen} handleClose={handleCloseModal} />
      </Box>
    );
};
