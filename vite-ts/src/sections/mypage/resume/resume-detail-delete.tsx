import { m, AnimatePresence } from 'framer-motion';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deleteResumeId } from 'src/api/mypageResume';

import { useSnackbar } from 'src/components/snackbar';

import getVariant from '../get-variant';

// ----------------------------------------------------------------------

type ResumeDetailDeleteProps = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  selectVariant: string;
  deleteResume: string
};

export default function ResumeDetailDelete({
  open,
  onOpen,
  onClose,
  selectVariant,
  deleteResume
}: ResumeDetailDeleteProps) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const deleteResumeFunction = async () => {
    console.log(deleteResume, '번 이력서 삭제!')
    const result = await deleteResumeId(parseInt(deleteResume, 10))
    if (result) {
      enqueueSnackbar('이력서 삭제 성공!');
      onClose()
      // 성공하면 list로 이동!
      router.push(paths.mypage.resume)
    }
    else {
      enqueueSnackbar('이력서 삭제 실패!', { variant: 'error' });
    }
  }
  return (
    <>
      <Button  style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={onOpen}>
        삭제하기
      </Button>

      <AnimatePresence>
        {open && (
          <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            PaperComponent={(props: PaperProps) => (
              <m.div {...getVariant(selectVariant)}>
                <Paper {...props} style={{ width: 'auto', maxWidth: 'none' }}>{props.children}</Paper>
              </m.div>
            )}
          >
            <DialogTitle id="alert-dialog-title">정말로 삭제하시겠습니까?</DialogTitle>

            <DialogContent>
              삭제하면 이력서를 되돌릴 수 없습니다.<br/>
              정말로 삭제하시겠습니까?
            </DialogContent>

            <DialogActions>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color='success' size="medium" onClick={onClose}>취소하기</Button>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={deleteResumeFunction} autoFocus>
                삭제하기
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
