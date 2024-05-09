import { SxProps, Tab, styled } from '@mui/material';

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
