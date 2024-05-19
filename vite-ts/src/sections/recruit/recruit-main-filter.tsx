import { useRef } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useRecruitFilterStore } from 'src/store/RecruitFilterStore';

import Iconify from 'src/components/iconify';

const positions = [
  { value: 1, label: '선화' },
  { value: 2, label: '밑색' },
  { value: 3, label: '명암' },
  { value: 4, label: '후보정' },
  { value: 5, label: '작화' },
  { value: 6, label: '어시' },
  { value: 7, label: '각색' },
  { value: 8, label: '콘티' },
  { value: 9, label: '표지' },
  { value: 10, label: '삽화' },
  { value: 11, label: '배경' },
  { value: 12, label: '채색' },
  { value: 13, label: '편집' },
  { value: 14, label: '작가' },
  { value: 15, label: '공고확인' }
];

const experiences = [
  { value: '신입', label: '신입' },
  { value: '경력', label: '경력' },
  { value: '신입_경력', label: '신입_경력' },
  { value: '경력무관', label: '경력무관' }
];

const closeTypesd = [
  { value: '접수마감일', label: '접수마감일' },
  { value: '채용시', label: '채용시' },
  { value: '상시', label: '상시' },
  { value: '수시', label: '수시' }
];

export default function RecruitMainFilter() {
  const { positionIds, experienceTypes, closeTypes, ChangePositionIds, ChangeExperienceTypes, ChangeCloseTypes, ResetFilter } = useRecruitFilterStore();

  const handlePositionChange = (event: SelectChangeEvent<number[]>) => {
    ChangePositionIds(event.target.value as number[]);
  };

  const handleExperienceChange = (event: SelectChangeEvent<string[]>) => {
    ChangeExperienceTypes(event.target.value as string[]);
  };

  const handleCloseTypeChange = (event: SelectChangeEvent<string[]>) => {
    ChangeCloseTypes(event.target.value as string[]);
  };

  const handleRemovePosition = (id: number) => {
    ChangePositionIds(positionIds.filter((positionId: number) => positionId !== id));
  };

  const handleRemoveExperience = (value: string) => {
    ChangeExperienceTypes(experienceTypes.filter((expType: string) => expType !== value));
  };

  const handleRemoveCloseType = (id: string) => {
    ChangeCloseTypes(closeTypes.filter((closeTypeId: string) => closeTypeId !== id));
  };

  const changeSearchRef = useRef<string>('')

  const querySearch = useRef<string>('')

  const handleClick = async  () => {
    querySearch.current = changeSearchRef.current
    // api 연동
    // await resumesMutate()
  };

  // 검색 입력 후 enter
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={4} sm={2.5} md={2}>
          <FormControl fullWidth>
            <InputLabel id="position" shrink={false}>직군</InputLabel>
            <Select
              labelId="position"
              multiple
              value={positionIds}
              onChange={handlePositionChange}
              renderValue={() => null}
            >
              {positions.map((position) => (
                <MenuItem key={position.value} value={position.value}>
                  <Checkbox checked={positionIds.indexOf(position.value) > -1} />
                  <ListItemText primary={position.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={4} sm={2.5} md={2}>
          <FormControl fullWidth>
            <InputLabel id="experience" shrink={false}>경력</InputLabel>
            <Select
              labelId="experience"
              multiple
              value={experienceTypes}
              onChange={handleExperienceChange}
              renderValue={() => null}
            >
              {experiences.map((experience) => (
                <MenuItem key={experience.value} value={experience.value}>
                  <Checkbox checked={experienceTypes.indexOf(experience.value) > -1} />
                  <ListItemText primary={experience.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={4} sm={2.5} md={2}>
          <FormControl fullWidth>
            <InputLabel id="close" shrink={false}>마감방식</InputLabel>
            <Select
              labelId="close"
              multiple
              value={closeTypes}
              onChange={handleCloseTypeChange}
              renderValue={() => null}
            >
              {closeTypesd.map((closeType) => (
                <MenuItem key={closeType.value} value={closeType.value}>
                  <Checkbox checked={closeTypes.indexOf(closeType.value) > -1} />
                  <ListItemText primary={closeType.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* 검색 */}
        <Grid xs={12} sm={4.5} md={6}>
          <TextField
              placeholder="검색"
              onKeyUp={handleKeyUp}
              sx={{ width:'100%' }}
              onChange={(event) => {changeSearchRef.current = event.target.value}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} onClick={handleClick} />
                  </InputAdornment>
                )
              }}
          />
        </Grid>

        {/* 선택 인자들 */}
        {(!!positionIds.length || !!experienceTypes.length || !!closeTypes.length) &&
          (
            <>
              <Grid xl={11.5} lg={11.4} md={11.3} sm={11.2} xs={10.8}>
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {positionIds.length > 0 && (
                    positionIds.sort((a: number, b: number) => positions.findIndex(p => p.value === a) - positions.findIndex(p => p.value === b)).map((id) => (
                      <Chip
                        key={id}
                        label={positions.find((p) => p.value === id)?.label}
                        onClick={() => handleRemovePosition(id)}
                        sx={{ backgroundColor: 'black', color: '#e8e8e8' }}
                      />
                    ))
                  )}

                  {experienceTypes.length > 0 && (
                    experienceTypes.sort((a: string, b: string) => experiences.findIndex(e => e.value === a) - experiences.findIndex(e => e.value === b)).map((value) => (
                      <Chip
                        key={value}
                        label={experiences.find((e) => e.value === value)?.label}
                        onClick={() => handleRemoveExperience(value)}
                        sx={{ backgroundColor: '#000000ab', color: '#ffffff' }}
                      />
                    ))
                  )}

                  {closeTypes.length > 0 && (
                    closeTypes.sort((a: string, b: string) => closeTypesd.findIndex(c => c.value === a) - closeTypesd.findIndex(c => c.value === b)).map((id) => (
                      <Chip
                        key={id}
                        label={closeTypesd.find((c) => c.value === id)?.label}
                        onClick={() => handleRemoveCloseType(id)}
                        sx={{ backgroundColor: '#a6a6a6', color: '#ffffff' }}
                      />
                    ))
                  )}
                </Box>
              </Grid>
              <Grid xl={0.5} lg={0.6} md={0.7} sm={0.8} xs={1.2} sx={{ display: 'flex', alignItems: 'start' }}>
                <IconButton onClick={ResetFilter} sx={{ width: '100%', padding:0.2, aspectRatio:1}}>
                  <Iconify icon="solar:restart-bold" width="100%" />
                </IconButton>
              </Grid>
            </>
          )
        }
      </Grid>
    </div>
  )
}
