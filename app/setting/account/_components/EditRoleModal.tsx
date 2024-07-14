'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { UserRole } from '@/http/graphql/codegen/graphql';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { SelectedUser } from '../type';
import { useUpdateUser } from '@/http/graphql/hooks/users/updateUserProfile';
import { roleTitleToHangle, roleToHandle } from './CreateAccountModal';

interface Props {
  selectedUser: SelectedUser;
  open: boolean;
  onClose: () => void;
}

const EditRoleModal: FC<Props> = ({ selectedUser, open, onClose }) => {
  const roleList = new Map<string, UserRole[]>();

  Object.values(UserRole).forEach((item) => {
    const split = item.split('_');
    const title = split[0];
    const target = roleList.get(title);
    const newElement = target ? [...target, item] : [item];
    roleList.set(title, newElement);
  });

  const [updateUser, { loading }] = useUpdateUser();

  const [role, setRole] = useState<UserRole[]>(selectedUser.role);

  const onChangeRole = (checked: boolean, newRole: UserRole) => {
    const newValue = checked ? [...role, newRole] : role.filter((item) => item !== newRole);
    setRole(newValue);
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
      <Typography sx={{ mb: 2, color: (theme) => theme.palette.warning.dark }}>
        권한 수정후 다시 로그인 해야 권한이 적용됩니다.
      </Typography>
      {Array.from(roleList).map(([title, elements]) => {
        const hangleTitle = roleTitleToHangle[title];
        return (
          <Box sx={{ mb: 1 }} key={title}>
            <FormGroup>
              <FormLabel>{hangleTitle}</FormLabel>
              <Stack direction="row" flexWrap="wrap">
                {elements.map((elem) => {
                  const label = roleToHandle[elem];
                  return (
                    <FormControlLabel
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 26,
                      }}
                      onChange={(_, checked) => {
                        onChangeRole(checked, elem);
                      }}
                      value={elem}
                      key={elem}
                      label={label}
                      control={<Checkbox defaultChecked={role.includes(elem)} />}
                    />
                  );
                })}
              </Stack>
            </FormGroup>
          </Box>
        );
      })}
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
