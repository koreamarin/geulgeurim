import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { commentItem } from 'src/types/blog';

import PostCommentItem from './post-comment-item';

// ----------------------------------------------------------------------

type Props = {
  comments: commentItem[];
};

export default function PostCommentList({ comments }: Props) {

  useEffect(() => {
    console.log("재렌더링", comments);
  }, [comments])
  return (
    <>
      <>
        {comments?.map((comment: { boardCommentId: any; userId: any; userNickname: any; userFileUrl: any; content: any; createdAt: any; updatedAt: any; }) => {
          const {
            boardCommentId,
            userId,
            userNickname,
            userFileUrl,
            content,
            createdAt,
            updatedAt,
          } = comment;

          return (
            <Box key={boardCommentId}>
              <PostCommentItem
                userNickname={userNickname}
                userFileUrl={userFileUrl}
                content={content}
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
            </Box>
          );
        })}
      </>

      <Pagination count={1} sx={{ my: 5, mx: 'auto' }} />
    </>
  );
}
