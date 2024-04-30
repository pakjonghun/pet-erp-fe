import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { NumberType } from './type';
import { getArrow, getColor, getFixedTwo, getNumberToString } from './utils';

interface Props {
  label: string;
  current: number;
  previous: number;
  numberType?: NumberType;
}

const DashboardCard: FC<Props> = ({ label, current, previous, numberType = 'currency' }) => {
  const currentNumberString = getNumberToString(current, numberType);
  const compareNumber = getFixedTwo(current - previous);
  const compareNumberString = getNumberToString(compareNumber, numberType);

  return (
    <Card
      sx={{
        display: 'flex',
        height: '100%',
        minWidth: 100,
        borderRadius: 1,
      }}
    >
      <CardContent>
        <Typography component="div" variant="subtitle1">
          {label}
        </Typography>
        <Stack direction="column" flexWrap="wrap" gap={1}>
          <Typography component="div" variant="h6">
            {currentNumberString}
          </Typography>
          <Typography sx={{ display: 'flex', color: getColor(compareNumber) }}>
            {getArrow(compareNumber)}
            {compareNumberString}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
