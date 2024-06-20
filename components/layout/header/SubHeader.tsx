'use client';

import { FC, ReactNode } from 'react';
import { AppBar, Stack, SxProps, Typography, keyframes, makeStyles, styled } from '@mui/material';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useLoadSabangData } from '@/http/graphql/hooks/sale/useSabang';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';

interface Props {
  title: string;
  sx?: SxProps;
  children?: ReactNode;
}

const SubHeader: FC<Props> = ({ title, children, sx }) => {
  const [loadSabangData, { loading }] = useLoadSabangData();

  const handleClickLoadSabang = async () => {
    loadSabangData({
      onCompleted: async (res) => {
        setTimeout(() => {
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'wholeSales' });
              cache.evict({ fieldName: 'dashboardProduct' });
              cache.evict({ fieldName: 'dashboardProducts' });
              cache.evict({ fieldName: 'dashboardClients' });
              cache.evict({ fieldName: 'dashboardClient' });
              cache.evict({ fieldName: 'stocks' });
              cache.evict({ fieldName: 'stocksState' });
              cache.evict({ fieldName: 'productCountStocks' });
              cache.evict({ fieldName: 'productSales' });
              cache.evict({ fieldName: 'productSale' });
              cache.evict({ fieldName: 'topClients' });
            },
          });
        }, 2000);
        snackMessage({ message: '오늘 사방넷 데이터를 모두 받아왔습니다.', severity: 'success' });
      },
      onError: () => {
        snackMessage({ message: '오늘 사방넷 데이터를 모두 받아왔습니다.', severity: 'success' });
      },
    });
  };

  return (
    <AppBar
      sx={{
        color: 'black',
        bgcolor: 'primary.light',
        boxShadow: 1,
        ...sx,
      }}
      position="static"
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3, pb: 1 }}>
          {title}
        </Typography>

        <Button
          disabled={loading}
          onClick={handleClickLoadSabang}
          color="inherit"
          sx={{ width: 'fit-content', ml: 'auto', mr: 1 }}
          variant="outlined"
          endIcon={<RotatingIcon loading={loading} />}
        >
          사방넷
        </Button>
      </Stack>
      {!!children ? children : ''}
    </AppBar>
  );
};

export default SubHeader;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingIcon = styled(RefreshIcon)<{ loading: boolean }>(({ loading }) => ({
  animation: loading ? `${rotate} 1s linear infinite` : 'none',
}));
