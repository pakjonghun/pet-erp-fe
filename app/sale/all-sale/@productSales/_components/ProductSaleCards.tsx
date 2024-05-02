import { FC } from 'react';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import { CommonListProps } from '@/types';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import ProductSaleCard from './ProductSaleCard';

interface Props extends CommonListProps<ProductSaleData> {
  sx?: SxProps;
}

const ProductSaleCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  return (
    <Grid
      sx={{
        ...sx,
        p: 2,
        maxHeight: TABLE_MAX_HEIGHT,
        overflow: 'auto',
      }}
      container
      spacing={2}
    >
      <EmptyItem isEmpty={isEmpty} />

      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <Grid key={item._id} item xs={12} lg={6}>
            <ProductSaleCard productSaleData={item} scrollRef={isLast ? scrollRef : null} />
          </Grid>
        );
      })}
      <LoadingCard isLoading={isLoading} />
    </Grid>
  );
};

export default ProductSaleCards;
