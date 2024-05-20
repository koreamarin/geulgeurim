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

import { Upload } from 'src/components/upload';

type Props = {
  id?: number;
};

export default function CrewApplyView({ id }: Props) {
  const router = useRouter();
  const formData = new FormData();
  const preview = useBoolean();

  const [projectName, setProjectName] = useState('');
  const [content, setContent] = useState('');
  const [positions, setPositions] = useState({
    선화: 0, // 선화
    채색: 0, // 채색
    배경: 0, // 배경
    PD: 0, // PD
    스토리: 0, // 스토리
    콘티: 0, // 콘티
  });
  const [files, setFiles] = useState<(File | string)[]>([]);

  const handleChange =
    (prop: keyof typeof positions) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setPositions({ ...positions, [prop]: numValue });
    };

  const handleSubmit = () => {
    console.log('ProjectName:', projectName);
    console.log('Description:', content);
    console.log('Files:', files);
    console.log('Positions:', positions);
    const crewBoardRequest = {
      projectName,
      content,
      "pen": positions.선화,
      "color":positions.채색,
      "bg":positions.배경,
      "pd":positions.PD,
      "story":positions.스토리,
      "conti":positions.콘티,
      "status": "INPROGRESS",
    };
    console.log("request", crewBoardRequest);
    Object.values(files).forEach((file) => formData.append('files', file));
    formData.append(
      'crewBoardRequest',
      new Blob([JSON.stringify(crewBoardRequest)], {
        type: 'application/json',
      })
    );
    axios
      .post('/api/v1/community/crew', formData, {
        headers: {
          'Content-Type': `multipart/form-data; `,
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        baseURL: 'https://글그림.com',
        // baseURL: 'http://localhost:8080',
      })
      .then((response) => {
        const crewId = response.data;
        console.log(response.data);
        router.push(paths.community.crew.detail(crewId));
      })
      .catch((error) => {
        alert('글 작성 중 오류가 발생했습니다.');
        console.log("error", error);
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
    <Container>
      <Typography variant="h3">크루 모집하기 {id}</Typography>
      <TextField
        sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
        label="제목"
        variant="outlined"
        fullWidth
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Position Fields in a single row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          {Object.keys(positions).map((key) => (
            <TextField
              key={key}
              type="number"
              label={key}
              variant="outlined"
              sx={{ width: '16%' }} // Adjusts width to fit all fields in a single row
              value={positions[key as keyof typeof positions]}
              onChange={handleChange(key as keyof typeof positions)}
              inputProps={{ min: 0 }} // Prevents negative numbers
            />
          ))}
        </Box>

        <TextField
          label="설명"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
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

    </Container>
  );
}
