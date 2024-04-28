'use client';

import { FC, useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { DateRange } from './type';
import { dateFilterOptions } from './constants';
import { getStringRange } from './utils';

interface Props {
  anchor: {
    open: boolean;
    onClose: () => void;
    anchorEl: null | HTMLElement;
  };
  date: {
    range: DateRange;
    setRange: (range: DateRange) => void;
  };
}

const CommonDateFilter: FC<Props> = ({ anchor, date }) => {
  const [selectedDateOption, setSelectedDateOption] = useState('이번달');
  const [from, setForm] = useState<Dayjs>(() => date.range.from);
  const [to, setTo] = useState<Dayjs>(() => date.range.to);
  const [canDateControl, setCanDateControl] = useState(false);

  const setRange = (getRange: () => { from: Dayjs; to: Dayjs }) => {
    setCanDateControl(false);
    const { from, to } = getRange();
    setForm(from);
    setTo(to);
  };

  return (
    <Menu
      {...anchor}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            p: 2,
            overflow: 'visible',
          },
        },
      }}
    >
      <Stack direction="row" sx={{ overflow: 'auto', maxWidth: 830 }}>
        <Box sx={{ width: 100, borderRight: '1px solid lightGray' }}>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontWeight: 800,
              py: 1,
              borderBottom: '0.5px solid lightGray',
              color: 'text.secondary',
            }}
          >
            날짜 조회
          </Typography>
          {dateFilterOptions.map(({ callback, title }) => (
            <MenuItem
              selected={title === selectedDateOption}
              onClick={() => {
                if (callback) setRange(callback);
                if (!callback) setCanDateControl(true);
                setSelectedDateOption(title);
              }}
              key={title}
            >
              {title}
            </MenuItem>
          ))}
        </Box>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              py: 1,
              borderBottom: '1px solid lightGray',
              textAlign: 'center',
              width: '100%',
              fontWeight: 800,
              color: 'text.secondary',
            }}
          >
            {getStringRange({ from, to })}
          </Typography>
          <Stack direction="row">
            <Stack sx={{ pt: 3, px: 3 }}>
              <Typography sx={{ ml: 2, color: 'gray' }}>시작날짜</Typography>
              <DateCalendar
                shouldDisableDate={() => !canDateControl}
                disabled={!canDateControl}
                value={from}
                onChange={(value) => setForm(value)}
              />
            </Stack>
            <Stack sx={{ pt: 3, px: 3 }}>
              <Typography sx={{ ml: 2, color: 'gray' }}>종료날짜</Typography>
              <DateCalendar
                shouldDisableDate={() => !canDateControl}
                disabled={!canDateControl}
                value={to}
                onChange={(value) => setTo(value)}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{ mt: 3, px: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <Button onClick={anchor.onClose} variant="outlined" sx={{ mr: 1 }}>
          취소
        </Button>
        <Button
          onClick={() => {
            date.setRange({ from, to });
            anchor.onClose();
          }}
          variant="contained"
        >
          적용
        </Button>
      </Stack>
    </Menu>
  );
};

export default CommonDateFilter;
