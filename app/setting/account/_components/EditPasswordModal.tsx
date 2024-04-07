'use client';

import {
  Button,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { UserRole } from '@/api/graphql/codegen/graphql';
import { useUpdateProfile } from '@/api/graphql/hooks/useUpdateProfile';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { SelectedUser } from '../type';

interface Props {
  selectedUser: SelectedUser;
  open: boolean;
  onClose: () => void;
}

const EditPasswordModal: FC<Props> = ({ selectedUser, open, onClose }) => {
  const [updateProfile, { loading }] = useUpdateProfile();
  const [role, setRole] = useState<UserRole>(selectedUser.role);

  const onChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as UserRole);
  };

  const handleClose = () => {
    const originRole = selectedUser.role;
    if (!originRole) return;

    setRole(originRole);
    onClose();
  };

  const handleEditRole = () => {
    updateProfile({
      variables: {
        updateProfileInput: {
          role,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '권한 변경이 완료되었습니다.', severity: 'success' });
        onClose();
      },
      onError: (err) => {
        snackMessage({ message: err.message ?? '권한변경이 실패하였습니다.', severity: 'error' });
      },
    });
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        비밀번호 수정
      </Typography>
      <Typography>입력된 비밀번호로 변경 합니다.</Typography>
      <FormControl sx={{ mt: 3 }} fullWidth>
        <InputLabel id="role_change_select">비밀번호 수정</InputLabel>
        <TextField />
      </FormControl>
      <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleClose}>
          취소
        </Button>
        <Button
          endIcon={loading ? <CommonLoading /> : ''}
          variant="contained"
          onClick={handleEditRole}
        >
          수정
        </Button>
      </Stack>
    </BaseModal>
  );
};

export default EditPasswordModal;
