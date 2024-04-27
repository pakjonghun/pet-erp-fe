import { FC } from 'react';
import { BaseListItem } from './menuStyles';
import ListMenu from './ListMenu';
import { MenuItem } from '@/components/layout/type';

interface Props {
  option: string;
  menu: MenuItem;
}

const OptionMenu: FC<Props> = ({ option, menu }) => {
  return (
    <BaseListItem variant={option === 'delete' ? 'error' : 'primary'} disablePadding key={option}>
      <ListMenu menu={menu} />
    </BaseListItem>
  );
};

export default OptionMenu;
