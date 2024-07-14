'use client';

import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import LabelText from '@/components/ui/typograph/LabelText';
import { Edit } from '@mui/icons-material';
import { Box, Button, Chip, Stack } from '@mui/material';
import { useState } from 'react';
import EditSelfRoleModal from './account/_components/EditSelfRoleModal';
import EditPasswordModal from './account/_components/EditPasswordModal';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
import { UserRole } from '@/http/graphql/codegen/graphql';
import { roleToHandle } from './account/_components/CreateAccountModal';

const ProfilePage = () => {
  const { role } = useReactiveVar(authState);
  const canModifyRole = role.includes(UserRole.AdminAccount);
  const { data: myInfo } = useGetMyInfo();

  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
  const roleList = myInfo?.myInfo.role.map((item) => {
    return <Chip key={item} label={roleToHandle[item]} />;
  });

  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {myInfo && (
        <EditSelfRoleModal
          myInfo={myInfo.myInfo}
          open={openEditRoleModal}
          onClose={() => setOpenEditRoleModal(false)}
        />
      )}
      {myInfo && (
        <EditPasswordModal
          selectedUser={myInfo.myInfo}
          open={openEditPasswordModal}
          onClose={() => setOpenEditPasswordModal(false)}
        />
      )}
      <Stack direction="row" alignItems="flex-end">
        <LabelText label="아이디 : " text={myInfo?.myInfo.id ?? ''} />
        <Button
          onClick={() => setOpenEditPasswordModal(true)}
          startIcon={<Edit />}
          sx={{ ml: 2 }}
          variant="contained"
        >
          비밀번호 수정
        </Button>
      </Stack>

      <Stack direction="row" alignItems="flex-end">
        <LabelText
          label="권한 : "
          text={
            <Stack gap={1} direction="row" flexWrap="wrap">
              {roleList}
            </Stack>
          }
        />
      </Stack>
      {canModifyRole && (
        <Button
          onClick={() => setOpenEditRoleModal(true)}
          startIcon={<Edit />}
          sx={{ width: 'fit-content' }}
          variant="contained"
        >
          권한수정
        </Button>
      )}
    </Box>
  );
};

export default ProfilePage;
