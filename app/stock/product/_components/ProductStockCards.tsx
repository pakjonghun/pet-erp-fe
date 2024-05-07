import { FC, useState } from 'react';
import {
  ProductSaleChartOutput,
  TotalProductStockOutput,
} from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import ProductStockDetailPopover from './ClientDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ProductStockCard from './ProductStockCard';
// import { SelectOption } from '../../types';
import LoadingCard from '../../../../components/ui/loading/LoadingCard';
import EditPClientModal from './EditPClientModal';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<TotalProductStockOutput> {
  sx?: SxProps;
}

const ProductStockCards: FC<Props> = ({
  isLoading,
  isEmpty,
  data,
  scrollRef,
  sx,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [productStock, setProductStock] =
    useState<null | TotalProductStockOutput>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (
    option: any | null,
    client: TotalProductStockOutput | null
  ) => {
    setProductStock(client);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', productStock);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', productStock);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setProductStock(null);
  };

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

      {productStock && (
        <ProductStockDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          productStock={productStock}
        />
      )}

      {data.map((item, index) => {
        const stock = item as unknown as TotalProductStockOutput;
        const isLast = index === data.length - 1;
        return (
          <Grid key={stock._id} item xs={12} lg={6}>
            <ProductStockCard
              onClickRow={(event, stock: TotalProductStockOutput) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setProductStock(stock);
              }}
              stock={stock}
              scrollRef={isLast ? scrollRef : null}
              onClickOption={handleClickOption}
            />
          </Grid>
        );
      })}
      <LoadingCard isLoading={isLoading} />
    </Grid>
  );
};

export default ProductStockCards;
