import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  showLogoPreview?: boolean; // 새 props 추가
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, showLogoPreview = true, sx, ...other }, ref) => {

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Stack direction='row'>
        <Box
          component="img"
          src="/logo/logo_single.svg"
          sx={{ width: 40, height: 40, marginY:1, cursor: 'pointer', ...sx }}
        />
        {showLogoPreview && (
          <Box
            component="img"
            src="/logo-preview.png"
            sx={{ marginLeft:2, height: 45, cursor: 'pointer', ...sx }}
          />
        )}
      </Stack>
    );


    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
