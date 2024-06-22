import { FC } from 'react';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import { CommonListProps } from '@/types';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import ClientSaleCard from './ClientSaleCard';

interface Props extends CommonListProps<SaleInfos> {
  sx?: SxProps;
}

const ClientSaleCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  return (
    <Grid
      sx={{
        ...sx,
        px: 2,
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
          <Grid key={`${item.name}_${index}`} item xs={12} lg={6}>
            <ClientSaleCard clientSaleData={item} scrollRef={isLast ? scrollRef : null} />
          </Grid>
        );
      })}
      <LoadingCard isLoading={isLoading} />
    </Grid>
  );
};

export default ClientSaleCards;
