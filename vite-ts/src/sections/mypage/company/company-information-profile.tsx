import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useGetUserDetail, useGetCompanyDetail } from 'src/api/user';

import { SplashScreen } from 'src/components/loading-screen';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

interface EditModeState {
  [key: string]: boolean;
}

export default function CompanyInformationProfile() {
  const userName = localStorage.getItem('nickname');
  const { userDetailData, userDetailError, userDetailLoading } = useGetUserDetail();
  const { companyDetailData, companyDetailError, companyDetailLoading } = useGetCompanyDetail();
  const [editMode, setEditMode] = useState<EditModeState>({
    company: false,
    email: false,
    address: false,
  });

  const changeCompanyRef = useRef<string | null>(null);
  const changeEmailRef = useRef<string | null>(null);
  const changeAddressRef = useRef<string | null>(null);

  const handleEdit = (field: string) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const changeCompany = () => {
    if (changeCompanyRef.current === companyDetailData?.company) {
      handleEdit('company');
    } else {
      console.log(changeCompanyRef.current);
      handleEdit('company');
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

  const changeAddress = () => {
    if (changeAddressRef.current === companyDetailData?.address) {
      handleEdit('address');
    } else {
      console.log(changeAddressRef.current);
      handleEdit('address');
    }
  };

  if (userDetailLoading || companyDetailLoading) {
    return <SplashScreen />;
  }
  if (userDetailError || companyDetailError) {
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
            src={companyDetailData?.thumbnail || '/default-avatar.png'}
            alt={companyDetailData?.manager}
            sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }}
          />
        </Grid>
        <Grid md={8} mdOffset={0} xsOffset={1} xs={10}>
          <Typography variant="h5" component="h1" marginBottom={2}>
            기본 정보
          </Typography>
          <ComponentBlock>
            <Grid container spacing={3} rowSpacing={10} py={3} px={2}>
              {/* =================== 상호명 ====================== */}
              <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="gray">
                  상호명
                </Typography>
              </Grid>
              <Grid xs={editMode.company ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                {editMode.company ? (
                  <TextField
                    inputProps={{
                      style: {
                        paddingBottom: 5,
                        paddingTop: 5
                      }
                    }}
                    defaultValue={companyDetailData?.company}
                    onChange={(event) => { changeCompanyRef.current = event.target.value }}
                  />
                ) :
                  companyDetailData?.company
                }
              </Grid>
              <Grid xs={editMode.company ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                {!editMode.company ?
                  <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                    handleEdit('company');
                    changeCompanyRef.current = companyDetailData?.company || '';
                  }}>
                    수정
                  </Button>
                  :
                  <>
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('company')}>
                      취소
                    </Button>
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeCompany()}>
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

              {/* ======================  사업장 주소  ========================== */}
              <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="gray">
                  사업장 주소
                </Typography>
              </Grid>
              <Grid xs={editMode.address ? 4 : 6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                {editMode.address ? (
                  <TextField
                    inputProps={{
                      style: {
                        paddingBottom: 5,
                        paddingTop: 5
                      }
                    }}
                    defaultValue={companyDetailData?.address}
                    onChange={(event) => { changeAddressRef.current = event.target.value }}
                  />
                ) :
                  companyDetailData?.address
                }
              </Grid>
              <Grid xs={editMode.address ? 5 : 3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc' }}>
                {!editMode.address ?
                  <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => {
                    handleEdit('address');
                    changeAddressRef.current = companyDetailData.address ? companyDetailData.address : '';
                  }}>
                    수정
                  </Button>
                  :
                  <>
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px', marginRight: '3px' }} variant="outlined" color="error" size="small" onClick={() => handleEdit('address')}>
                      취소
                    </Button>
                    <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="info" size="small" onClick={() => changeAddress()}>
                      완료
                    </Button>
                  </>}
              </Grid>

              {/* ================== 비밀번호 ================= */}
              <Grid xs={3} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <Typography variant="subtitle1" color="gray">
                  비밀번호
                </Typography>
              </Grid>
              <Grid xs={6} pb={1} sx={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <Typography variant="body1">**********</Typography>
              </Grid>
              <Grid xs={3} pb={1} textAlign="end" sx={{ borderBottom: '1px solid #ccc', marginBottom: 4 }}>
                <Button style={{ minWidth: '45px', fontSize: '0.6rem', padding: '2px 5px' }} variant="outlined" color="success" size="small" onClick={() => handleEdit('password')}>
                  수정
                </Button>
              </Grid>
            </Grid>
          </ComponentBlock>
        </Grid>
      </Grid>
    </Box>
  );
}
