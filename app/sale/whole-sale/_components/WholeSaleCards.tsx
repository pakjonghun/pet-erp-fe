import { FC, useState } from 'react';
import { Product, Sale, WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import RemoveWholeSaleModal from './RemoveWholeSaleModal';
import EditProductModal from './EditProductModal';
import ProductDetailPopover from './WholeSaleDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ProductCard from './ProductCard';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import { CommonListProps } from '@/types';
import { SelectOption } from '@/app/back-data/types';

interface Props extends CommonListProps<WholeSaleOutput> {
  sx?: SxProps;
}

const WholeSaleCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedWholeSale, setSelectedWholeSale] = useState<null | WholeSaleOutput>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, wholeSale: WholeSaleOutput | null) => {
    setSelectedWholeSale(wholeSale);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedWholeSale);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedWholeSale);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedWholeSale(null);
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

      {selectedWholeSale && (
        <RemoveWholeSaleModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedWholeSale={selectedWholeSale}
        />
      )}
      {/* {selectedWholeSale && (
        <EditProductModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedProduct={selectedWholeSale}
        />
      )} */}
      {/* {selectedWholeSale && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedProduct={selectedWholeSale}
        />
      )} */}

      {/* {data.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === data.length - 1;
        return (
          <Grid key={product._id} item xs={12} lg={6}>
            <ProductCard
              onClickRow={(event, product: Product) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedWholeSale(product);
              }}
              product={product}
              scrollRef={isLast ? scrollRef : null}
              onClickOption={handleClickOption}
            />
          </Grid>
        );
      })} */}
      <LoadingCard isLoading={isLoading} />
    </Grid>
  );
};

export default WholeSaleCards;
