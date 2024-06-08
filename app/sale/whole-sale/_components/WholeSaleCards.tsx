import { FC, useState } from 'react';
import { WholeSaleItem } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import RemoveWholeSaleModal from './RemoveWholeSaleModal';
import ProductDetailPopover from './WholeSaleDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ProductCard from './WholeSaleCard';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import { CommonListProps } from '@/types';
import { SelectOption } from '@/app/back-data/types';
import EditWholeSaleModal from './EditWholeSaleModal';

interface Props extends CommonListProps<WholeSaleItem> {
  sx?: SxProps;
}

const WholeSaleCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedWholeSale, setSelectedWholeSale] = useState<null | WholeSaleItem>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, wholeSale: WholeSaleItem | null) => {
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
      {selectedWholeSale && (
        <EditWholeSaleModal
          setSelectedWholeSale={setSelectedWholeSale}
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          wholeSale={selectedWholeSale}
        />
      )}
      {selectedWholeSale && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedWholeSale={selectedWholeSale}
        />
      )}

      {data.map((item, index) => {
        const sale = item as unknown as WholeSaleItem;
        const isLast = index === data.length - 1;
        return (
          <Grid key={sale._id} item xs={12} lg={6}>
            <ProductCard
              onClickRow={(event, sale: WholeSaleItem) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedWholeSale(sale);
              }}
              sale={sale}
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

export default WholeSaleCards;
