import { useState } from 'react';

import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const StyledButton = styled((props: ButtonProps) => {
  const {...other} = props
  return <Button {...other} />
})(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: 'transparent',
  width: '100%',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#f4f4f4',
    // 이 부분에서 IconButton의 색상 변경
    '& button': {
      color: theme.palette.secondary.main,
    },
  },
}));

// ExpandMore 스타일링, 필요한 경우 기존 정의 유지
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  margin: '0 auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
  color: theme.palette.text.secondary, // 초기 색상 설정
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      {/* 헤더 */}
      <CardHeader
        title={resumeTitle}
        subheader={position}
      />
      {openStatus}
      {resumeId}

      {/* 내용 - media */}
      <Card sx={{height: 200, width: 150, backgroundColor:'#8080801c', padding:fileUrl !== '' ? 2 : 1.5}}>
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

      {/* 컨텐츠 */}
      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <Typography variant="body2" color="text.secondary">
          자기소개서 : {essay !== undefined && essay?.length > 50 ? `${essay?.slice(0, 50)}...` : essay}
        </Typography>
      </Collapse>


      {/* 확장 내용 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {essay}
          </Typography>
        </CardContent>
      </Collapse>


      {/* 확장 로직 */}
      <StyledButton onClick={handleExpandClick}>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </ExpandMore>
      </StyledButton>
    </Card>
  );
}

