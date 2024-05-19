import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const nickName = localStorage.getItem('nickname')
  const imageUrl = localStorage.getItem('profile')
  const userType = localStorage.getItem('userType')
  

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={imageUrl || '/no_profile.jpg'} alt='이미지' sx={{ width: 100, height: 100 }}>
            {nickName}
          </Avatar>

        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="h4" noWrap>
            {nickName}님
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {userType==='INDIVIDUAL' ? '일반유저' : '기업유저'}
          </Typography>

        </Stack>

      </Stack>
    </Stack>
  );
}
