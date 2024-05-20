import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Breakpoint } from '@mui/material/styles';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export type Query = 'up' | 'down' | 'between' | 'only';

export type Value = Breakpoint | number;


// 반응형을 위한 hook으로 주어진 Query에 따라 미디어쿼리를 생성, 그 결과를 boolean으로 도출
export function useResponsive(query: Query, start?: Value, end?: Value): ReturnType {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start as Value));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start as Value));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start as Value, end as Value));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

type BreakpointOrNull = Breakpoint | null;

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
