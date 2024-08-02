import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import { Grid, Stack, Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import TotalSaleText from '../../_components/TotalSaleText';
import { getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';

interface Props {
  scrollRef?: Dispatch<SetStateAction<null | HTMLElement>>;
  index: number;
  data: ProductSaleMenu;
  isSelected: boolean;
  onClickItem: (item: ProductSaleMenu) => void;
}

const ProductSaleDetailItem: FC<Props> = ({ isSelected, index, data, scrollRef, onClickItem }) => {
  const profit = getProfit({
    accPayCost: data.accPayCost,
    accWonCost: data.accWonCost,
    accDeliveryCost: data.accDeliveryCost,
  });

  return (
    <Grid
      onClick={() => onClickItem(data)}
      ref={scrollRef}
      container
      sx={{
        py: 2,
        cursor: 'pointer',
        bgcolor: (theme) => (isSelected ? theme.palette.action.selected : ''),
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid sx={{ placeContent: 'center' }} item xs={4} sm={3}>
        <Stack direction="row" sx={{ gap: { xs: 1, sm: 2 } }}>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>{index}</Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>{data.name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={8} sm={9}>
        <Typography variant="caption" color="GrayText">
          <TotalSaleText
            hasFullText
            saleInfo={getParsedSaleData({
              accCount: data.accCount ?? 0,
              accProfit: profit,
              accProfitRate: getProfitRate(profit, data.accTotalPayment ?? 0),
              accTotalPayment: data.accTotalPayment ?? 0,
            })}
          />
        </Typography>
        <Stack
          flexWrap="wrap"
          gap={1}
          direction="row"
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <Typography variant="caption" color="GrayText">
            Top3 거래처
          </Typography>
          {data.clients.slice(0, 3).map((p, index) => {
            return (
              <Stack key={p.name} direction="row" gap={0.2}>
                <Typography color="GrayText" variant="caption">
                  {index + 1}
                </Typography>
                <Typography
                  color="GrayText"
                  variant="caption"
                >{`${p.name}(${p.accCount}EA)`}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductSaleDetailItem;