import { ListItem, styled } from '@mui/material';

export const BaseListItem = styled(ListItem)(({ theme }) => ({
  p: 0,
  m: 0,
  color: theme.palette.grey[600],
  transition: 'all 300ms',
  '&:hover': {
    color: theme.palette.primary.main,
    svg: {
      color: theme.palette.primary.main,
    },
    span: {
      fontWeight: 800,
    },
    '& .Mui-selected': {
      bgcolor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      svg: {
        color: theme.palette.primary.main,
      },
      span: {
        fontWeight: 800,
      },
    },
  },
}));

export const NavListItem = styled(BaseListItem)({
  '&:hover': {
    transform: 'translate(20px, 0)',
  },
});
