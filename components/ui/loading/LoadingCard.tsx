import CommonLoading from '@/components/ui/loading/CommonLoading';
import { Collapse, Grid } from '@mui/material';
import { FC } from 'react';

interface Props {
  isLoading: boolean;
}

const LoadingCard: FC<Props> = ({ isLoading }) => {
  return (
    <Grid item xs={12} lg={6} sx={{ textAlign: 'center' }}>
      <Collapse in={isLoading}>{<CommonLoading />}</Collapse>
    </Grid>
  );
};

export default LoadingCard;
