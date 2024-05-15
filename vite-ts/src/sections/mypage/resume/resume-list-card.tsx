import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button, { ButtonProps } from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import { positionList } from '../position';

const StyledButton = styled(({expanded, ...props}: ButtonProps & { expanded: boolean }) => {
  const {...other} = props
  return <Button endIcon={
    <Iconify
      icon="eva:arrow-ios-downward-fill"
      style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', margin:'10px' }}
    />  } {...props} />
})(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: 'transparent',
  textAlign: 'center',
  width: '100%',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#f4f4f4',
    '& button': {
      color: theme.palette.secondary.main,
    },
  },
  borderTop: '1px solid #E0E0E0'
}));


// ----------------------------------------------------------------------


type Props = {
  resumeId?: number
  resumeTitle?: string
  essay?: string
  openStatus: string
  fileUrl?: string
  position?: number[]
}


export default function ResumeListCard({resumeId, resumeTitle, essay, openStatus, fileUrl, position}:Props) {
  // const blockBubble = useRef<>

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [changePrivate, setChangePrivate] = useState(openStatus === 'PUBLIC')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 우선적으로 변경하고 api를 보내서 사용자 경험 향상
    const newState = event.target.checked ? 'PUBLIC' : 'PRIVATE';
    setChangePrivate(event.target.checked)
    // SWR을 통해초기 캐시 관리
    console.log(newState)
    // 실패 시 로직이 있어야됌 (ex) 실패했습니다 모달이나 메세지)
    // 로딩 시 좌측 로딩원 작게 띄우기
  };

  const moveDetail = () => {
    console.log('이동경로', resumeId)
  }

  const moveCopy = (event:React.MouseEvent) => {
    // moveDetail에 대한 버블링 방지
    event.stopPropagation();
    console.log('이동경로', resumeId)
  }


  return (
    <Card sx={{ maxWidth: '100%', backgroundColor: '#f1f1f16e', mb:4, cursor: 'pointer' }} onClick={moveDetail}>
      {/* 클릭 시 이동 가능하도록 */}
      <CardContent sx={{ pb: 0 }}>
        {/* 제목 */}
        <Typography variant="h4" sx={{ borderBottom: '1px solid #E0E0E0', paddingBottom : 2, display: 'flex', justifyContent: 'space-between'}}>
          {resumeTitle}
          <Stack direction="row" alignItems="center">
            <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium" sx={{marginRight:3}} onClick={moveCopy}>
              복사하기
            </Button>
            <FormControlLabel
              checked={changePrivate}
              key='status'
              label='공개여부'
              labelPlacement='start'
              control={<Switch onChange={handleChange}/>}
              onClick={(event) => event.stopPropagation()}
            />
          </Stack>
        </Typography>
      </CardContent>
      <CardContent sx={{ pb: 0 }}>
        <Grid container spacing={3} paddingX={2}>

          {/* 내용 */}
          <Grid xs={12} sm={9.5} md={10} xl={10.5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >


            {/* 포지션 */}
            <Typography variant="h6">
              직군
              <Typography variant="body2" color="text.secondary">
                {position?.map(item => positionList.find(positionItem => positionItem.value === item.toString())?.label).join(', ')}
              </Typography>
            </Typography>
          {/* 컨텐츠 */}
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
              <Typography variant="h6">
                자기소개서
                <Typography variant="body2" color="text.secondary">
                  {essay !== undefined && essay?.length > 50 ? `${essay?.slice(0, 50)}...` : essay}
                </Typography>
              </Typography>
            </Collapse>
          </Grid>

          <Grid xsOffset={3} smOffset={0} mdOffset={0} xlOffset={0} xs={6} sm={2.5} md={2} xl={1.5} >
            {/* 증명사진 */}
            <Card sx={{width: 1, aspectRatio: 3/4, backgroundColor:'#8080801c', padding:fileUrl !== '' ? 1.5 : 1}}>
              <CardMedia
                component="img"
                image={fileUrl !== '' ? fileUrl : '/public/default_person.png'}
                alt="증명사진"
                sx={{
                  display: 'block',
                  height: '100%',
                  margin: 'auto'
                }}
              />
            </Card>
          </Grid>

        </Grid>
      </CardContent>


      {/* 확장 내용 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{px:5, pb:0}}>
          <Typography variant="h6">
            자기소개서
            <br />
            <br />
          </Typography>
          <Typography paragraph  whiteSpace="pre-wrap">
            {essay}
          </Typography>
        </CardContent>
      </Collapse>


      {/* 확장 로직 */}
      <StyledButton expanded={expanded} onClick={handleExpandClick} sx={{mt:2}} />
    </Card>
  );
}

