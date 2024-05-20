import { m, AnimatePresence } from 'framer-motion';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deletePiece } from 'src/api/piece';

import getVariant from '../get-variant';

// ----------------------------------------------------------------------

type WorksDetailDeleteProps = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  selectVariant: string;
  deleteWorks: string
};

export default function WorksDetailDelete({
  open,
  onOpen,
  onClose,
  selectVariant,
  deleteWorks
}: WorksDetailDeleteProps) {
  const router = useRouter()
  const deleteWorksFunction = () => {
    console.log(deleteWorks, '번 작품삭제!')
    onClose()
    // 성공하면 list로 이동!
    deletePiece(parseInt(deleteWorks, 10))
    router.push(paths.mypage.works)
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
              삭제하면 작품을 되돌릴 수 없습니다.<br/>
              정말로 삭제하시겠습니까?
            </DialogContent>

            <DialogActions>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color='success' size="medium" onClick={onClose}>취소하기</Button>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={deleteWorksFunction} autoFocus>
                삭제하기
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
