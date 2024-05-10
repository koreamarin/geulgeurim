import { useState } from 'react';

import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Image from 'src/components/image';
import SvgColor from 'src/components/svg-color/svg-color';

import WorksDetailDelete from './works-detail-delete';

// ----------------------------------------------------------------------
function createDummyData(piece_id: number, fileUrl: string, type: string, name: string, create_at: Date, description: string,  nft_type: string, status:string) {
  const date:string = create_at.toLocaleDateString()
  return { piece_id, fileUrl, type, name, description, nft_type, status, date };
}

const dummy = [
  createDummyData(1, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg', 'PEN', '그림1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(2, '', 'STORY', '스토리1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(3, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg', 'COLOR', '그림2', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(4, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg', 'BG', '그림3', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(5, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg', 'PD', '그림4', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(6, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg', 'CONT', '그림5', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(7, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg', 'PEN', '그림6', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(8, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg', 'PEN', '그림7', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(9, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg', 'PEN', '그림8', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(10, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg', 'PEN', '그림9', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(11, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg', 'PEN', '그림10', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(12, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_11.jpg', 'PEN', '그림11', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
];

type Props = {
    workId: string
}

export default function WorksDetail({workId}:Props) {
  const dummyData = dummy.find((item) => item.piece_id === parseInt(workId, 10))
  const category = () => {
    if (dummyData?.type === 'PEN') {
      return '선화'
    } if (dummyData?.type === 'COLOR') {
      return '채색'
    } if (dummyData?.type === 'BG') {
      return '배경'
    } if (dummyData?.type === 'PD') {
      return 'PD'
    } if (dummyData?.type === 'STORY') {
      return '스토리'
    } if (dummyData?.type === 'CONT') {
      return '콘티'
    }
      return '기타'
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 우선적으로 변경하고 api를 보내서 사용자 경험 향상
    const newState = event.target.checked ? 'PUBLIC' : 'PRIVATE';
    setChangePrivate(event.target.checked)
    // SWR을 통해초기 캐시 관리
    console.log(newState)
    // 실패 시 로직이 있어야됌 (ex) 실패했습니다 모달이나 메세지)
    // 로딩 시 좌측 로딩원 작게 띄우기
  };

  const [changePrivate, setChangePrivate] = useState(dummyData?.status === 'PUBLIC')

  const view = useBoolean();

  const selectVariant = 'zoomIn';

  const router = useRouter()

  return (
    <Grid container spacing={3} sx={{pt:3}}>
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8} mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3"sx={{ display: 'flex', alignItems: 'center' }}>
            {dummyData?.name}
            {dummyData?.nft_type === 'NFT' && <SvgColor src='/assets/icons/mypage/ic_nft.svg' ml={2} sx={{ width: 30, height: 30 }}/>}
        </Typography>
        <FormControlLabel
          checked={changePrivate}
          key='status'
          label='공개여부'
          labelPlacement='start'
          control={<Switch />}
          onChange={handleChange}
        />
      </Grid>
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
        {dummyData?.fileUrl && <Image
            alt="gallery"
            width='100%'
            src={dummyData?.fileUrl}
        />}
        <Card sx={{marginTop:8, padding: 5}}>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, marginBottom: 2 }}>
            <Typography variant="h4">
                {dummyData?.name}
            </Typography>
            <Typography variant="subtitle1">
                {category()}
            </Typography>
          </Grid>
          {dummyData?.description}
          <Typography variant="body2" textAlign='right'>
            등록일 : {dummyData?.date}
          </Typography>
        </Card>
        <Grid container justifyContent="flex-end" mt={3}>
          <Button  style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium" sx={{marginRight:3}} onClick={() => router.push(paths.mypage.worksEdit(parseInt(workId, 10)))}>
            수정하기
          </Button>

          <WorksDetailDelete
            open={view.value}
            onOpen={view.onTrue}
            onClose={view.onFalse}
            selectVariant={selectVariant}
            deleteWorks={workId}
          />

        </Grid>
      </Grid>
    </Grid>
  );
}
