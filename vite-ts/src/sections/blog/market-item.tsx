import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { MarketMainItem } from 'src/types/blog';

// ----------------------------------------------------------------------

type marketProps = {
  market: MarketMainItem;
};

export default function PostItem(marketItem: marketProps) {
  const { market } = marketItem;
  const linkTo = paths.nft.detail(market.marketId);

  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log(market.sellerId);
  };

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            zIndex: 9,
            width: 88,
            height: 36,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Link
          component={RouterLink}
          href=""
          // href={toProfile}
          onClick={toProfile}
        >
          <Avatar
            alt="123"
            src={market.sellerProfile}
            sx={{
              left: 24,
              zIndex: 9,
              bottom: -24,
              position: 'absolute',
            }}
          />
        </Link>

        <Link component={RouterLink} href={linkTo}>
          <Image alt="123" src={market.marketThumbnail} ratio="4/3" />
        </Link>
      </Box>

      <MarketContent
        marketId={market.marketId}
        sellerId={market.sellerId}
        pieceId={market.pieceId}
        sellerNickname={market.sellerNickname}
        title={market.title}
        price={market.price}
        hit={market.hit}
        createdAt={market.createdAt}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type MarketContentProps = {
  marketId: number;
  sellerId: number;
  pieceId: number;
  sellerNickname: string;
  title: string;
  price: number;
  hit: string;
  createdAt: Date | string | number;

};

export function MarketContent({
                                marketId,
                                sellerId,
                                pieceId,
                                sellerNickname,
                                title,
                                price,
                                hit,
                                createdAt,
                              }: MarketContentProps) {

  const linkTo = paths.nft.detail(marketId);

  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log(sellerId);

  };

  return (
    <CardContent
      sx={{
        textAlign: 'left',
        pt: 4,
        width: 1,
      }}
    >
      <Stack
        spacing={0.5}
        direction="row"
        justifyContent="flex-start"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Link
            color="inherit"
            style={{ textDecoration: 'none' }}
            component={RouterLink}
            href=""
            // href={toProfile}
            onClick={toProfile}
          >
            <TextMaxLine variant="subtitle2" line={1} persistent>
              {sellerNickname}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>

      <Link color="inherit" component={RouterLink} href={linkTo}>
        <TextMaxLine mt={1} variant="subtitle1" line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="flex-start"
        sx={{
          mt: 3,
          typography: 'caption',
          color: 'text.disabled',
        }}
      >

        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(hit)}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
          pt: 1,
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: 'text.disabled',
          }}
        >
          {fDate(createdAt)}
        </Typography>
      </Stack>
    </CardContent>
  );
}
