import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, Typography, FormControl, FormControlLabel,
  Radio, RadioGroup, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
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
  const crewId = crewDetails?.crew_id; 

  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!position || !message) {
      alert("Please select a position and enter a message.");
      return;
    }

    const payload = {
      user_id: 2,
      position,
      message
    };

    setOpenDialog(true);

    // try {
    //   const response = await fetch('http://localhost:8080/api/v1/community/crew/request/${crewId}', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload)
    //   });

    //   if (!response.ok) {
    //     throw new Error('에러가 발생했어요.');
    //   }

    //   const responseData = await response.json();
    //   console.log('Submit response:', responseData);
    //   setOpenDialog(true);
    // } catch (error) {
    //   console.error('Failed to submit:', error);
    // }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/community/crew/${crewDetails?.crew_id}`);  // 다시 크루 모집 상세페이지로
  };

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
