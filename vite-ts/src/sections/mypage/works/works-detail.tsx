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

import { useGetPiecesDetail } from 'src/api/piece';

import Image from 'src/components/image';
import SvgColor from 'src/components/svg-color/svg-color';

import WorksDetailDelete from './works-detail-delete';

// ----------------------------------------------------------------------

type Props = {
    workId: string
}

export default function WorksDetail({workId}:Props) {
  const router = useRouter()
  const { pieceDetailData, pieceDetailError, pieceDetailLoading, pieceDetailValidating } = useGetPiecesDetail(parseInt(workId, 10))
  const [changePrivate, setChangePrivate] = useState(pieceDetailData?.status === 'PUBLIC');
  const view = useBoolean();
  const selectVariant = 'zoomIn';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 우선적으로 변경하고 api를 보내서 사용자 경험 향상
    const newState = event.target.checked ? 'PUBLIC' : 'PRIVATE';
    setChangePrivate(event.target.checked)
    // SWR을 통해초기 캐시 관리
    // console.log(newState)
    // 실패 시 로직이 있어야됌 (ex) 실패했습니다 모달이나 메세지)
    // 로딩 시 좌측 로딩원 작게 띄우기
  };

  const category = () => {
    if (pieceDetailData?.pieceType === 'PEN') return '선화';
    if (pieceDetailData?.pieceType === 'COLOR') return '채색';
    if (pieceDetailData?.pieceType === 'BG') return '배경';
    if (pieceDetailData?.pieceType === 'PD') return 'PD';
    if (pieceDetailData?.pieceType === 'STORY') return '스토리';
    if (pieceDetailData?.pieceType === 'CONT') return '콘티';
    return '';
  };

  const handleHome = () => {
    router.push(paths.mypage.works);
  };

  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8} mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
          {pieceDetailData?.name}
          {pieceDetailData?.nftType === 'NFT' && (
            <SvgColor src='/assets/icons/mypage/ic_nft.svg' ml={2} sx={{ width: 30, height: 30 }} />
          )}
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
        {pieceDetailData?.fileUrl && (
          <Image alt="gallery" width='100%' src={pieceDetailData.fileUrl} />
        )}
        <Card sx={{ marginTop: 8, padding: 5 }}>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, marginBottom: 2 }}>
            <Typography variant="h4">
              {pieceDetailData?.name}
            </Typography>
            <Typography variant="subtitle1">
              {category()}
            </Typography>
          </Grid>
        
          {pieceDetailData?.description}
          <Typography variant="body2" textAlign='right'>
            등록일 : {new Date(pieceDetailData?.createdAt).toLocaleDateString()}
          </Typography>
        </Card>

        <Grid container justifyContent="flex-end" mt={3}>
          <Button
            style={{ height: '2.8rem', fontSize: '1rem' }}
            variant="outlined"
            color="info"
            size="medium"
            sx={{ marginRight: 1 }}
            onClick={handleHome}>
            홈으로
          </Button>
          {/* <Button
            style={{ height: '2.8rem', fontSize: '1rem' }}
            variant="outlined"
            color="success"
            size="medium"
            sx={{ marginRight: 1 }}
            onClick={() => router.push(paths.mypage.worksEdit(Number(workId)))}
          >
            수정하기
          </Button> */}

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
