import { FC, ReactNode } from 'react';
import { Button, SxProps } from '@mui/material';
import HeadSortIcon from '../icon/HeaderSortIcon';
import { OrderValue } from '@/types';

interface Props {
  text: ReactNode;
  orderValue: OrderValue | null;
  onClick: () => void;
  sx?: SxProps;
}

const SortButton: FC<Props> = ({ text, orderValue, onClick, sx }) => {
  return (
    <Button
      color="inherit"
      variant="text"
      sx={{
        ...sx,
        fontWeight: 'inherit',
        justifyContent: 'flex-start',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
      onClick={onClick}
    >
      {text}
      <HeadSortIcon orderValue={orderValue} />
    </Button>
  );
};

export default SortButton;
