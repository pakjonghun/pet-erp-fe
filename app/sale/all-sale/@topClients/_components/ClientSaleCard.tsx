import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import SaleCard from '@/components/card/SaleCard';
import { getProfitRate } from '@/utils/sale';
import { useReactiveVar } from '@apollo/client';
import { showPrevSaleData } from '@/store/saleStore';

interface Props {
  clientSaleData: ClientSaleMenu;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientSaleCard: FC<Props> = ({ clientSaleData, scrollRef }) => {
  const isShowPrevData = useReactiveVar(showPrevSaleData);
  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 1, px: 4 }}>
      <Box>
        <Typography>{clientSaleData.name}</Typography>
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="판매수량"
          current={clientSaleData?.accCount ?? 0}
          previous={clientSaleData?.prevAccCount ?? 0}
          numberType="comma"
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="매출"
          current={clientSaleData?.accPayCost ?? 0}
          previous={clientSaleData?.prevAccPayCost ?? 0}
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="수익"
          current={clientSaleData?.accProfit ?? 0}
          previous={clientSaleData?.prevAccProfit ?? 0}
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="수익율"
          numberType="percent"
          current={getProfitRate(clientSaleData?.accProfit ?? 0, clientSaleData?.accPayCost ?? 0)}
          previous={getProfitRate(
            clientSaleData?.prevAccProfit ?? 0,
            clientSaleData?.prevAccPayCost ?? 0
          )}
        />
      </Box>
    </Paper>
  );
};

export default ClientSaleCard;
