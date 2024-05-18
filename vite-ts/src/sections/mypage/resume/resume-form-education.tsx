import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

const Status = [
{ value: 'ONGOING', label: '진행 중' },
{ value: 'COMPLETED', label: '졸업' },
];

// Education 요청에 사용되는 인터페이스 정의
interface IEducationRequest {
    institutionName: string;
    startDate: Date | null;
    endDate?: Date | null;
    educationStatus: 'COMPLETED' | 'ONGOING' | '';
    gpa?: number | undefined;
}

// useFormContext에서 반환된 타입 사용
interface FormValues {
    createEducationRequests: IEducationRequest[];
}

export default function RHFEducation() {
    const { control, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        name: 'createEducationRequests',
        control
    });

    const startDateValues = watch('createEducationRequests');

    return (
        <>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="학력정보"
            action={
                <IconButton onClick={() => append({
                    institutionName: '',
                    startDate: null,
                    endDate: null,
                    educationStatus: '',
                    gpa: undefined
                })}>
                  <Iconify color='#00a76f' icon="mingcute:add-line" />
                </IconButton>
            }/>
            {fields.map((fielInfo, index) => (
                <Grid container spacing={3} key={fielInfo.id} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb:2 }}>
                    <Grid xs={12}>
                        <RHFTextField name={`createEducationRequests.${index}.institutionName` as const} label="*학교이름"/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Controller
                            name={`createEducationRequests.${index}.startDate` as const}
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
                            name={`createEducationRequests.${index}.endDate` as const}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="종료날짜"
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
                    <Grid xs={12} md={6}>
                        <RHFSelect name={`createEducationRequests.${index}.educationStatus` as const} label="*교육상태">
                            {Status.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.label}
                            </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <RHFTextField name={`createEducationRequests.${index}.gpa` as const} label="학점(GPA)" type="number" />
                    </Grid>
                    <Grid xs={12} display="flex" justifyContent="flex-end">
                        {/* <IconButton  onClick={() => remove(index)}>
                            <Iconify color='#ff000073' icon="solar:trash-bin-trash-bold" />
                        </IconButton> */}
                        <Button style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={() => remove(index)}>삭제하기</Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
