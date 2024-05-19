import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ApplyModalProps = {
  open: boolean;
  handleClose: () => void;
};

export function RecruitApply({ open, handleClose }: ApplyModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="apply-modal-title"
      aria-describedby="apply-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="apply-modal-title" variant="h6" component="h2">
          지원하기
        </Typography>
        <Typography id="apply-modal-description" sx={{ mt: 2 }}>
          지원 내용을 여기에 작성하세요.
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
          닫기
        </Button>
      </Box>
    </Modal>
  );
}
