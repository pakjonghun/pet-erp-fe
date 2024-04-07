'use client';

import { useGetMyInfo } from '@/api/graphql/hooks/useGetMyInfo';
import EditRoleModal from '@/components/ui/modal/EditRoleModal';
import LabelText from '@/components/ui/typograph/LabelText';
import { Edit } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const ProfilePage = () => {
  const { data: myInfo } = useGetMyInfo();
  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <EditRoleModal open={openEditRoleModal} onClose={() => setOpenEditRoleModal(false)} />
      <LabelText label="아이디 : " text={myInfo?.myInfo.id ?? ''} />
      <Stack direction="row" alignItems="flex-end">
        <LabelText label="권한 : " text={myInfo?.myInfo.role ?? ''} />
        <Button
          onClick={() => setOpenEditRoleModal(true)}
          startIcon={<Edit />}
          sx={{ ml: 2 }}
          variant="contained"
        >
          권한수정
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
