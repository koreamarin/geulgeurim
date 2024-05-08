import React, { useState } from 'react';
import {
  Container, Typography, FormControl, FormControlLabel,
  Radio, RadioGroup,
  TextField,
  Button
} from '@mui/material';
import { useLocation } from 'react-router-dom';
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
  const [message, setMessage] = useState('');
  const location = useLocation();
  const crewDetails = location.state?.crewDetails as CrewDetail;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // 백엔드로 {
//     "user_id": 2,
//     "position": "CONTI",
//     "message": "저는 완벽하기 때문에 팀에 기여할 것이라 자신합니다! 데헿"
// } 이런 식으로 데이터 보내야 함. 
    console.log('Submitted message:', message);
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
          <RadioGroup row>
            {crewDetails?.pen > 0 && (
              <FormControlLabel value="pen" control={<Radio size="medium" />} label="선화" />
            )}
            {crewDetails?.color > 0 && (
              <FormControlLabel value="color" control={<Radio size="medium" />} label="채색" />
            )}
            {crewDetails?.bg > 0 && (
              <FormControlLabel value="bg" control={<Radio size="medium" />} label="배경" />
            )}
            {crewDetails?.pd > 0 && (
              <FormControlLabel value="pd" control={<Radio size="medium" />} label="PD" />
            )}
            {crewDetails?.story > 0 && (
              <FormControlLabel value="story" control={<Radio size="medium" />} label="스토리" />
            )}
            {crewDetails?.conti > 0 && (
              <FormControlLabel value="conti" control={<Radio size="medium" />} label="콘티" />
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
    </Container>
  );
}
