import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const checkUser = localStorage.getItem('userType') === 'INDIVIDUAL'

const OPTIONS = [
  {
    label: '메인화면',
    linkTo: '/',
  },
  {
    label: '마이페이지',
    linkTo: checkUser ? paths.mypage.root : paths.company.root,
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = () => {
    try {
      localStorage.clear()
      popover.onClose();
      router.replace('/');
    } catch (error) {
      enqueueSnackbar('로그아웃에 실패했습니다', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  const imgUrl = localStorage.getItem('profile')

  return (
    <>
      <Button onClick={popover.onOpen} component={m.button} whileTap="tap" whileHover="hover">
        <Icon
          sx={{
            width: 40,
            height: 40,
            marginRight: 1,
          }}
        >
          <Avatar
            src={imgUrl || '/no_profile.jpg'}
            alt='아바타'
            sx={{
              width: 40,
              height: 40,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {localStorage.getItem('nickname')?.charAt(0).toUpperCase()}
          </Avatar>
        </Icon>
        {mdUp &&`${localStorage.getItem('nickname')} 님`}
      </Button>
      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {localStorage.getItem('nickname')} 님
          </Typography>

        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          로그아웃
        </MenuItem>
      </CustomPopover>
    </>
  );
}
