'use client';

import EditRoleModal from '@/app/setting/account/_components/EditRoleModal';
import LabelText from '@/components/ui/typograph/LabelText';
import { Edit } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

const ProfilePage = () => {
  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);

  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <EditRoleModal open={openEditRoleModal} onClose={() => setOpenEditRoleModal(false)} />
      <LabelText label="택배비용 평균 단가 : " text="199,39원" />
      <Stack direction="row" alignItems="flex-end">
        <LabelText label="적용 날짜 : " text="2024. 10. 02" />
        <Button
          onClick={() => setOpenEditRoleModal(true)}
          startIcon={<Edit />}
          sx={{ ml: 2 }}
          variant="contained"
        >
          날짜수정버튼
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
