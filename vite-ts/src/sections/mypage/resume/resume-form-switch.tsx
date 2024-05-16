import { Controller, useFormContext } from 'react-hook-form';

import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

export default function ResumeRHFSwitch({ name, helperText, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (event: { target: { checked: any; }; }) => {
            setValue(name, event.target.checked ? 'PUBLIC' : 'PRIVATE', { shouldValidate: true, shouldDirty: true });
          };
        return (
            <div>
            <FormControlLabel
              control={<Switch {...field} checked={field.value === 'PUBLIC'} onChange={handleChange} />}
              {...other}
            />
            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </div>
      )}}
    />
  );
}
