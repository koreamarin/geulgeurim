import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type Props = {
  id: string;
};

export default function CrewApplyView({ id }: Props) {
  return (
    <Container>
      <Box>크루 모집하기 {id}</Box>
    </Container>
  );
}
