'use client';

import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { SelectedUser } from '../type';
import { useDeleteAccount } from '@/api/graphql/hooks/useDeleteAccount';

interface Props {
  selectedUser: SelectedUser;
  open: boolean;
  onClose: () => void;
}

const DeleteAccountModal: FC<Props> = ({ selectedUser, open, onClose }) => {
  const [deleteAccount, { loading }] = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount({
      variables: {
        id: selectedUser.id,
      },
      onCompleted: () => {
        snackMessage({ message: '계정이 삭제되었습니다..', severity: 'success' });
        onClose();
      },
      onError: (err) => {
        snackMessage({ message: err.message ?? '계정삭제가 실패하였습니다.', severity: 'error' });
      },
    });
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        계정 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        해당 계정이 삭제됩니다.
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 계정은 복구 할 수 없습니다.
      </Typography>
      <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
        <Button color="info" variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button
          color="error"
          endIcon={loading ? <CommonLoading /> : ''}
          variant="contained"
          onClick={handleDeleteAccount}
        >
          삭제
        </Button>
      </Stack>
    </BaseModal>
  );
};

export default DeleteAccountModal;
