import {
  Box,
  Card,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Switch,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { Upload } from 'src/components/upload';


export default function PortfolioWriteView() {
  const preview = useBoolean();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<(File | string)[]>([]);

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

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Files:', files);
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };


  return (
    <Container>
    <Typography variant="h3">포트폴리오 추가</Typography>
    <TextField
      sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      label="제목"
      variant="outlined"
      fullWidth
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

      <TextField
        label="설명"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
              onUpload={() => console.info('ON UPLOAD')}
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
    </Box>
  </Container>
  )


}
