import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { commentItem } from 'src/types/blog';

import PostCommentItem from './post-comment-item';

// ----------------------------------------------------------------------

type Props = {
  comments: commentItem[];
};

export default function PostCommentList({ comments }: Props) {
  return (
    <>
      <>
        {comments.map((comment) => {
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
