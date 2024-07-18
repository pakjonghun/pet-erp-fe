'use client';

import LabelText from '@/components/ui/typograph/LabelText';
import { EMPTY } from '@/constants';
import { useDeliveryCost } from '@/http/graphql/hooks/delivery/useDeliveryCost';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SetDeliveryForm, setDeliveryCostSchema } from './_validations/setDeliveryCostValidation';
import { useSetDeliveryCost } from '@/http/graphql/hooks/delivery/useSetDeliveryCost';
import { snackMessage } from '@/store/snackMessage';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { getKCWFormat } from '@/utils/common';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';

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
    if (!data?.deliveryCost || isLoading) return;
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
  const { mutate: uploadFile, isPending } = useUploadExcelFile();
  const [fileKey, setFileKey] = useState(new Date());
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    uploadFile(
      { service: 'argo', formBody },
      {
        onSuccess: () => {
          snackMessage({ message: '파일 업로드가 완료되었습니다.', severity: 'success' });
        },
        onError: (err) => {
          const message = err.response?.data.message;
          snackMessage({ message: message ?? '파일 업로드가 실패했습니다.', severity: 'error' });
        },
        onSettled: () => {
          setFileKey(new Date());
        },
      }
    );
  };

  useEffect(() => {
    if (!deliveryCost) return;

    const date = `${deliveryCost.year}-${deliveryCost.month}-1`;
    setDate(dayjs(date));
  }, [deliveryCost]);

  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ width: 'fit-content' }}>
        <UploadButton
          fileKey={fileKey}
          loading={isPending}
          text="아르고 엑셀파일 업로드"
          onChange={handleChangeFile}
        />
      </Box>
      <LabelText
        label="택배비용 평균 단가 : "
        text={deliveryCost == null ? EMPTY : getKCWFormat(deliveryCost.deliveryCost)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
          gap={3}
        >
          <DatePicker
            views={['year', 'month']}
            value={dayjs(date)}
            onChange={(value) => {
              setDate(value);
              if (!value) {
                setValue('month', month);
                setValue('year', year);
              } else {
                const valueMonth = value.get('month') + 1;
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
                    sx={{
                      width: {
                        xs: '100%',
                        md: 'fit-content',
                      },
                    }}
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
