'use client';

import { Button, FormControl, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { UserRole } from '@/http/graphql/codegen/graphql';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { SelectedUser } from '../type';
import { useUpdateUser } from '@/http/graphql/hooks/users/updateUserProfile';
import BaseSelect from '@/components/ui/select/BaseSelect';

interface Props {
  selectedUser: SelectedUser;
  open: boolean;
  onClose: () => void;
}

const EditRoleModal: FC<Props> = ({ selectedUser, open, onClose }) => {
  const [updateUser, { loading }] = useUpdateUser();

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
    updateUser({
      variables: {
        updateUserInput: {
          id: selectedUser.id,
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
        권한 수정
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        해당 계정의 권한을 선택된 권한으로 수정합니다.
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        권한 수정후 다시 로그인 해야 권한이 적용됩니다.
      </Typography>
      <FormControl sx={{ mt: 3 }} fullWidth>
        <BaseSelect
          label="권한"
          defaultValue={role}
          value={role}
          onChangeValue={onChangeRole}
          optionItems={Object.values(UserRole)}
        />
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

export default EditRoleModal;
