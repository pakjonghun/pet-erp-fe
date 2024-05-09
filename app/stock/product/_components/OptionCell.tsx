import { FC } from 'react';
import Cell from '@/components/table/Cell';
import { IconButton, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Props {
  onClick: (elem: HTMLElement) => void;
}

const OptionCell: FC<Props> = ({ onClick }) => {
  return (
    <>
      <Cell sx={{ minWidth: 50 }}>
        <IconButton onClick={(event) => onClick(event.currentTarget)}>
          <MoreHorizIcon />
        </IconButton>
      </Cell>
    </>
  );
};

export default OptionCell;
