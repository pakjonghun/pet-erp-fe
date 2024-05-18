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

const ProfilePage = () => {
  const { data } = useDeliveryCost();
  const [date, setDate] = useState<null | Dayjs>(null);
  const [monthDeliveryTotal, setMonthDeliveryTotal] = useState<null | number>(null);
  const today = dayjs();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SetDeliveryForm>({
    resolver: zodResolver(setDeliveryCostSchema),
    defaultValues: {
      year: today.get('year'),
      month: today.get('month'),
      monthDeliveryPayCost: 0,
    },
  });

  const deliveryCost = data?.deliveryCost;

  useEffect(() => {
    if (!deliveryCost) return;

    const date = `${deliveryCost.year}-${deliveryCost.month}-1`;
    setDate(dayjs(date));
  }, [deliveryCost]);

  const handleClickInsert = () => {};

  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <LabelText
        label="택배비용 평균 단가 : "
        text={deliveryCost == null ? EMPTY : deliveryCost.deliveryCost}
      />

      <Stack direction="row" alignItems="center" gap={3}>
        <Controller
          control={control}
          name="date"
          render={({ field }) => {
            return (
              <DatePicker
                views={['year', 'month']}
                value={dayjs(field.value)}
                onChange={(value) => field.onChange(value)}
                format="YYYY년 MM월"
                sx={{
                  '& input': {
                    py: 1,
                  },
                }}
              />
            );
          }}
        />
        <Controller name="" />
        <FormControl>
          <TextField
            sx={{ width: 'fit-content' }}
            size="small"
            type={monthDeliveryTotal == null ? 'text' : 'number'}
            value={monthDeliveryTotal == null ? '' : monthDeliveryTotal}
            onChange={(event) => {
              const value = event.target.value == '' ? null : Number(event.target.value);
              setMonthDeliveryTotal(value);
            }}
            label="월 택배 지출 비용"
          />
        </FormControl>
        <Button type="submit" sx={{ ml: -1 }} variant="contained">
          입력
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
