import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

interface IAwardRequest {
    awardName: string;
    acquisitionDate: Date | null;
    score: string;
    institution: string;
}

interface FormValues {
    createAwardRequests: IAwardRequest[];
}

export default function RHFAward() {
    const { control } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        name: 'createAwardRequests',
        control
    });

    return (
        <>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="자격/어학/수상" 
            action={
                <IconButton onClick={() => append({
                    awardName: '',
                    acquisitionDate: null,
                    score: '',
                    institution: ''
                })}>
                  <Iconify color='#00a76f' icon="mingcute:add-line" />
                </IconButton>
            }/>
            {fields.map((fielInfo, index) => (
                <Grid container spacing={3} key={fielInfo.id} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb:2 }}>
                    <Grid xs={12}>
                        <RHFTextField name={`createAwardRequests.${index}.awardName` as const} label="*자격/어학/수상명"/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Controller
                            name={`createAwardRequests.${index}.acquisitionDate` as const}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="*취득날짜"
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
                        <RHFTextField name={`createAwardRequests.${index}.score` as const} label="등급/점수" />
                    </Grid>
                    <Grid xs={12}>
                        <RHFTextField name={`createAwardRequests.${index}.institution` as const} label="발급기관" />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="flex-end">
                        <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={() => remove(index)}>삭제하기</Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
