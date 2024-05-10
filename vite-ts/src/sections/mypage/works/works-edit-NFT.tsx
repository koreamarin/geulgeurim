import { m, AnimatePresence } from 'framer-motion';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Image from 'src/components/image';

import getVariant from '../get-variant';

type Props = {
    open: boolean
    onClose: VoidFunction
    worksId?: number
    fileUrl?: string
}


export default function NFTRegistrationModal({ open, onClose, worksId, fileUrl }: Props) {
  const nftSubmit = () => {
    // api 로직
    console.log('이미지 저장')
    console.log('nft 등록')
    // 성공시
    // 1차로 NFT 수정사항에 대해 저장시켜야함 => image와 nft
    // 세부사항 mutate로 update시켜야함
    onClose()
  }
  return (

    <AnimatePresence>
    {open && (
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        PaperComponent={(props: PaperProps) => (
          <m.div {...getVariant('slideInUp')}>
            <Paper {...props} style={{ width: 'auto', maxWidth: 'none' }}>{props.children}</Paper>
          </m.div>
        )}
      >
        <DialogTitle id="alert-dialog-title">NFT 등록{worksId}</DialogTitle>

        <DialogContent>
          <Image alt="이미지" src={fileUrl} sx={{ borderRadius: 2 }} />
        </DialogContent>

        <DialogActions>
          <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color='error' size="medium" onClick={onClose}>
            취소하기
          </Button>

          <Tooltip title="NFT 등록 시 작품을 수정할 수 없습니다">
            <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium" onClick={nftSubmit} autoFocus>
              등록하기
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    )}
  </AnimatePresence>
  );
}
