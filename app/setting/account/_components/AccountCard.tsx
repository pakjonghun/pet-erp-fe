'use client';

import LabelText from '@/components/ui/typograph/LabelText';
import { getDateFormat } from '@/utils/common';
import { IconButton, Menu, Paper, Stack } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { FC, useState } from 'react';
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import { SelectedAccountOption, SelectedUser } from '../type';
import { SelectedOptionItem } from '@/constants';
import OptionMenu from '@/components/ui/listItem/OptionMenu';

interface Props {
  user: SelectedUser;
  onSelectUser: (option: SelectedAccountOption, user: SelectedUser) => void;
}

const AccountCard: FC<Props> = ({ user, onSelectUser }) => {
  const [optionAnchor, setOptionAnchor] = useState<null | HTMLElement>(null);

  const accountOptionMenus: Record<SelectedAccountOption, SelectedOptionItem> = {
    password: {
      callback: () => {
        onSelectUser('password', user);
        setOptionAnchor(null);
      },
      label: '비밀번호 변경',
      icon: <PhonelinkLockOutlinedIcon />,
    },
    role: {
      callback: () => {
        onSelectUser('role', user);
        setOptionAnchor(null);
      },
      label: '권한 변경',
      icon: <SensorOccupiedOutlinedIcon />,
    },
    delete: {
      callback: () => {
        onSelectUser('delete', user);
        setOptionAnchor(null);
      },
      label: '삭제',
      icon: <DeleteOutlinedIcon />,
    },
  };

  const options = Object.keys(accountOptionMenus) as (keyof typeof accountOptionMenus)[];

  return (
    <Paper sx={{ position: 'relative', px: 4, py: 2 }}>
      <IconButton
        onClick={(event) => setOptionAnchor(event.currentTarget)}
        sx={{ position: 'absolute', right: 3, top: 3 }}
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={optionAnchor}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={Boolean(optionAnchor)}
        onClose={() => setOptionAnchor(null)}
      >
        {[
          options.map((option) => {
            const menu = accountOptionMenus[option];
            return <OptionMenu key={option} menu={menu} option={option} />;
          }),
        ]}
      </Menu>
      <Stack gap={2}>
        <LabelText label="생성일 : " text={getDateFormat(user.createdAt)} />
        <LabelText label="아이디" text={user.id} />
        <LabelText label="권한" text={user.role} />
      </Stack>
    </Paper>
  );
};

export default AccountCard;
