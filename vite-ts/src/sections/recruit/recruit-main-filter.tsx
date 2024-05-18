import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useRecruitFilterStore } from 'src/store/RecruitFilterStore';

import { CloseIcon } from 'src/components/lightbox';

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

export function RecruitMainFilter() {
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
    ChangePositionIds(positionIds.filter(positionId => positionId !== id));
  };

  const handleRemoveExperience = (value: string) => {
    ChangeExperienceTypes(experienceTypes.filter(expType => expType !== value));
  };

  const handleRemoveCloseType = (id: string) => {
    ChangeCloseTypes(closeTypes.filter(closeTypeId => closeTypeId !== id));
  };

  return (
    <div>
      <Grid container spacing={2} xs={12}>
        <Grid xs={4}>
          <FormControl fullWidth margin="normal">
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

        <Grid xs={4}>
          <FormControl fullWidth margin="normal">
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

        <Grid xs={4}>
          <FormControl fullWidth margin="normal">
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
      </Grid>

      <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
        {positionIds.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {positionIds.sort().map((id) => (
              <Chip
                key={id}
                label={positions.find((p) => p.value === id)?.label}
                onDelete={() => handleRemovePosition(id)}
                deleteIcon={<CloseIcon />}
                sx={{ backgroundColor: 'balck', color: 'white' }}
              />
            ))}
          </Box>
        )}

        {experienceTypes.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {experienceTypes.sort().map((value) => (
              <Chip
                key={value}
                label={experiences.find((e) => e.value === value)?.label}
                onDelete={() => handleRemoveExperience(value)}
                deleteIcon={<CloseIcon />}
                sx={{ backgroundColor: 'lightgreen', color: 'black' }}
              />
            ))}
          </Box>
        )}

        {closeTypes.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {closeTypes.sort().map((id) => (
              <Chip
                key={id}
                label={closeTypesd.find((c) => c.value === id)?.label}
                onDelete={() => handleRemoveCloseType(id)}
                deleteIcon={<CloseIcon />}
                sx={{ backgroundColor: 'lightcoral', color: 'black' }}
              />
            ))}
          </Box>
        )}
      </Box>

      <Button onClick={ResetFilter} variant="outlined" color="secondary" sx={{ mt: 2 }}>
        Reset Filters
      </Button>
    </div>
  );
}
