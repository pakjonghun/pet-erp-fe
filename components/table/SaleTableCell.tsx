import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box, SxProps, TableCell } from '@mui/material';
import { NumberType } from '@/types';
import { getArrow, getColor, getFixedTwo, getNumberToString } from '@/utils/sale';
import { useReactiveVar } from '@apollo/client';
import { showPrevData } from '@/store/saleStore';

interface Props {
  current: number;
  previous: number;
  numberType?: NumberType;
  sx?: SxProps;
}

const SaleTableCell: FC<Props> = ({ current, previous, numberType = 'currency', sx }) => {
  const currentNumberString = getNumberToString(current, numberType);
  const compareNumber = getFixedTwo(current - previous);
  const compareNumberString = getNumberToString(compareNumber, numberType);

  const isShowPrevData = useReactiveVar(showPrevData);

  return (
    <TableCell sx={{ ...sx }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
      </Box>
    </TableCell>
  );
};

export default SaleTableCell;
