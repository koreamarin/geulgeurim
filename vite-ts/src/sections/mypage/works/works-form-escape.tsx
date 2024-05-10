import { m, AnimatePresence } from 'framer-motion';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';

import getVariant from '../get-variant';

// ----------------------------------------------------------------------

type WorksFormEscapeProps = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onMove: VoidFunction
  selectVariant: string;
};

export default function WorksFormEscape({
  open,
  onOpen,
  onClose,
  onMove,
  selectVariant,
  ...other
}: WorksFormEscapeProps) {
  return (
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
            <DialogTitle id="alert-dialog-title">변경사항이 저장되지 않았습니다</DialogTitle>

            <DialogContent>
              이 페이지를 벗어나면 작성된 내용이 저장되지 않을 수 있습니다.<br/>
              페이지를 벗어나시겠습니까?
            </DialogContent>

            <DialogActions>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color='success' size="medium" onClick={onClose}>
                취소하기
              </Button>
              <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={onMove} autoFocus>
                벗어나기
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
  );
}
