import { MenuItem } from '@/components/layout/type';
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  menu: MenuItem;
}

const ListMenu: FC<Props> = ({ menu: { icon, label } }) => {
  return (
    <ListItemButton
      sx={{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        p: 0,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          px: 3,
          py: 1,
          height: '100%',
          width: '100%',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          sx={{
            '& span': {
              fontSize: '14px',
              fontWeight: 600,
            },
          }}
          primary={label}
        />
      </Stack>
    </ListItemButton>
  );
};

export default ListMenu;
