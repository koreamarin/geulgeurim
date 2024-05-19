import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deleteRecruitStar, submitRecruitStar, useGetRecruitStarsList } from 'src/api/recruit';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

type JobItemProps = {
  data: {
    jobId: number;
    endDate: string;
    title: string;
    companyName: string;
    salary: string;
    positionIds: number[];
    selected: boolean
  };
};

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

export default function RecruitMainCard({ data }: JobItemProps) {
  const token = localStorage.getItem('accessToken')
  const {recruitStarsMutate} = useGetRecruitStarsList(token)
  const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const calculateDDay = (endDate: string) => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const diffInMs = end - now;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          return diffInDays >= 0 ? `${diffInDays}일 남음` : `${Math.abs(diffInDays)}일 지남`;
        };
    const { jobId, endDate, title, companyName, salary, positionIds } = data;
    const dDay = calculateDDay(endDate);

    const handleClick = () => {
        console.log('jobId:', jobId);
        router.push(paths.recruit.details(jobId))
      };

    const [selected, setSelected] = useState(data.selected);


    const handleIconClick = async (event:React.MouseEvent) => {
        event.stopPropagation();
        if (selected && token) {
          setSelected((prevSelected:boolean) => !prevSelected);
          const deleteStar = await deleteRecruitStar(jobId)
          if (!deleteStar) {
            enqueueSnackbar('즐겨찾기 삭제 실패!', { variant: 'error' });
            setSelected((prevSelected:boolean) => !prevSelected);
          } else {
            await recruitStarsMutate()
          }
        } else if (!selected && token) {
          setSelected((prevSelected:boolean) => !prevSelected);
          const submitStar = await submitRecruitStar(jobId)
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

    return (
    <Card key={jobId} sx={{ padding: 2, cursor: 'pointer', height:'100%' }} onClick={handleClick}>
        <Box display="flex" justifyContent="flex-end">
        {selected ? (
                <Iconify icon="eva:star-fill" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
            ) : (
                <Iconify icon="eva:star-outline" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleIconClick} />
            )}
        </Box>
        <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
                <Typography color="text.secondary" align="center">
                  {companyName}
                </Typography>
                <Typography variant="h5" component="div" align="center">
                {title.length > 15 ? `${title.slice(0, 15)}...` : title}
                </Typography>
            </Box>
            <Box textAlign='end' mt={5}>
                <Typography color="text.secondary">
                {dDay}
                </Typography>
                <Typography color="text.secondary">
                {salary}
                </Typography>
            </Box>
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                {positionIds.map(id => {
                const position = positions.find(pos => pos.value === id);
                return position ? <Chip key={id} label={position.label} /> : null;
                })}
          </Box>
        </CardContent>
    </Card>
    );
}
