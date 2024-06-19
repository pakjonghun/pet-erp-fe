import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import SaleCard from '@/components/card/SaleCard';
import { getProfitRate } from '@/utils/sale';

interface Props {
  clientSaleData: SaleInfos;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ClientSaleCard: FC<Props> = ({ clientSaleData, scrollRef }) => {
  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Box>
        <Typography>{clientSaleData.name}</Typography>
        <SaleCard
          label="판매수량"
          current={clientSaleData?.accCount ?? 0}
          previous={clientSaleData?.prevAccCount ?? 0}
          numberType="comma"
        />
        <SaleCard
          label="매출"
          current={clientSaleData?.accPayCost ?? 0}
          previous={clientSaleData?.prevAccPayCost ?? 0}
        />
        <SaleCard
          label="수익"
          current={clientSaleData?.accProfit ?? 0}
          previous={clientSaleData?.prevAccProfit ?? 0}
        />
        <SaleCard
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
