import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import ComponentBlock from './component-block';

// ----------------------------------------------------------------------

export default function InformationProfile() {
    console.log('ddd')
    const { user } = useMockedUser();
    return (
        <Box>
            <Avatar
              key={128}
              src={user?.photoURL}
              alt={user?.displayName}
              // alt={_mock.fullName(index + 4)}
              // src={_mock.image.avatar(index + 4)}
              sx={{ width: 128, height: 128 }}
            />
            <ComponentBlock title="내 정보">
                <Box>
                    ddd
                </Box>
            </ComponentBlock>
        </Box>
    );
}

