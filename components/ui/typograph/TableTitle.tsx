import { SxProps, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  title: string;
  sx?: SxProps;
}

const TableTitle: FC<Props> = ({ title, sx }) => {
  return (
    <Typography noWrap sx={{ pb: 2, pt: 3, ...sx }} variant="h6">
      {title}
    </Typography>
  );
};

export default TableTitle;
