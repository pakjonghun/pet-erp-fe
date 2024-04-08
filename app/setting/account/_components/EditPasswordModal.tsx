'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Stack,
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import BaseModal from '../../../../components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '../../../../components/ui/loading/CommonLoading';
import { SelectedUser } from '../type';
import { useUpdateUser } from '@/api/graphql/hooks/updateUserProfile';
import { editPasswordSchema, EditPasswordForm } from '../_validations/editPasswordValidation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  selectedUser: SelectedUser;
  open: boolean;
  onClose: () => void;
}

const EditPasswordModal: FC<Props> = ({ selectedUser, open, onClose }) => {
  const [updateUser, { loading }] = useUpdateUser();
  const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPasswordForm>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: EditPasswordForm) => {
    updateUser({
      variables: {
        updateUserInput: {
          id: selectedUser.id,
          password: values.password,
        },
      },
      onCompleted: () => {
        snackMessage({ message: '권한 변경이 완료되었습니다.', severity: 'success' });
        handleClose();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl sx={{ mt: 3 }}>
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ cursor: 'pointer' }}
                        position="end"
                        onClick={() => setVisible((prev) => !prev)}
                      >
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    ),
                  }}
                  required
                  label="비밀번호 확인"
                  type={visible ? 'text' : 'password'}
                  size="small"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message ?? ''}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ mt: 3 }}>
                <TextField
                  {...field}
                  error={!!errors?.passwordConfirm?.message}
                  helperText={errors?.passwordConfirm?.message ?? ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ cursor: 'pointer' }}
                        position="end"
                        onClick={() => setVisible((prev) => !prev)}
                      >
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    ),
                  }}
                  required
                  label="비밀번호 확인"
                  type={visible ? 'text' : 'password'}
                  size="small"
                />
              </FormControl>
            )}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            수정
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default EditPasswordModal;
