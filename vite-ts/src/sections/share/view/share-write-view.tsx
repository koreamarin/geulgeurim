import axios from 'axios';
import { useState, useCallback } from 'react';

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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { CUSTOM_API } from 'src/config-global';

import { Upload } from 'src/components/upload';

type Props = {
  id?: number;
};

export default function BoardWriteView({ id }: Props) {
  const formData = new FormData();
  const router = useRouter();

  const preview = useBoolean();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<(File | string)[]>([]);
  
  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Files:', files);
    const shareWriteRequest = {
      title,
      content,
    };
    Object.values(files).forEach((file) => formData.append('files', file));
    formData.append(
      'shareWriteRequest',
      new Blob([JSON.stringify(shareWriteRequest)], {
        type: 'application/json',
      })
    );
    axios
      .post('/api/v1/community/share', formData, {
        headers: {
          'Content-Type': `multipart/form-data; `,
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        baseURL: CUSTOM_API,
      })
      .then((response) => {
        const share  = response.data;
        console.log(share);
        router.push(paths.community.share.detail(share.shareId));
      })
      .catch((error) => {
        alert('글 작성 중 오류가 발생했습니다.');
        console.log(error);
      });
  };

  const handleCancel = () => {
    console.log('Cancelled');
    router.back();

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
