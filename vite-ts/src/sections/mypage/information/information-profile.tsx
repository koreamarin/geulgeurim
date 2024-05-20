import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { useGetUserDetail } from 'src/api/user';

import { SplashScreen } from 'src/components/loading-screen';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

interface EditModeState {
  [key: string]: boolean;
}

export default function InformationProfile() {
    const userName = localStorage.getItem('nickname');
    const { userDetailData, userDetailError, userDetailLoading } = useGetUserDetail();
    const [editMode, setEditMode] = useState<EditModeState>({
      name: false,
      email: false,
      phoneNumber: false,
      birthday: false,
      nickname: false
    });

    const changeNameRef = useRef<string | null>(null);
    const changeNickNameRef = useRef<string | null>(null);
    const changeEmailRef = useRef<string | null>(null);
    const changePhoneNumberRef = useRef<string | null>(null);
    const changeBirthdayRef = useRef<Date | null>(null);

    const handleEdit = (field: string) => {
      setEditMode({ ...editMode, [field]: !editMode[field] });
    };

    const changeName = () => {
      // 전 값과 동일 시 out
      if (changeNameRef.current === userDetailData?.name) {
        handleEdit('name');
      }
      // 바꾼 값 api patch요청 보내기
      else {
        console.log(changeNameRef.current);
        // 성공시
        handleEdit('name');
      }
    };

    const changeNickName = () => {
      // 전 값과 동일 시 out
      if (changeNickNameRef.current === userDetailData?.nickname) {
        handleEdit('nickname');
      }
      // 바꾼 값 api patch요청 보내기
      else {
        console.log(changeNickNameRef.current);
        // 성공시
        handleEdit('nickname');
      }
    };

    const changeEmail = () => {
      if (changeEmailRef.current === userDetailData?.email) {
        handleEdit('email');
      } else {
        console.log(changeEmailRef.current);
        handleEdit('email');
      }
    };

    const changePhoneNumber = () => {
      if (changePhoneNumberRef.current === userDetailData?.phoneNum) {
        handleEdit('phoneNumber');
      } else {
        console.log(changePhoneNumberRef.current);
        handleEdit('phoneNumber');
      }
    };

    const changeBirthday = () => {
      const userBirthdayDate = userDetailData?.birthday ? new Date(userDetailData.birthday) : null;
      if (changeBirthdayRef.current?.toDateString() === userBirthdayDate?.toDateString()) {
        handleEdit('birthday');
      } else {
        console.log(changeBirthdayRef.current);
        // setValue(changeBirthdayRef.current);
        handleEdit('birthday');
      }
    };

    if (userDetailLoading) {
      return <SplashScreen />;
    }
    if (userDetailError) {
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
    }

    return (
      <Box>
        <Grid container spacing={3}>
          <Grid xsOffset={1} xs={11}>
            <Typography variant="h3" component="h1">
              {userName} 님
            </Typography>
          </Grid>
          <Grid mdOffset={1} md={2} xsOffset={4} xs={4}>
            <Avatar
              key={128}
              src={userDetailData?.fileUrl}
              alt={userDetailData?.name}
              sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }}
            />
          </Grid>
          <Grid md={8} mdOffset={0} xsOffset={1} xs={10}>
            <Typography variant="h5" component="h1" marginBottom={2}>
              기본 정보
            </Typography>
            <ComponentBlock>
              <Grid container spacing={3} rowSpacing={10} py={3} px={2}>
                {/* =================== 이름 ====================== */}
                <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="gray">
                    이름
                  </Typography>
                </Grid>
                <Grid xs={editMode.name ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  {editMode.name ? (
                    <TextField
                      inputProps={{
                        style: {
                          paddingBottom: 5,
                          paddingTop: 5
                        }
                      }}
                      defaultValue={userDetailData?.name}
                      onChange={(event) => { changeNameRef.current = event.target.value }}
                    />
                  ) :
                    userDetailData?.name
                  }
                </Grid>
                <Grid xs={editMode.name ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                  {!editMode.name ?
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                      handleEdit('name');
                      changeNameRef.current = userDetailData?.name || '';
                    }}>
                      수정
                    </Button>
                    :
                    <>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('name')}>
                        취소
                      </Button>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeName()}>
                        완료
                      </Button>
                    </>}
                </Grid>

                {/* =================== 닉네임 ====================== */}
                <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="gray">
                    닉네임
                  </Typography>
                </Grid>
                <Grid xs={editMode.nickname ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  {editMode.nickname ? (
                    <TextField
                      inputProps={{
                        style: {
                          paddingBottom: 5,
                          paddingTop: 5
                        }
                      }}
                      defaultValue={userDetailData?.nickname}
                      onChange={(event) => { changeNickNameRef.current = event.target.value }}
                    />
                  ) :
                    userDetailData?.nickname
                  }
                </Grid>
                <Grid xs={editMode.nickname ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                  {!editMode.nickname ?
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                      handleEdit('nickname');
                      changeNickNameRef.current = userDetailData.nickname ? userDetailData.nickname : '';
                    }}>
                      수정
                    </Button>
                    :
                    <>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('nickname')}>
                        취소
                      </Button>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeNickName()}>
                        완료
                      </Button>
                    </>}
                </Grid>

                {/* ======================  Email ========================== */}
                <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="gray">
                    이메일
                  </Typography>
                </Grid>
                <Grid xs={editMode.email ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  {editMode.email ? (
                    <TextField
                      inputProps={{
                        style: {
                          paddingBottom: 5,
                          paddingTop: 5
                        }
                      }}
                      defaultValue={userDetailData?.email}
                      onChange={(event) => { changeEmailRef.current = event.target.value }}
                    />
                  ) :
                    userDetailData?.email
                  }
                </Grid>
                <Grid xs={editMode.email ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                  {!editMode.email ?
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                      handleEdit('email');
                      changeEmailRef.current = userDetailData.email ? userDetailData.email : '';
                    }}>
                      수정
                    </Button>
                    :
                    <>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('email')}>
                        취소
                      </Button>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeEmail()}>
                        완료
                      </Button>
                    </>}
                </Grid>

                {/* ======================  연락처  ========================== */}
                <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" color="gray">
                    연락처
                  </Typography>
                </Grid>
                <Grid xs={editMode.phoneNumber ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                  {editMode.phoneNumber ? (
                    <TextField
                      inputProps={{
                        style: {
                          paddingBottom: 5,
                          paddingTop: 5
                        }
                      }}
                      defaultValue={userDetailData?.phoneNum}
                      onChange={(event) => { changePhoneNumberRef.current = event.target.value }}
                    />
                  ) :
                    userDetailData?.phoneNum
                  }
                </Grid>
                <Grid xs={editMode.phoneNumber ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                  {!editMode.phoneNumber ?
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                      handleEdit('phoneNumber');
                      changePhoneNumberRef.current = userDetailData.phoneNum ? userDetailData.phoneNum : '';
                    }}>
                      수정
                    </Button>
                    :
                    <>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('phoneNumber')}>
                        취소
                      </Button>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changePhoneNumber()}>
                        완료
                      </Button>
                    </>}
                </Grid>

                {/* ================== 생년월일 ================= */}
                <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <Typography variant="subtitle1" color="gray">
                    생년월일
                  </Typography>
                </Grid>
                <Grid xs={editMode.birthday ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  {editMode.birthday ? (
                    <MobileDatePicker
                      orientation="portrait"
                      value={changeBirthdayRef.current}
                      format="yyyy.MM.dd"
                      minDate={new Date('1900-01-01')}
                      onChange={(newValue) => {
                        // setValue(newValue);
                        changeBirthdayRef.current = newValue;
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'none',
                        },
                      }}
                      sx={{ alignContent: "end" }}
                    />
                  ) : userDetailData?.birthday
                  }
                </Grid>
                <Grid xs={editMode.birthday ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc', marginBottom: 4 }}>
                  {!editMode.birthday ?
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                      handleEdit('birthday');
                      changeBirthdayRef.current = userDetailData.birthday ? new Date(userDetailData.birthday) : new Date();
                    }}>
                      수정
                    </Button>
                    :
                    <>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('birthday')}>
                        취소
                      </Button>
                      <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeBirthday()}>
                        완료
                      </Button>
                    </>}
                </Grid>
              </Grid>
            </ComponentBlock>
          </Grid>
        </Grid>
      </Box>
    );
}
