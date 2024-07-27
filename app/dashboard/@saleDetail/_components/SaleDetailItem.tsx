import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import { Grid, Stack, Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import TotalSaleText from '../../_components/TotalSaleText';
import { getParsedSaleData, getProfit, getProfitRate } from '@/utils/sale';

interface Props {
  scrollRef?: Dispatch<SetStateAction<null | HTMLElement>>;
  index: number;
  data: ClientSaleMenu;
  isSelected: boolean;
  onClickItem: (item: ClientSaleMenu) => void;
}

const SaleDetailItem: FC<Props> = ({ isSelected, index, data, scrollRef, onClickItem }) => {
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
      }}
    >
      <Grid sx={{ placeContent: 'center' }} item xs={4}>
        <Stack direction="row" gap={1}>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>{index}</Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>{data.name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="caption" color="GrayText">
          <TotalSaleText
            hasFullText
            saleInfo={getParsedSaleData({
              accCount: data.accCount ?? 0,
              accProfit: profit,
              accProfitRate: getProfitRate(profit, data.accPayCost ?? 0),
              accTotalPayment: data.accTotalPayment ?? 0,
            })}
          />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SaleDetailItem;
