import { FC } from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import SaleCard from '@/components/card/SaleCard';
import { getProfitRate } from '@/utils/sale';
import { useReactiveVar } from '@apollo/client';
import { showPrevSaleData } from '@/store/saleStore';

interface Props {
  productSaleData: ProductSaleMenu;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductSaleCard: FC<Props> = ({ productSaleData, scrollRef }) => {
  const isShowPrevData = useReactiveVar(showPrevSaleData);
  const currentProfit =
    (productSaleData.accPayCost ?? 0) -
    (productSaleData.accWonCost ?? 0) -
    (productSaleData.accDeliveryCost ?? 0);
  const prevProfit =
    (productSaleData.prevAccPayCost ?? 0) -
    (productSaleData.prevAccWonCost ?? 0) -
    (productSaleData.prevAccDeliveryCost ?? 0);

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 2, px: 4 }}>
      <Box>
        <Typography>{`${productSaleData.name} / ${productSaleData.code}`}</Typography>
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="판매수량"
          current={productSaleData?.accCount ?? 0}
          previous={productSaleData?.prevAccCount ?? 0}
          numberType="comma"
        />
        <SaleCard
          isShowPrevData={isShowPrevData}
          label="매출"
          current={productSaleData?.accTotalPayment ?? 0}
          previous={productSaleData?.prevAccTotalPayment ?? 0}
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
          current={getProfitRate(currentProfit, productSaleData?.accPayCost ?? 0)}
          previous={getProfitRate(prevProfit, productSaleData?.prevAccPayCost ?? 0)}
        />
        <Stack>
          <Typography sx={{ mb: 0 }}>{`거래처 : ${
            productSaleData.clients.length === 0 ? '없음' : ''
          }`}</Typography>

          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
            {productSaleData.clients.slice(0, 5).map((client) => {
              if (!!client.name) {
                return (
                  <Chip
                    key={`${client.name}_${client.__typename}`}
                    label={client.name}
                    variant="outlined"
                  />
                );
              }
              return <></>;
            })}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductSaleCard;
