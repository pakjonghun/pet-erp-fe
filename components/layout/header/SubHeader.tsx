'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { AppBar, Stack, SxProps, Typography, keyframes, makeStyles, styled } from '@mui/material';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useLoadSabangData } from '@/http/graphql/hooks/sale/useSabang';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import { useGetMyInfo } from '@/http/graphql/hooks/users/useGetMyInfo';
import { UserRole } from '@/http/graphql/codegen/graphql';

interface Props {
  title: string;
  sx?: SxProps;
  children?: ReactNode;
}

const SubHeader: FC<Props> = ({ title, children, sx }) => {
  const { data: userData } = useGetMyInfo();
  const myRole = userData?.myInfo.role ?? [];
  const canSaleOut = myRole.includes(UserRole.StockSaleOut);
  const [loadSabangData, { loading }] = useLoadSabangData();
  const [delayLoading, setDelayLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDelayLoading(loading);
      }, 2000);
    } else {
      setDelayLoading(loading);
    }
  }, [loading]);

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
          snackMessage({
            message: '사방넷 데이터 판매 분량이 출고 처리되었습니다.',
            severity: 'success',
          });
        }, 2000);
      },
      onError: (error) => {
        snackMessage({
          message: error.message ?? '사방넷 데이터 판매 분량이 출고 처리가 실패했습니다.',
          severity: 'error',
        });
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
      {canSaleOut && (
        <Stack direction="row" alignItems="center">
          <Typography variant="h4" component="h4" sx={{ fontWeight: 600, p: 3, pb: 1 }}>
            {title}
          </Typography>

          <Button
            disabled={delayLoading}
            onClick={handleClickLoadSabang}
            color="inherit"
            sx={{ width: 'fit-content', ml: 'auto', mr: 1 }}
            variant="outlined"
            endIcon={<RotatingIcon loading={delayLoading} />}
          >
            사방넷 판매 출고
          </Button>
        </Stack>
      )}
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
