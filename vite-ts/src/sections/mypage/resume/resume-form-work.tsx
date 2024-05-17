import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

interface IWorkRequest {
    companyName: string;
    startDate: Date | null;
    endDate: Date | null;
    content: string;
}

// useFormContext에서 반환된 타입 사용
interface FormValues {
    createWorkRequests: IWorkRequest[];
}

export default function RHFWork() {
    const { control, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        name: 'createWorkRequests',
        control
    });

    const startDateValues = watch('createWorkRequests');

    return (
        <>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="경력사항" 
            action={
                <IconButton onClick={() => append({
                    companyName: '',
                    startDate: null,
                    endDate: null,
                    content: ''
                })}>
                  <Iconify color='#00a76f' icon="mingcute:add-line" />
                </IconButton>
            }/>
            {fields.map((fielInfo, index) => (
                <Grid container spacing={3} key={fielInfo.id} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb:2 }}>
                    <Grid xs={12}>
                        <RHFTextField name={`createWorkRequests.${index}.companyName` as const} label="*회사명"/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Controller
                            name={`createWorkRequests.${index}.startDate` as const}
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
                            name={`createWorkRequests.${index}.endDate` as const}
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
                        <RHFTextField name={`createWorkRequests.${index}.content` as const} label="*경력 설명"  multiline rows={3}  />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="flex-end">
                        <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={() => remove(index)}>삭제하기</Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
