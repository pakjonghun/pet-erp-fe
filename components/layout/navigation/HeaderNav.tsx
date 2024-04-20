'use client';

import { Button, Stack } from '@mui/material';
import { NavMenus } from '../constants';
import { usePathname, useRouter } from 'next/navigation';
import { getFirstPath } from '@/util';
import HeaderMenu from '@/components/ui/listItem/HeaderMenu';
import { useEffect, useState } from 'react';

const HeaderNav = () => {
  const pathname = usePathname();

  const navList = Object.keys(NavMenus) as (keyof typeof NavMenus)[];
  const getSelected = (path: string) => {
    const firstPath = getFirstPath(pathname);
    return firstPath === path;
  };
  const [a, setA] = useState(false);

  const rou = useRouter();
  useEffect(() => {
    //
  }, [a, rou]);

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
      <Button
        variant="contained"
        onClick={() => {
          rou.replace('/login');
          setA((prev) => !prev);
        }}
      >
        zzz
      </Button>
      {navList.map((text) => (
        <HeaderMenu key={text} menuKey={text} selected={getSelected(text)} menu={NavMenus[text]} />
      ))}
    </Stack>
  );
};

export default HeaderNav;
