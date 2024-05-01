import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box, SxProps, TableCell } from '@mui/material';
import { NumberType } from '@/types';
import { getArrow, getColor, getFixedTwo, getNumberToString } from '@/utils/sale';

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

  return (
    <TableCell sx={{ ...sx }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography>{currentNumberString}</Typography>
        <Typography variant="subtitle2" sx={{ display: 'flex', color: getColor(compareNumber) }}>
          {getArrow(compareNumber)}
          {compareNumberString}
        </Typography>
      </Box>
    </TableCell>
  );
};

export default SaleTableCell;
