import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Radio, Button, Dialog, Container,
  TextField, Typography, RadioGroup, FormControl,
  DialogTitle, DialogActions, DialogContent, FormControlLabel, DialogContentText
} from '@mui/material';

import { CUSTOM_API } from 'src/config-global';

import ComponentBlock from 'src/sections/_examples/component-block';

type CrewDetail = {
  crew_id: number;
  user_id: number;
  project_name: string;
  content: string;
  created_at: string;
  updated_at: string;
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: string;
  images: string[];
};

type Props = {
  id: string;
};

export default function CrewApplyView({ id }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const crewDetails = location.state?.crewDetails as CrewDetail;
  const crewId = id;

  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!position || !message) {
      alert("포지션을 선택하고 메세지를 입력해주세요.");
      return;
    }
    const crewJoinRequest = {
      position,
      message,
    }
    axios
    .post(`/api/v1/community/crew/request/${crewId}`, crewJoinRequest, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
      baseURL: CUSTOM_API
    })
    .then((response) => {
      console.log(response);
      setOpenDialog(true);
    })
    .catch((error) => {
      alert('글 작성 중 오류가 발생했습니다.');
      console.log(error);
    });
  };

  const handleCloseDialog = () => {

    setOpenDialog(false);
    sendPushApply();
    navigate(`/community/crew/${crewId}`);  // 다시 크루 모집 상세페이지로
  };

  function  sendPushApply()  {

    console.log('crewDetails?.user_id =', crewDetails?.user_id.toString());
    const requestData = {
      'receiverId' : crewDetails?.user_id.toString(),
      'senderId' : localStorage.getItem('userId'),
      'favoriteJobs' : [],
      'domain' : 'CREW_REQUEST'
    };

    // console.log('fcmToken: ', fcmToken);
    // console.log('localStorage.getItem(\'accessToken\'): ', localStorage.getItem('accessToken'));
    axios
      .post('/api/v1/common/push/create', requestData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        baseURL: 'https://글그림.com',
        // baseURL: 'http://localhost:8081',
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log('크루 신청 알림 오류')
        console.log(error);
      });
  }

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        {crewDetails?.project_name} 크루 지원서
        {/* id(crew_id)에 대한 project_name 필요 */}
      </Typography>

      {/* 포지션 선택: 0이면 disable */}
      <ComponentBlock title="포지션">
        <FormControl component="fieldset">
          <RadioGroup
          row
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          >
            {crewDetails?.pen > 0 && (
              <FormControlLabel value="PEN" control={<Radio size="medium" />} label="선화" />
            )}
            {crewDetails?.color > 0 && (
              <FormControlLabel value="COLOR" control={<Radio size="medium" />} label="채색" />
            )}
            {crewDetails?.bg > 0 && (
              <FormControlLabel value="BG" control={<Radio size="medium" />} label="배경" />
            )}
            {crewDetails?.pd > 0 && (
              <FormControlLabel value="PD" control={<Radio size="medium" />} label="PD" />
            )}
            {crewDetails?.story > 0 && (
              <FormControlLabel value="STORY" control={<Radio size="medium" />} label="스토리" />
            )}
            {crewDetails?.conti > 0 && (
              <FormControlLabel value="CONTI" control={<Radio size="medium" />} label="콘티" />
            )}
          </RadioGroup>
        </FormControl>
      </ComponentBlock>


      {/* 메세지 쓰기 */}
      <TextField
        label="메세지 입력"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={handleInputChange}
        sx={{ my: 2 }}  // margin top and bottom for spacing
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mb: 2 }}
      >
        제출하기
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">제출 완료</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            제출이 완료되었습니다. 결과를 기다려주세요!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
