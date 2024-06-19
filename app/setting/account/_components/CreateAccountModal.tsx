import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BaseModal from '@/components/ui/modal/BaseModal';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
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
import { useCreateAccount } from '@/http/graphql/hooks/users/useCreateAccount';
import { UserRole } from '@/http/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { snackMessage } from '@/store/snackMessage';
import { modalSizeProps } from '@/components/commonStyles';

export const roleToHandle = {
  ['ADMIN' as string]: '어드민',
  MANAGER: '관리자',
  STAFF: '스텝',
  BACK_DELETE: '백 데이터삭제',
  BACK_EDIT: '백 데이터편집',
  STOCK_IN: '입고 입력',
  STOCK_OUT: '출고 입력',
  ORDER_CREATE: '발주입력',
  ORDER_EDIT: '발주편집',
  ORDER_DELETE: '발주삭제',
  SALE_CREATE: '비 사방넷 판매입력',
  SALE_EDIT: '비 사방넷 판매편집',
  SALE_DELETE: '비 사방넷 판매삭제',
  ADMIN_ACCESS: '올엑세스 권한',
  ADMIN_IP: '접속 아이피 설정',
  ADMIN_ACCOUNT: '계정관리',
  ADMIN_DELIVERY: '탭배비용 관리',
  ADMIN_LOG: '사용이력 조회',
};

const roleTitleToHangle: Record<string, string> = {
  ADMIN: '어드민',
  BACK: '백데이터',
  STOCK: '재고',
  ORDER: '발주',
  SALE: '판매',
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateAccountModal: FC<Props> = ({ open, onClose }) => {
  const [createAccount, { loading }] = useCreateAccount();
  const [visible, setVisible] = useState(false);

  const roleList = new Map<string, string[]>();

  Object.values(UserRole).forEach((item) => {
    const deleteElement = ['MANAGER', 'ADMIN', 'STAFF'];
    if (deleteElement.includes(item)) return;
    const split = item.split('_');
    const title = split[0];
    const target = roleList.get(title);
    const newElement = target ? [...target, item] : [item];
    roleList.set(title, newElement);
  });

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
      role: [] as UserRole[],
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
        <FormGroup sx={modalSizeProps}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <FormControl required>
                <TextField
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
              <FormControl>
                {Array.from(roleList).map(([title, elements]) => {
                  const hangleTitle = roleTitleToHangle[title];
                  return (
                    <Container sx={{ mb: 1 }} key={title}>
                      <FormGroup>
                        <FormLabel>{hangleTitle}</FormLabel>
                        <Stack direction="row" flexWrap="wrap">
                          {elements.map((role) => {
                            const label = roleToHandle[role];
                            return (
                              <FormControlLabel
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 26,
                                }}
                                onChange={(_, checked) => {
                                  console.log(checked);
                                }}
                                value={role}
                                key={role}
                                label={label}
                                control={<Checkbox />}
                              />
                            );
                          })}
                        </Stack>
                      </FormGroup>
                    </Container>
                  );
                })}
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
