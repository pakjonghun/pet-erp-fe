import { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
interface Props {
  children: ReactNode;
}

const DashboardCard: FC<Props> = ({ children }) => {
  return (
    <Card
      sx={{
        height: '100%',
        minWidth: 100,
        borderRadius: 1,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
