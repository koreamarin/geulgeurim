import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
    open: boolean
    onClose: VoidFunction
}


export default function NFTRegistrationModal({ open, onClose }: Props) {
    console.log('alksdfslfk')
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>NFT 등록</DialogTitle>
      <DialogContent>
        <Typography>NFT 등록칸</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => {
          console.log("NFT 등록!");
          onClose(); 
        }}>등록</Button>
      </DialogActions>
    </Dialog>
  );
}
