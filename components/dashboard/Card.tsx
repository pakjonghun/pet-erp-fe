import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface Props {
  label: string;
  content: string;
  beforeContent: string;
}

const DashboardCard: FC<Props> = ({ label, content, beforeContent }) => {
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
            {content}
          </Typography>
          <Typography sx={{ display: 'flex' }}>
            <ArrowUpwardIcon />
            {beforeContent}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
