import Box from '@mui/material/Box';

import Image from '../image';

// ----------------------------------------------------------------------

type Props = {
  imgUrl?: string;
};

export default function SingleFilePreview({ imgUrl = '' }: Props) {
  return (
    <Box
      sx={{
        p: 2,
        width: 1,
        height: 1,
      }}
    >
      <Image
        alt="file preview"
        src={imgUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
