import { FC } from 'react';
import { OrderValue, SortController } from '@/types';
import SortButton from './SortButton';
import { SxProps } from '@mui/material';

interface Props {
  text: string;
  textValue: string;
  sortController: SortController;
  sx?: SxProps;
}

const HeaderSortButton: FC<Props> = ({
  text,
  textValue,
  sortController: { order, sort, handleSort },
  sx,
}) => {
  const isActive = textValue == sort;
  const nextOrder = (isActive && order == null ? 1 : order * -1) as OrderValue;

  return (
    <SortButton
      sx={sx}
      onClick={() => handleSort(textValue, nextOrder)}
      orderValue={isActive ? order : null}
      text={<>{text}</>}
    />
  );
};

export default HeaderSortButton;
