import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Stack,
  Button,
  Switch,
  Container,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Upload } from 'src/components/upload';

type Props = {
  id?: number;
};

export default function BoardWriteView({ id }: Props) {
  const preview = useBoolean();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<(File | string)[]>([]);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Files:', files);
    navigate('/community/crew');
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

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

  return (
    <Container sx={{ p: 3 }}>
      <Box
        sx={{ borderBottom: '3px solid black', marginLeft: 15, marginRight: 15, marginBottom: 3 }}
      >
        <Typography variant="h3" component="div" sx={{ color: 'black', ml: 3, mb: 1, mt: 0 }}>
          그림 공유 게시판
        </Typography>
      </Box>
      <Box sx={{ marginLeft: 15, marginRight: 15, marginBottom: 3 }}>
        <TextField
          sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Position Fields in a single row */}

          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
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
      </Box>
    </Container>
  );
}
