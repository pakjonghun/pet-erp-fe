import { FC } from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import SaleCard from '@/components/card/SaleCard';
import { getProfitRate } from '@/utils/sale';

interface Props {
  productSaleData: ProductSaleData;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductSaleCard: FC<Props> = ({ productSaleData, scrollRef }) => {
  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <Box>
        <Typography>{productSaleData.name}</Typography>
        <SaleCard
          label="판매수량"
          current={productSaleData.sales?.accCount ?? 0}
          previous={productSaleData.sales?.prevAccCount ?? 0}
          numberType="comma"
        />
        <SaleCard
          label="매출"
          current={productSaleData.sales?.accPayCost ?? 0}
          previous={productSaleData.sales?.prevAccPayCost ?? 0}
        />
        <SaleCard
          label="수익"
          current={productSaleData.sales?.accProfit ?? 0}
          previous={productSaleData.sales?.prevAccProfit ?? 0}
        />
        <SaleCard
          label="수익율"
          numberType="percent"
          current={getProfitRate(
            productSaleData?.sales?.accProfit ?? 0,
            productSaleData?.sales?.accPayCost ?? 0
          )}
          previous={getProfitRate(
            productSaleData?.sales?.prevAccProfit ?? 0,
            productSaleData?.sales?.prevAccPayCost ?? 0
          )}
        />
        <Stack>
          <Typography sx={{ mb: 2 }}>{`TOP 5 거래처 : ${
            productSaleData.clients.length === 0 ? '없음' : ''
          }`}</Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {productSaleData.clients.slice(0, 5).map((client) => {
              if (!!client._id?.mallId) {
                return (
                  <Chip
                    key={`${client._id.mallId}_${client._id.productCode}`}
                    label={client._id.mallId}
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
