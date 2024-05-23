import { FC, useState } from 'react';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ProductStockCard from './ProductStockCard';
import LoadingCard from '../../../../components/ui/loading/LoadingCard';
import { CommonListProps } from '@/types';
import AddProductStockModal from './AddProductStockModal';
import OutProductStockModal from './OutProductStockModal';
import { SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';

interface Props extends CommonListProps<SubsidiaryStockColumn> {
  sx?: SxProps;
}

const ProductStockCards: FC<Props> = ({ isLoading, isEmpty, data, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [productStock, setProductStock] = useState<null | SubsidiaryStockColumn>(null);

  const handleClickOption = (option: any | null, client: SubsidiaryStockColumn | null) => {
    setProductStock(client);
    if (option == 'add') {
      setOpenAddStock(true);
    }

    if (option == 'out') {
      setOpenOutStock(true);
    }
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

  const [openAddStock, setOpenAddStock] = useState(false);
  const [openOutStock, setOpenOutStock] = useState(false);

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
        <AddProductStockModal
          productStock={productStock}
          open={openAddStock}
          onClose={() => setOpenAddStock(false)}
        />
      )}
      {productStock?.productName && (
        <OutProductStockModal
          productStock={productStock}
          open={openOutStock}
          onClose={() => setOpenOutStock(false)}
        />
      )}

      {data.map((item, index) => {
        const stock = item as unknown as SubsidiaryStockColumn;
        const isLast = index === data.length - 1;
        return (
          <Grid key={`${stock.__typename}_${index}`} item xs={12} lg={6}>
            <ProductStockCard
              onClickRow={(event, stock: SubsidiaryStockColumn) => {
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
