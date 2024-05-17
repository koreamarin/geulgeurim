import { useState, useCallback } from 'react';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link/Link';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetShareDetail } from 'src/api/community';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';

import PostCommentList from 'src/sections/blog/post-comment-list';

import { commentItem } from 'src/types/blog';

import PostCommentForm from '../../blog/post-comment-form';

// prettier-ignore
function createDummyData(
  boardId: number, userId: number, userNickname: string, userProfile: string, title: string, content: string, views:number, comment_count:number, created_at: Date, updated_at: Date, image: string ) {
  const createdAt = created_at.toLocaleDateString();
  const updatedAt = updated_at.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comment_count.toString();

  return { boardId, userId, userNickname, userProfile, title, content, hit, commentCnt, createdAt, updatedAt, image};
}
// prettier-ignore
const dummy = [
  createDummyData(1, 1, '김싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png' , '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 10, 5, new Date('2024-05-03'), new Date('2024-05-04'), 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png'),
  
  createDummyData(3, 2, '이싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '펜터치 조절이 어렵네요', '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 5, 2, new Date('2024-05-03'),  new Date('2024-05-04'), 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png'),
  
  createDummyData(4, 3, '박싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '쁘띠 그림체입니다.', '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 1, 0, new Date('2024-05-03'), new Date('2024-05-04'), 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png'),
  
  createDummyData(6, 4, '최싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '나보다 잘 그리는 사람?' , '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 200, 10, new Date('2024-05-03'), new Date('2024-05-04'), 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png'),
  
  createDummyData(21, 5, '정싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '침착맨 그림체 따라하기' , '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 13, 2, new Date('2024-05-03'), new Date('2024-05-04'), 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png'),
]
// ----------------------------------------------------------------------
type propType = {
  id: string;
};

export default function ShareDetailsView({ id }: propType) {
  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const { share, commentList, imageList, shareLoading, shareError } = useGetShareDetail(id);

  const [comments, setComments] = useState(commentList);
  
  const toProfile = () => {
    console.log(share.userId);
  };

  const addComment: (newCommentList: commentItem[]) => void = useCallback((newCommentList: commentItem[]) => {
    setComments(newCommentList);
  }, [setComments]);



  const renderError = (
    <EmptyContent
      filled
      title={`${shareError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.community.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = share && (
    <Stack
      sx={{
        maxWidth: 720,
        mx: 'auto',
        mt: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h4">{share.title}</Typography>

      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Link
          component={RouterLink}
          href=""
          // href={toProfile}
          onClick={toProfile}
        >
          <Avatar alt="123" src={share.userFileUrl} />
        </Link>
        <Typography ml={1} variant="subtitle1">
          {share.userNickname}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />

      <Stack sx={{ flexDirection: 'row', justifyContent: 'right', mb: 2 }}>
        <Typography variant="subtitle2">조회수 : {share.hit}</Typography>
      </Stack>

      {imageList?.map((img: { fileUrl: string | undefined }) => <img src={img.fileUrl} alt="" />)}
      <Markdown children={share.content} />

      <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
        <Typography variant="h4">Comments</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          ({comments?.length})
        </Typography>
      </Stack>

      <PostCommentForm id={id} type="share" addComment={addComment}/>

      <Divider sx={{ mt: 5, mb: 2 }} />

      <PostCommentList comments={comments} />
    </Stack>
  );

  return (
    <Container maxWidth={false}>
      {shareError && renderError}

      {share && renderPost}
    </Container>
  );
}
