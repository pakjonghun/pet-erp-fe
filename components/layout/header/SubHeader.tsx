import { FC, ReactNode } from 'react';
import { AppBar, Typography } from '@mui/material';

interface Props {
  title: string;
  children?: ReactNode;
}

const SubHeader: FC<Props> = ({ title, children }) => {
  return (
    <AppBar sx={{ color: 'black', bgcolor: 'background.paper', boxShadow: 1 }} position="static">
      <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3 }}>
        {title}
      </Typography>
      {!!children ? children : ''}
    </AppBar>
  );
};

export default SubHeader;
