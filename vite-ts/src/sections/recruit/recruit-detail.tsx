import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { deleteRecruitStar, submitRecruitStar, useGetRecruitStarsList, useGetRecruitDetailList } from 'src/api/recruit';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';

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


export default function RecruitDetail({id}:Props) {
  const token = localStorage.getItem('accessToken')
  const {recruitStarsMutate} = useGetRecruitStarsList(token)
  const {recruitDetailData, recruitDetailError, recruitDetailLoading, recruitDetailMutate} = useGetRecruitDetailList(id)
  const { enqueueSnackbar } = useSnackbar();

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
    if (recruitDetailData.star && token) {
      const deleteStar = await deleteRecruitStar(id)
      if (!deleteStar) {
        enqueueSnackbar('즐겨찾기 삭제 실패!', { variant: 'error' });
      } else {
        await recruitDetailMutate()
        await recruitStarsMutate()
      }
    } else if (!recruitDetailData.star && token) {
      const submitStar = await submitRecruitStar(id)
      if (!submitStar) {
        enqueueSnackbar('즐겨찾기 등록 실패!', { variant: 'error' });
      } else {
        await recruitDetailMutate()
        await recruitStarsMutate()
      }
    } else {
      alert('로그인이 필요한 서비스입니다.')
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  if (recruitDetailLoading) {
    return <SplashScreen />;
  }
  if (recruitDetailError) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
  }
  
  const positionList = recruitDetailData.positionIds.map(p_id => {
    const position = positions.find(pos => pos.value === p_id);
    return position ? position.label : null;
  })

  const end = new Date(recruitDetailData.endDate).getTime();
  const now = new Date().getTime();
  const diffInMs = end - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const calculateDDay = () => diffInDays >= 0 ? `D-${diffInDays}` : `D+${Math.abs(diffInDays)}`;
  const dDay = calculateDDay();
  const shouldShowApplyButton = !(recruitDetailData.url.includes('saramin') || recruitDetailData.companyUrl.includes('saramin'))
  return (
      <Box >
          {/* 메뉴 */}
          <Box sx={{ position: 'sticky', top: 60, width: '100%', zIndex: 2, padding: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                      <Typography variant="h6" sx={{ display: 'inline', fontWeight: 'bold' }}>
                          [{recruitDetailData.companyName}]
                      </Typography>
                      <Typography variant="h6" sx={{ display: 'inline', marginLeft: 1 }}>
                          {recruitDetailData.title}
                      </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                  {recruitDetailData.star ? (
                      <Iconify icon="eva:star-fill" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
                  ) : (
                      <Iconify icon="eva:star-outline" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
                  )}
                  {shouldShowApplyButton && <Button disabled={(diffInDays < 0) || recruitDetailData.applyStatus || localStorage.getItem('userType') === 'ENTERPRISE'} variant="contained" color="primary" onClick={handleApplyClick}>지원하기</Button>}
                  </Stack>
              </Stack>
              <Stack direction="row" spacing={4} mt={2} justifyContent="space-between" minHeight='70px'>
                <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <Typography variant="body2"><strong>경력</strong>: {recruitDetailData.experienceType}</Typography>
                  {recruitDetailData.experienceType === '경력' && <Typography variant="body2"><strong>최소 경력</strong>: {recruitDetailData.minExperience}</Typography>}
                  <Typography variant="body2"><strong>학력</strong>: {recruitDetailData.education}</Typography>
                  <Typography variant="body2"><strong>직군</strong>: {positionList}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <Typography variant="body2"><strong>근무형태</strong>: {recruitDetailData.jobType}</Typography>
                  <Typography variant="body2"><strong>근무급여</strong>: {recruitDetailData.salary}</Typography>
                  <Typography variant="body2"><strong>근무지역</strong>: {recruitDetailData.secondLocate.firstLocate.firstLocateName} / {recruitDetailData.secondLocate.secondLocateName}</Typography>
                  <Typography variant="body2"><strong>마감방식</strong>: {recruitDetailData.closeType}</Typography>

                </Box>
                <Box sx={{display: 'flex', alignContent:'center', justifyContent:'center'}}>
                  <Typography variant="h3" gutterBottom  sx={{margin: 'auto 0px'}}>{dDay}</Typography>
                </Box>
              </Stack>
          </Box>

          {/* 내용 */}
          <Card sx={{ marginY:5 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>{recruitDetailData.title}</Typography>
                {recruitDetailData.fileUrl ? <Image src={recruitDetailData.fileUrl} alt={recruitDetailData.title} style={{ width: '100%' }} /> : 
                  <Typography variant="h6" gutterBottom marginBottom={3}>하단 공고 링크를 확인해 주세요</Typography>}
                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>직무 상세 내용</Typography>
                    {recruitDetailData.content}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>직원 복지</Typography>
                    {recruitDetailData.perk}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>절차 정보</Typography>
                    {recruitDetailData.procedureInfo}
                  </CardContent>
                </Card>

                <Card sx={{ marginY: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom marginBottom={3}>회사 정보</Typography>
                    <Typography variant="body2"><strong>회사 이름</strong>: {recruitDetailData.companyName}</Typography>
                    <Typography variant="body2"><strong>회사 주소</strong>: <Link href={recruitDetailData.companyUrl} target="_blank" rel="noopener">{recruitDetailData.companyUrl}</Link></Typography>
                    <Typography variant="body2"><strong>공고 주소</strong>: <Link href={recruitDetailData.url} target="_blank" rel="noopener">{recruitDetailData.url}</Link></Typography>
                  </CardContent>
                </Card>
              </CardContent>
          </Card>
          {/* 모달 컴포넌트 */}
        <RecruitApply open={isModalOpen} handleClose={handleCloseModal} recruitId={id}/>
      </Box>
    );
};
