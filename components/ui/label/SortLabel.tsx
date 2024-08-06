import { FC, ReactNode } from 'react';
import { IconButton, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Order } from '@/http/graphql/codegen/graphql';

interface Props {
  order?: Order;
  children: ReactNode;
  onSort: () => void;
}

const SortLabel: FC<Props> = ({ order, children, onSort }) => {
  const getIcon = () => {
    switch (order) {
      case Order.Desc:
        return <ArrowDownwardIcon sx={{ width: 16, height: 16 }} />;
      case Order.Asc:
        return <ArrowUpwardIcon sx={{ width: 16, height: 16 }} />;
      default:
        return <ReorderIcon sx={{ width: 16, height: 16 }} />;
    }
  };

  return (
    <Stack direction="row" gap={0.3} alignItems="center">
      {children}
      <IconButton onClick={onSort} disableRipple size="small">
        {getIcon()}
      </IconButton>
    </Stack>
  );
};

export default SortLabel;
