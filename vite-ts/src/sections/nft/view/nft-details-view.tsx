import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type Props = {
  id: string;
};

export default function NFTDetailsView({ id }: Props) {
  return (
    <Container>
      <Box>
        <header>NFT 상세정보</header>
        상세정보{id}
      </Box>
    </Container>
  );
}
