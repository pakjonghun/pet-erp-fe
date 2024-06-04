import { Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  title: string;
}

const TableTitle: FC<Props> = ({ title }) => {
  return (
    <Typography noWrap sx={{ pb: 2, pt: 3 }} variant="h6">
      {title}
    </Typography>
  );
};

export default TableTitle;
