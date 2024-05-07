import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ComponentBlock from 'src/sections/_examples/component-block';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

type Props = {
  id: string;
};

export default function CrewApplyView({ id }: Props) {
  return (
    <Container>
      <Box>{id} 크루 지원서</Box>
      {/* 포지션 선택: 0이면 disable */}
      <ComponentBlock title="포지션">
      <FormControl component="fieldset">
            <RadioGroup row defaultValue="pen">
              <FormControlLabel value="pen" control={<Radio size="medium" />} label="선화" />
              <FormControlLabel value="color" control={<Radio size="medium" />} label="채색" />
              <FormControlLabel value="bg" control={<Radio size="medium" />} label="배경" />
              <FormControlLabel value="pd" control={<Radio size="medium" />} label="PD" />
              <FormControlLabel value="story" control={<Radio size="medium" />} label="스토리" />
              <FormControlLabel value="conti" control={<Radio size="medium" />} label="콘티" />
            </RadioGroup>
            </FormControl>
          </ComponentBlock>

      {/* 메세지 쓰기 */}


    </Container>
  );
}
