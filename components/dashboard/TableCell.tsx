import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box, TableCell } from '@mui/material';
import { NumberType } from './type';
import { getArrow, getColor, getFixedTwo, getNumberToString } from './utils';

interface Props {
  current: number;
  previous: number;
  numberType?: NumberType;
}

const DashboardTableCell: FC<Props> = ({ current, previous, numberType = 'currency' }) => {
  const currentNumberString = getNumberToString(current, numberType);
  const compareNumber = getFixedTwo(current - previous);
  const compareNumberString = getNumberToString(compareNumber, numberType);

  return (
    <TableCell>
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

export default DashboardTableCell;
