'use client';

import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY } from '@/constants';
import { useDeliveryCost } from '@/http/graphql/hooks/delivery/useDeliveryCost';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SetDeliveryForm, setDeliveryCostSchema } from './_validations/setDeliveryCostValidation';
import { useSetDeliveryCost } from '@/http/graphql/hooks/delivery/useSetDeliveryCost';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { getKCWFormat } from '@/utils/common';

const ProfilePage = () => {
  const today = dayjs();
  const year = today.get('year');
  const month = today.get('month');

  const [setDeliveryCost, { loading }] = useSetDeliveryCost();
  const { data, networkStatus } = useDeliveryCost();
  const isLoading = networkStatus <= 3;

  const [date, setDate] = useState<null | Dayjs>(today);

  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SetDeliveryForm>({
    resolver: zodResolver(setDeliveryCostSchema),
    defaultValues: {
      year,
      month,
      monthDeliveryPayCost: 0,
    },
  });

  useEffect(() => {
    if (!data?.deliveryCost || !isLoading) return;
    reset(data.deliveryCost);
  }, [data?.deliveryCost, isLoading, reset]);

  const onSubmit = (value: SetDeliveryForm) => {
    setDeliveryCost({
      variables: {
        setDeliveryCostInput: value,
      },
      onCompleted: () => {
        snackMessage({ message: '택배비용 입력이 완료되었습니다.', severity: 'success' });
      },
      onError: (error) => {
        const message = error.message ?? '택배비용 입력이 실패 하였습니다.';
        snackMessage({ message, severity: 'error' });
      },
    });
  };

  const deliveryCost = data?.deliveryCost;

  useEffect(() => {
    if (!deliveryCost) return;

    const date = `${deliveryCost.year}-${deliveryCost.month}-1`;
    setDate(dayjs(date));
  }, [deliveryCost]);

  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <LabelText
        label="택배비용 평균 단가 : "
        text={deliveryCost == null ? EMPTY : getKCWFormat(deliveryCost.deliveryCost)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" alignItems="center" gap={3}>
          <DatePicker
            views={['year', 'month']}
            value={dayjs(date)}
            onChange={(value) => {
              setDate(value);
              if (!value) {
                setValue('month', month);
                setValue('year', year);
              } else {
                const valueMonth = value.get('month');
                const valueYear = value.get('year');
                setValue('month', valueMonth);
                setValue('year', valueYear);
              }
            }}
            format="YYYY년 MM월"
            sx={{
              '& input': {
                py: 1,
              },
            }}
          />

          <Controller
            control={control}
            name="monthDeliveryPayCost"
            render={({ field }) => {
              const fieldValue = field.value;
              return (
                <FormControl>
                  <TextField
                    sx={{ width: 'fit-content' }}
                    size="small"
                    type={fieldValue == null ? 'text' : 'number'}
                    value={fieldValue == null ? '' : fieldValue}
                    onChange={(event) => {
                      const value = event.target.value == '' ? null : Number(event.target.value);
                      field.onChange(value);
                    }}
                    label="월 택배 지출 비용"
                    helperText={errors.monthDeliveryPayCost?.message ?? ''}
                    error={!!errors.monthDeliveryPayCost?.message}
                  />
                </FormControl>
              );
            }}
          />

          <Button
            endIcon={loading ? <CommonLoading /> : ''}
            type="submit"
            sx={{ ml: -1 }}
            variant="contained"
          >
            입력
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfilePage;
