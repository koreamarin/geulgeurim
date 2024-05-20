import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { paths } from 'src/routes/paths';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import LoginButton from '../common/login-button';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/nav-account-popover';
import NotificationsPopover from '../common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(-1);

  const token = localStorage.getItem('accessToken');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...{
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          },
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
          >
            <Logo />
          </Badge>
          <Box sx={{ flexGrow: 0.1 }} />
          {mdUp && <NavDesktop data={navConfig} />}
          <Box sx={{ flexGrow: 0.9 }} />
          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {mdUp && (
              <SettingsButton
                sx={{
                  ml: { xs: 1, md: 0 },
                  mr: { md: 2 },
                }}
              />
            )}
            {token && mdUp && <NotificationsPopover />}

            {!token && mdUp && (
              <Button
                variant="contained"
                rel="noopener"
                href={paths.auth.jwt.register}
              >
                회원가입
              </Button>
            )}

            {!token && <LoginButton />}

            {token && (
              <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
                <AccountPopover />
              </Stack>
            )}

            {token && !mdUp && <NotificationsPopover />}
            {!mdUp && (
              <SettingsButton
                sx={{
                  ml: { xs: 1, md: 0 },
                  mr: { md: 2 },
                }}
              />
            )}

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>
      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
