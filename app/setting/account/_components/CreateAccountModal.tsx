import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateAccountForm, createAccountSchema } from '../_validations/createAccountValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '@/api/graphql/hooks/useCreateAccount';
import { UserRole } from '@/api/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateAccountModal: FC<Props> = ({ open, onClose }) => {
  const [createAccount, { loading }] = useCreateAccount();
  const [visible, setVisible] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      role: UserRole.Staff,
    },
  });

  const onSubmit = (values: CreateAccountForm) => {
    const { passwordConfirm, ...rest } = values;
    createAccount({
      variables: {
        createUserInput: rest,
      },
      onCompleted: () => {
        snackMessage({ message: '계정 생성이 성공했습니다.', severity: 'success' });
        reset();
        onClose();
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '계정 생성이 실패했습니다.', severity: 'error' });
      },
    });
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        계정 생성
      </Typography>
      <Typography sx={{ mb: 3 }}>새로운 계정을 생성합니다.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ gap: 2 }}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  sx={{ minWidth: 400 }}
                  {...field}
                  required
                  label="아이디"
                  error={!!errors.id?.message}
                  helperText={errors.id?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
                  required
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
                  type={visible ? 'text' : 'password'}
                  label="비밀번호"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message ?? ''}
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormControl required>
                <TextField
                  {...field}
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
                  type={visible ? 'text' : 'password'}
                  label="비밀번호 확인"
                  error={!!errors.passwordConfirm?.message}
                  helperText={errors.passwordConfirm?.message ?? ''}
                />
              </FormControl>
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormControl required>
                <InputLabel>권한</InputLabel>
                <Select {...field} label="권한" id="role_change_select">
                  {Object.values(UserRole).map((role) => (
                    <MenuItem value={role} key={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </FormGroup>
        <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" endIcon={loading ? <CommonLoading /> : ''} variant="contained">
            생성
          </Button>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default CreateAccountModal;
