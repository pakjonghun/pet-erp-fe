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

  const currentProfit =
    (clientSaleData.accPayCost ?? 0) -
    (clientSaleData.accWonCost ?? 0) -
    (clientSaleData.accDeliveryCost ?? 0);
  const prevProfit =
    (clientSaleData.prevAccPayCost ?? 0) -
    (clientSaleData.prevAccWonCost ?? 0) -
    (clientSaleData.prevAccDeliveryCost ?? 0);

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
          current={clientSaleData?.accTotalPayment ?? 0}
          previous={clientSaleData?.prevAccTotalPayment ?? 0}
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="수익"
          current={currentProfit}
          previous={prevProfit}
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="수익율"
          numberType="percent"
          current={getProfitRate(currentProfit, clientSaleData?.accPayCost ?? 0)}
          previous={getProfitRate(prevProfit, clientSaleData?.prevAccPayCost ?? 0)}
        />
      </Box>
    </Paper>
  );
};

export default ClientSaleCard;
