import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SortingSelectingTable from './recruit-apply-resume-table';

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
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px'
        }}
      >
        <Typography id="apply-modal-title" variant="h4" component="h2" mb={4} textAlign='center'>
          내 이력서 선택하기
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button onClick={handleClose} variant="contained">
            이력서 추가하기
          </Button>
        </Box>
        <SortingSelectingTable/>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose} variant="contained">
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
