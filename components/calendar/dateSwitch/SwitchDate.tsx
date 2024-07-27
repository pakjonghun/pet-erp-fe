'use client';

import { FC, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SearchStandard, Direction } from './types';
import { searchStandardList } from './constants';
import { getDateValueByStandard, getNextDayjsObj, getStandardDayjsObj } from './utils';
import CommonDateFilter from '../dateFilter/CommonDateFilter';
import { DateRange } from '../dateFilter/type';
import { getStringRange } from '../dateFilter/utils';

interface Props {
  dateRange: DateRange;
  setDateRange: (value: DateRange) => void;
  searchStandard: SearchStandard;
  setSearchStandard: (value: SearchStandard) => void;
  sx?: SxProps;
}

const SwitchDate: FC<Props> = ({
  dateRange: range,
  searchStandard,
  setDateRange: setRange,
  setSearchStandard,
  sx,
}) => {
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  const handleChangeStandard = (event: SelectChangeEvent<SearchStandard>) => {
    const value = event.target.value as SearchStandard;
    setSearchStandard(value);
    const nextDateObj = getStandardDayjsObj(value, range.from);
    setRange(nextDateObj);
  };

  const handleClickDateArrow = (direction: Direction) => {
    const nextDateObj = getNextDayjsObj(searchStandard, range.from, direction);
    setRange(nextDateObj);
  };

  const dateValue = getDateValueByStandard(searchStandard, range.from);

  return (
    <Stack direction="column" alignItems="flex-start" mr={3} gap={1} sx={{ ...sx }}>
      <CommonDateFilter
        anchor={{
          open: !!filterAnchor,
          anchorEl: filterAnchor,
          onClose: () => setFilterAnchor(null),
        }}
        date={{
          range,
          setRange,
        }}
      />
      <Stack
        sx={{ cursor: 'pointer' }}
        onClick={(e) => setFilterAnchor(e.currentTarget)}
        direction="row"
        gap={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography>{getStringRange(range)}</Typography>
      </Stack>

      <Stack justifyContent="flex-end" alignItems="center" direction="row" gap={1}>
        <IconButton onClick={() => handleClickDateArrow('left')}>
          <ArrowBackIosIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
        <Typography fontWeight={500}>{dateValue}</Typography>
        <Box>
          <FormControl
            sx={{
              minWidth: 80,
            }}
          >
            <Select
              size="small"
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchStandard}
              onChange={handleChangeStandard}
            >
              {searchStandardList.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <IconButton onClick={() => handleClickDateArrow('right')}>
          <ArrowForwardIosIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default SwitchDate;
