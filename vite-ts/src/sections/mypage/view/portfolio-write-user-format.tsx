import { useState, useCallback, useRef} from 'react';

import {
  Box, Card, Stack, Button, Switch,
  Dialog, Container, TextField, Typography, CardHeader, CardContent,
  DialogTitle, DialogActions, DialogContent, FormControlLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { createUserFormat, useGetPortfolios } from 'src/api/portfolio';

import { Upload } from 'src/components/upload';


export default function PortfolioWriteUserFormatView() {
  const preview = useBoolean();
  const router = useRouter()
  const filesToUpload = useRef<any[]>([])
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { portfoliosMutate } = useGetPortfolios();

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = async () => {
    setFiles([]);
  };

  const handleSubmit = async () => {

    const formData = new FormData();

    const portfolioRequest = {
      "pofol_name": title,
      "status": "PUBLIC"
    }

    formData.append("portfolioRequest", new Blob([JSON.stringify(portfolioRequest)], {
        type: "application/json"
    }));

    files.forEach(file => {
      if (file instanceof File) {
        formData.append('files', file, file.name);
      }
    });

    await createUserFormat(formData)
    await portfoliosMutate()

    router.push(paths.mypage.portfolio)
  };


  const handleCancel = () => {
    setOpenDialog(true);
  };

  const handleClose = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      router.push(paths.mypage.portfolio);
    }
  };


  return (
    <Container>
    <Typography variant="h3">포트폴리오 추가 (사용자 포맷)</Typography>
    <TextField
      sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      label="제목"
      variant="outlined"
      fullWidth
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

    <Stack spacing={5}>
      <Card>
        <CardHeader
          title="이미지 업로드"
          action={
            <FormControlLabel
              control={<Switch checked={preview.value} onClick={preview.onToggle} />}
              label="Show Thumbnail"
            />
          }
        />
        <CardContent>
          <Upload
            multiple
            thumbnail={preview.value}
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => {
              filesToUpload.current = files
              console.log('확인', filesToUpload.current)
            }}
          />
        </CardContent>
      </Card>
    </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button>
      </Box>
        <Dialog
        open={openDialog}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">포트폴리오 생성을 중단할까요?</DialogTitle>
        <DialogContent>
          포트폴리오 생성 과정을 취소하시면 지금까지의 변경사항이 저장되지 않습니다.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary">
            네
          </Button>
          <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            아니요, 계속 만들래요
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Container>
  )


}
