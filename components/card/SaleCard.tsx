import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Stack, SxProps } from '@mui/material';
import { NumberType } from '@/types';
import { getArrow, getColor, getFixedTwo, getNumberToString } from '@/utils/sale';

interface Props {
  current: number;
  previous: number;
  label: string;
  isShowPrevData?: boolean;
  numberType?: NumberType;

  sx?: SxProps;
}

const SaleCard: FC<Props> = ({
  label,
  current,
  previous,
  numberType = 'currency',
  isShowPrevData = false,
}) => {
  const currentNumberString = getNumberToString(current, numberType);
  const compareNumber = getFixedTwo(current - previous);
  const compareNumberString = getNumberToString(compareNumber, numberType);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 3, my: 1 }}>
      <Typography>{label}</Typography>
      <Stack direction="row" gap={2}>
        <Typography>{currentNumberString}</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            display: isShowPrevData ? 'flex' : 'none',
            alignItems: 'center',
            color: getColor(compareNumber),
          }}
        >
          {getArrow(compareNumber)}
          {compareNumberString}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SaleCard;
