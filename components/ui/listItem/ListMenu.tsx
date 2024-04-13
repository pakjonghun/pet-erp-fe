import { FC } from 'react';
import { MenuItem } from '@/components/layout/type';
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';

interface Props {
  menu: MenuItem;
  direction?: 'horizontal' | 'vertical';
}

const ListMenu: FC<Props> = ({ direction = 'vertical', menu: { icon, label, callback } }) => {
  if (direction === 'vertical') {
    return (
      <ListItemButton
        onClick={callback}
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
  } else {
    return <></>;
  }
};

export default ListMenu;
