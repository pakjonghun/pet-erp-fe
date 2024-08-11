import CloseIcon from '@mui/icons-material/Close';
import SwitchDate from '@/components/calendar/dateSwitch/SwitchDate';
import NumberInput from '@/components/ui/input/NumberInput';
import { Box, FormControl, IconButton, Stack, TextField } from '@mui/material';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import SelectClient from './SelectClient';
import SelectProductList from './SelectProductList';
import { CreateAdForm, NameCodeForm } from '../_validations/createSubsidiaryValidation copy';
import { FC, useState } from 'react';
import { DateRange } from '@/components/calendar/dateFilter/type';
import { SearchStandard } from '@/components/calendar/dateSwitch/types';
import { HandleQuery } from '@/hooks/useHandleQuery';
import { AdType } from '@/http/graphql/codegen/graphql';

interface Props {
  q: HandleQuery;
  removeAd: (index: number) => void;
  selectedProductList?: NameCodeForm[] | null;
  control: Control<CreateAdForm>;
  item: FieldArrayWithId<CreateAdForm>;
  index: number;
  errors: FieldErrors<CreateAdForm>;
  getDateRange: (index: number) => DateRange;
  setDateRange: (dateRange: DateRange, index: number) => void;
}

const AdItem: FC<Props> = ({
  selectedProductList,
  control,
  errors,
  item,
  index,
  getDateRange,
  setDateRange,
  removeAd,
  q,
}) => {
  const adType = q.getQuery('tab') as AdType;

  const channelNeed =
    adType == AdType.ChannelProductRate ||
    adType == AdType.ChannelAppProduct ||
    adType == AdType.ChannelSpecialProduct;
  const productNeed = adType == AdType.ChannelAppProduct || adType == AdType.ChannelSpecialProduct;

  const [searchStandard, setSearchStandard] = useState<SearchStandard>('일');

  return (
    <Stack
      key={item.id}
      sx={{
        gap: {
          xs: 2,
          lg: 4,
        },
        borderBottom: {
          lg: 'none',
          xs: '1px solid lightGrey',
        },
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
        flexWrap: {
          lg: "'wrap'",
          xs: 'nowrap',
        },
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      justifyContent="space-between"
    >
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
        }}
      >
        <TextField
          sx={{ width: '100%' }}
          size="small"
          label="광고날짜"
          value={' '}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <SwitchDate
          hideSwitch
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%',
            pl: 1,
          }}
          dateRange={getDateRange(index)}
          searchStandard={searchStandard}
          setDateRange={(range) => setDateRange(range, index)}
          setSearchStandard={setSearchStandard}
        />
      </Box>
      <Controller
        control={control}
        name={`ads.${index}.price`}
        render={({ field }) => (
          <FormControl
            sx={{
              flex: 0.6,
              width: {
                xs: '100%',
                lg: 'auto',
              },
            }}
            required
          >
            <NumberInput
              sx={{ width: '100%' }}
              field={field}
              label="광고비용"
              error={Boolean(errors?.ads?.[index]?.price?.message)}
              helperText={errors?.ads?.[index]?.price?.message ?? ''}
            />
          </FormControl>
        )}
      />
      {channelNeed && (
        <SelectClient
          sx={{
            flex: 1,
            width: {
              xs: '100%',
              lg: 'auto',
            },
          }}
          control={control}
          index={index}
          errorMessage={errors?.ads?.[index]?.clientCode?.message ?? ''}
        />
      )}
      {productNeed && (
        <SelectProductList
          index={index}
          sx={{
            flex: 2,
            width: {
              xs: '100%',
              lg: 'auto',
            },
          }}
          maxLen={1}
          control={control}
          selectedProductList={selectedProductList}
          errorMessage={errors?.ads?.[index]?.productCodeList?.message ?? ''}
        />
      )}
      <IconButton sx={{ mr: 'auto' }} onClick={() => removeAd(index)}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default AdItem;
