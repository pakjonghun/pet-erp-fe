import { FC } from 'react';
import { BaseListItem } from './menuStyles';
import ListMenu from './ListMenu';
import { MenuItem } from '@/components/layout/type';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';

interface Props {
  option: string;
  menu: MenuItem;
}

const OptionMenu: FC<Props> = ({ option, menu }) => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];

  const canDisplay =
    !menu.role || !menu.role.length || myRole.some((item) => menu.role?.includes(item));
  if (!canDisplay) return <></>;

  return (
    <BaseListItem variant={option === 'delete' ? 'error' : 'primary'} disablePadding key={option}>
      <ListMenu menu={menu} />
    </BaseListItem>
  );
};

export default OptionMenu;
