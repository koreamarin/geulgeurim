import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';


interface IExperienceRequest {
    experienceTitle: string;
    startDate: Date | null;
    endDate: Date | null;
    experienceContent: string;
}

interface FormValues {
    createExperienceRequests: IExperienceRequest[];
}

export default function RHFExperience() {
    const { control, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        name: 'createExperienceRequests',
        control
    });

    const startDateValues = watch('createExperienceRequests');

    return (
        <>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="경험/활동/교육" 
            action={
                <IconButton onClick={() => append({
                    experienceTitle: '',
                    startDate: null,
                    endDate: null,
                    experienceContent: ''
                })}>
                  <Iconify color='#00a76f' icon="mingcute:add-line" />
                </IconButton>
            }/>
            {fields.map((fielInfo, index) => (
                <Grid container spacing={3} key={fielInfo.id} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb:2 }}>
                    <Grid xs={12}>
                        <RHFTextField name={`createExperienceRequests.${index}.experienceTitle` as const} label="*경험/활동/교육명"/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Controller
                            name={`createExperienceRequests.${index}.startDate` as const}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="*시작날짜"
                                format="dd/MM/yyyy"
                                disableFuture
                                slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!error,
                                    helperText: error?.message,
                                },
                                }}
                            />
                            )}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Controller
                            name={`createExperienceRequests.${index}.endDate` as const}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="*종료날짜"
                                format="dd/MM/yyyy"
                                disableFuture
                                shouldDisableDate={(date) => {
                                    const { startDate } = startDateValues[index]
                                    return !startDate || date <= startDate;
                                }}
                                slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!error,
                                    helperText: error?.message,
                                },
                                }}
                            />
                            )}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <RHFTextField name={`createExperienceRequests.${index}.experienceContent` as const} label="*경험/활동/교육 설명"  multiline rows={3}/>
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="flex-end">
                        <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={() => remove(index)}>삭제하기</Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
