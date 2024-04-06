'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from './validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/api/rest/hooks/auth/useAuth';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutate: login } = useLogin();

  const submit = (values: LoginForm) => {
    login(values, {
      onSuccess: (res) => {
        //
      },
      onError: (error) => {
        //
      },
    });
  };

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.primary.light }}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack sx={{ mx: 'auto', pt: '20%' }} maxWidth="sm" direction="column" gap={2}>
          <Controller
            name="id"
            control={control}
            render={({ field, formState: { errors } }) => {
              console.log(errors);
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
            render={({ field, formState: { errors } }) => {
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

          <Button size="large" sx={{ py: 1.2 }} variant="contained" type="submit">
            로그인
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
