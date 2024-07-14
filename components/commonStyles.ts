import { SxProps, Tab, Table, TableBody, TableRow, styled } from '@mui/material';

export const modalSizeProps: SxProps = {
  minWidth: {
    xs: 300,
    sm: 400,
  },
  gap: 2,
};

export const NormalTab = styled(Tab)<{ fontSize: number }>(({ theme, fontSize }) => {
  return {
    transition: 'all .3s',
    fontSize,
    '&:hover': theme.palette.action.selected,
    '&.Mui-selected': {
      fontWeight: 800,
    },
  };
});

export const CommonTable = styled(Table)({
  '& th, tr, td': {
    padding: '8px',
    border: '0.5px solid lightGray',
  },
});

export const CommonHeaderRow = styled(TableRow)(({ theme }) => {
  return {
    '& > th': {
      'background-color': theme.palette.primary.light,
      color: 'gray',
    },
  };
});

export const CommonTableBody = styled(TableBody)({
  '& .MuiTableCell-root': {
    padding: '8px',
    fontWeight: 500,
  },
});
