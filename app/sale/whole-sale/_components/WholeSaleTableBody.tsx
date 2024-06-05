import { FC, useState } from 'react';
import { WholeSaleItem } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import WholeSaleBodyRow from './WholeSaleBodyRow';
import RemoveWholeSaleModal from './RemoveWholeSaleModal';
import ProductDetailPopover from './WholeSaleDetailPopover';
import LoadingRow from '@/components/table/LoadingRow';
import { WholeSaleHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import { SelectOption } from '@/app/back-data/types';
import EditWholeSaleModal from './EditWholeSaleModal';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<WholeSaleItem> {}

const WholeSaleTableBody: FC<Props> = ({
  data,
  isLoading,
  isEmpty,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedWholeSale, setSelectedWholeSale] =
    useState<null | WholeSaleItem>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (
    option: SelectOption | null,
    wholeSale: WholeSaleItem | null
  ) => {
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
    <CommonTableBody>
      {selectedWholeSale && (
        <RemoveWholeSaleModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedWholeSale={selectedWholeSale}
        />
      )}

      {selectedWholeSale && (
        <EditWholeSaleModal
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
      <EmptyRow colSpan={WholeSaleHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const sale = item as unknown as WholeSaleItem;
        const isLast = index === data.length - 1;
        return (
          <WholeSaleBodyRow
            key={`${sale.__typename}_${index}`}
            onClickRow={(event, sale: WholeSaleItem) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedWholeSale(sale);
            }}
            wholeSale={sale}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={WholeSaleHeaderList.length} />
    </CommonTableBody>
  );
};

export default WholeSaleTableBody;
