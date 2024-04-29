import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { getKCWFormat } from '@/util';

interface Props {
  label: string;
  payCost?: number | null;
  count?: number | null;
  profit?: number | null;
  profitRate?: number | null;
  beforePayCost?: number | null;
}

const DashboardCard: FC<Props> = ({ count, label, payCost, profit, profitRate, beforePayCost }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        height: '100%',
        minWidth: 200,
        borderRadius: 1,
        p: 2,
      }}
    >
      <CardContent>
        <Typography component="div" variant="subtitle1">
          {label}
        </Typography>
        <Typography component="div" variant="h5">
          {getKCWFormat(payCost ?? 0)}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <ArrowUpwardIcon />
          {`${getKCWFormat(beforePayCost ?? 0)}`}
        </Typography>

        <Stack sx={{ width: '100%', mt: 2 }} direction="row" gap={5} justifyContent="space-between">
          <Typography variant="body1" color="text.secondary" component="div">
            {`수량 ${getKCWFormat(count ?? 0)}`}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {`수익 ${getKCWFormat(profit ?? 0)}`}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {`수익율 ${profitRate ?? 0}%`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
