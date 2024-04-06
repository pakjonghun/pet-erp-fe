import { List, Toolbar } from '@mui/material';
import React from 'react';
import { NavMenus } from '../constants';

import { usePathname } from 'next/navigation';
import { NavListItem } from '@/components/ui/listItem/menuStyles';
import { getFirstPath } from '@/util';
import NavMenu from '@/components/ui/listItem/NavMenu';

const NavContent = () => {
  const pathname = usePathname();

  const navList = Object.keys(NavMenus) as (keyof typeof NavMenus)[];
  const getSelected = (path: string) => {
    const firstPath = getFirstPath(pathname);
    return firstPath === path;
  };

  return (
    <>
      <Toolbar />
      <List>
        {navList.map((text) => (
          <NavListItem key={text} disablePadding>
            <NavMenu menuKey={text} selected={getSelected(text)} menu={NavMenus[text]} />
          </NavListItem>
        ))}
      </List>
    </>
  );
};

export default NavContent;
