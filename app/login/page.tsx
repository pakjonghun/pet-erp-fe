'use client';

import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from './validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/api/rest/hooks/auth/useAuth';
import { useCreateUser } from '@/api/graphql/hooks/useFindUsers';
import { client } from '@/api/graphql/client';
import { useGetMyInfo } from '@/api/graphql/hooks/useGetMyInfo';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Loading from '@/components/ui/Loading';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { data: myInfo, loading } = useGetMyInfo();
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    if (myInfo) {
      redirect('/');
    }
  }, [myInfo]);

  const submit = (values: LoginForm) => {
    login(values, {
      onSuccess: async () => {
        console.log('success');
        await client.refetchQueries({ include: 'active' });
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.primary.light }}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack sx={{ mx: 'auto', pt: '20%' }} maxWidth="sm" direction="column" gap={2}>
          <Controller
            name="id"
            control={control}
            render={({ field, formState: { errors } }) => {
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

          <Button
            startIcon={
              isPending ? <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} /> : ''
            }
            size="large"
            sx={{ py: 1.2 }}
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
