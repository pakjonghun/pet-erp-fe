import { Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  title: string;
}

const TableTitle: FC<Props> = ({ title }) => {
  return (
    <Typography sx={{ p: 2 }} variant="h6">
      {title}
    </Typography>
  );
};

export default TableTitle;
