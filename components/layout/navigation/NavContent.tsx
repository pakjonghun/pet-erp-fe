import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { NavMapper } from '../constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavListItem } from '@/components/commonStyles';

const NavContent = () => {
  const pathname = usePathname();

  const navList: (keyof typeof NavMapper)[] = ['', 'back-data', 'sale', 'stock', 'setting'];
  const getSelected = (path: string) => {
    const firstPath = pathname.match(/^\/([^\/]+)/)?.[1] ?? '';
    return firstPath === path;
  };

  return (
    <>
      <Toolbar />
      <List>
        {navList.map((text) => (
          <NavListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                p: 0,
              }}
              selected={getSelected(text)}
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
                href={`/${text}`}
              >
                <ListItemIcon>{NavMapper[text].icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    '& span': {
                      fontSize: '16px',
                      fontWeight: 600,
                    },
                  }}
                  primary={NavMapper[text].label}
                />
              </Stack>
            </ListItemButton>
          </NavListItem>
        ))}
      </List>
    </>
  );
};

export default NavContent;
