import { MenuItem } from '@/components/layout/type';
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  selected: boolean;
  menuKey: string;
  menu: MenuItem;
}

const NavMenu: FC<Props> = ({ selected, menuKey, menu: { icon, label, role } }) => {
  return (
    <ListItemButton
      sx={{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        p: 0,
      }}
      selected={selected}
    >
      <Stack
        direction="row"
        alignItems="center"
        component={Link}
        sx={{
          px: 4,
          py: 2,
          height: '100%',
          width: '100%',
          textDecoration: 'none',
          color: 'inherit',
        }}
        href={`/${menuKey}`}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          sx={{
            '& span': {
              fontSize: '16px',
              fontWeight: 600,
            },
          }}
          primary={label}
        />
      </Stack>
    </ListItemButton>
  );
};

export default NavMenu;
