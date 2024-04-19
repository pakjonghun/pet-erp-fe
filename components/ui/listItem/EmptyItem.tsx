import { FC } from 'react';
import { Paper, Typography } from '@mui/material';

interface Props {
  isEmpty: boolean;
  message?: string;
}

const EmptyItem: FC<Props> = ({ isEmpty, message = '검색된 데이터가 없습니다.' }) => {
  if (isEmpty)
    return (
      <Paper sx={{ px: 3, py: 2 }}>
        <Typography align="center">{message}</Typography>
      </Paper>
    );

  return <></>;
};

export default EmptyItem;
