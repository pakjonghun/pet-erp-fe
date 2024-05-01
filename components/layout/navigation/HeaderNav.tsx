'use client';

import { Stack } from '@mui/material';
import { NavMenus } from '../constants';
import { usePathname } from 'next/navigation';
import { getFirstPath } from '@/utils/common';
import HeaderMenu from '@/components/ui/listItem/HeaderMenu';

const HeaderNav = () => {
  const pathname = usePathname();

  const navList = Object.keys(NavMenus) as (keyof typeof NavMenus)[];
  const getSelected = (path: string) => {
    const firstPath = getFirstPath(pathname);
    return firstPath === path;
  };

  return (
    <Stack
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
      direction="row"
    >
      {navList.map((text) => (
        <HeaderMenu key={text} menuKey={text} selected={getSelected(text)} menu={NavMenus[text]} />
      ))}
    </Stack>
  );
};

export default HeaderNav;
