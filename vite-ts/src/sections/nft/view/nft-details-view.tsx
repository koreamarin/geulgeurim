import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link/Link';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Avatar, Grid } from '@mui/material';
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import { AvatarShape } from 'src/assets/illustrations';

import { useGetPost } from 'src/api/blog';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';

import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';

// prettier-ignore
function createDummyData(
  marketId: number, sellerId: number, sellerProfile: string, sellerNickname: string, sellerThumbnail: string, pieceImg: string, pieceTitle: string, pieceContent: string, title: string, content: string, price: number, created_at: Date, views: number) {
  const createdAt = created_at.toLocaleDateString();
  const hit = views.toString();

  return {
    marketId,
    sellerId,
    sellerProfile,
    sellerNickname,
    sellerThumbnail,
    pieceImg,
    pieceTitle,
    pieceContent,
    title,
    content,
    price,
    createdAt,
    hit,
  };
}

// prettier-ignore
const dummy = [
  createDummyData(1, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(2, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(3, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(4, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(5, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(6, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(7, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(8, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

  createDummyData(9, 1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '닉넴닉넴', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/Untitled%20%282%29.png', '작품 제목입니다', '작품 내용입니다', '지갑열어sdflkdsjflsdfkskjfgsdlfkdjfladjkfldakfjalfjfaljf', '응애응애', 0.0002, new Date('2024-05-14'), 10),

];

type MarketDetail = {
  marketId: number;
  sellerId: number;
  sellerProfile: string;
  sellerNickname: string;
  sellerThumbnail: string;
  pieceImg: string;
  pieceTitle: string;
  pieceContent: string;
  title: string;
  content: string;
  price: number;
  hit: string;
  createdAt: Date | string | number;
};

type Props = {
  id: string;
};

export default function PostDetailsView({ id }: Props) {
  console.log('marketId: ', id);

  const navigate = useNavigate();
  const [marketDetails, setMarketDetails] = useState<MarketDetail | undefined>();

  useEffect(() => {
    console.log('Checking id:', id);
    console.log('Dummy Data:', dummy);
    // Simulate fetching data
    const foundData = dummy.find(item => item.marketId === parseInt(id, 10));
    console.log('Found Data:', foundData);
    setMarketDetails(foundData);
  }, [id]);

  const handleApplyClick = () => {
    // navigate(`/nft/${}`, { state: { marketDetails } });
    // 블록체인의 스마트 컨트랙트 부분 시작
  };

  const ProductImage = styled('img')({
    width: '90%',
    height: '90%',
    objectFit: 'cover',
  });

  if (!marketDetails) return <div>마켓 상세정보 가져오는 중...</div>;

  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const toProfile = () => {
    console.log(marketDetails.sellerId);
  };

  return (
    <Container>

      <Grid item xs={12} sx={{ mt: 5 }}>
        <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Card sx={{
            width: '50%', // Make the Card take full width of the Grid item
            minHeight: 500, // Set a fixed height, or use min/max height as needed
            boxShadow: 3, // Optional: add shadow for better visibility
          }}>

            <Stack spacing={2} paddingLeft={2} sx={{ textAlign: 'left', display: 'flex' }}>
              <ProductImage src={marketDetails.pieceImg} alt={marketDetails.pieceTitle} />
              <Typography variant="h6" component="div">
                {marketDetails.pieceTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {marketDetails.pieceContent}
              </Typography>

            </Stack>
          </Card>

          <Card sx={{
            width: '100%', // Adjust to make the Card take full width of the parent container
            maxWidth: 300,
            boxShadow: 3, // Optional: add shadow for better visibility
            alignItems: 'center',  // Centers content horizontally
            display: 'flex',
            flexDirection: 'column', // Ensure content is arranged vertically
            wordBreak: 'break-all',

          }}>

            <Stack spacing={2} sx={{ p: 2, flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {marketDetails.title}
              </Typography>
              <Typography variant="body2">
                {marketDetails.content}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <Link
                  component={RouterLink}
                  href=""
                  onClick={toProfile}
                  sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
                >
                  <Avatar
                    alt="유저이미지"
                    src={marketDetails.sellerProfile}
                    sx={{
                      zIndex: 9,
                    }}
                  />
                </Link>
                <Typography variant="subtitle2" color="text.secondary">
                  {marketDetails.sellerNickname}
                </Typography>

              </Box>

              <Button variant="contained" fullWidth sx={{ mt: 'auto' }}>
                구매하기
              </Button>
            </Stack>
          </Card>
        </Box>

      </Grid>

    </Container>

  );
}
