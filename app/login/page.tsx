'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from './validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/http/rest/hooks/auth/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';

const LoginPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: 'admin',
      password: '123123123',
    },
    mode: 'onChange',
  });

  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { isLogin, loading } = useReactiveVar(authState);

  useEffect(() => {
    if (loading) return;

    if (isLogin) {
      router.replace('/');
    }
  }, [isLogin, loading, router]);

  const onSubmit = (values: LoginForm) => {
    login(values, {
      onSuccess: async () => {
        snackMessage({ message: '환영합니다.', severity: 'success' });
        await client.refetchQueries({ include: 'active' });
      },
      onError: (error) => {
        const message = error.response?.data.message;
        snackMessage({
          message: message ?? '로그인이 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };

  if (loading || isLogin) return <></>;

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{ mx: 'auto', pt: '20%', px: 3 }}
          maxWidth="sm"
          direction="column"
          gap={2}
        >
          <Typography variant="subtitle2">
            미리 입력된 계정을 테스트를 위한 계정 admin 입니다. <br /> 계속
            진행하려면 로그인을 해주세요.
          </Typography>
          <Controller
            name="id"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  required
                  placeholder="이아디"
                  error={!!errors.id}
                  helperText={errors.id?.message ?? ''}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="password"
                  required
                  placeholder="비밀번호"
                  error={!!errors.password}
                  helperText={errors.password?.message ?? ''}
                />
              );
            }}
          />

          <Button
            startIcon={isPending ? <CommonLoading /> : ''}
            size="large"
            sx={{
              py: {
                xs: 1,
                md: 1.3,
              },
            }}
            variant="contained"
            type="submit"
          >
            로그인
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
