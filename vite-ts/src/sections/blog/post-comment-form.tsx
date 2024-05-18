import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type props = {
  id: string;
  type: string;
  addComment: any;
};

export default function PostCommentForm({ id, type, addComment }: props) {
  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
  });

  const defaultValues = {
    comment: '',
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (type === 'board') {
      const boardCommentWriteRequest = {
        boardId: id,
        content: data.comment,
      };
      try {
        await axios
          .post(`/api/v1/community/comment/${type}`, boardCommentWriteRequest, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            baseURL: 'https://글그림.com',
          })
          .then((response) => {
            const commentList = response.data;
            console.log("댓글 작성 후 리턴받음", response.data);
            if(commentList) {
              addComment(commentList);
            } else {
              console.log("왜안돼?")
            }
          })
          .catch((error) => {
            alert('댓글 작성 중 오류가 발생했습니다.');
            console.log(error);
          });
        reset();
      } catch (error) {
        console.error(error);
      }
    } else if (type === 'share') {
      const shareCommentWriteRequest = {
        shareId: id,
        content: data.comment,
      };
      try {
        await axios
          .post(`/api/v1/community/comment/${type}`, shareCommentWriteRequest, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            baseURL: 'https://글그림.com',
          })
          .then((response) => {
            const commentList = response.data;
            console.log(response.data);
            addComment(commentList);
          })
          .catch((error) => {
            alert('댓글 작성 중 오류가 발생했습니다.');
            console.log(error);
          });
        reset();
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField
          name="comment"
          placeholder="Write some of your comments..."
          multiline
          rows={4}
        />

        <Stack direction="row" justifyContent="right">
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post comment
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
