import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  userNickname: string;
  userFileUrl: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function PostCommentItem({
  userNickname,
  userFileUrl,
  content,
  createdAt,
  updatedAt,
}: Props) {
  const reply = useBoolean();

  return (
    <ListItem
      sx={{
        p: 0,
        pt: 3,
        alignItems: 'flex-start',
      }}
    >
      <Avatar alt={userNickname} src={userFileUrl} sx={{ mr: 2, width: 48, height: 48 }} />

      <Stack
        flexGrow={1}
        sx={{
          pb: 3,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {userNickname}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDate(createdAt)}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {content}
        </Typography>

        {reply.value && (
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth autoFocus placeholder="Write comment..." />
          </Box>
        )}
      </Stack>
    </ListItem>
  );
}
