import { useState, useCallback, useEffect } from 'react';

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

// ----------------------------------------------------------------------
type propType = {
  id: string;
};

export default function ShareDetailsView({ id }: propType) {
  // 작성자 프로필로 이동
  // const toProfile = paths.mypage.root;
  const { share, commentList, imageList, shareError } = useGetShareDetail(id);

  const [comments, setComments] = useState(commentList || []);
  
  const toProfile = () => {
    console.log(share.userId);
  };

  useEffect(()=>{
    if (commentList) {
      setComments(commentList);
    }
  }, [commentList])

  const addComment = useCallback((newCommentList: commentItem[]) => {
    if(newCommentList){
      setComments(newCommentList);
      // console.log("Success?", comments);
    }
  }, []);



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
