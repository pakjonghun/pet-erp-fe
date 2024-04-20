'use client';

import { Button, FormControl, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { MyInfo, UserRole } from '@/api/graphql/codegen/graphql';
import { useUpdateProfile } from '@/api/graphql/hooks/users/useUpdateProfile';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import BaseSelect from '@/components/ui/select/BaseSelect';

interface Props {
  myInfo: MyInfo;
  open: boolean;
  onClose: () => void;
}

const EditSelfRoleModal: FC<Props> = ({ myInfo, open, onClose }) => {
  const [updateProfile, { loading }] = useUpdateProfile();
  const [role, setRole] = useState<UserRole>(myInfo.role);
  const onChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as UserRole);
  };
  const handleClose = () => {
    const originRole = myInfo.role;
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
      <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
        권한 수정
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        ADMIN 계정만 권한을 수정할 수 있습니다.
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        다른권한으로 수정시 다시 권한수정이 불가능합니다.
      </Typography>
      <FormControl fullWidth sx={{ mt: 3 }}>
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

export default EditSelfRoleModal;
