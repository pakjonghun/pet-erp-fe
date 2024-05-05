import { FC, useState } from 'react';
import { Product, Sale, WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './WholeSaleBodyRow';
import RemoveWholeSaleModal from './RemoveWholeSaleModal';
import EditProductModal from './EditProductModal';
import ProductDetailPopover from './WholeSaleDetailPopover';
import LoadingRow from '@/components/table/LoadingRow';
import { WholeSaleHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import { SelectOption } from '@/app/back-data/types';

interface Props extends CommonListProps<Sale> {}

const WholeSaleTableBody: FC<Props> = ({ data, isLoading, isEmpty, scrollRef }) => {
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
    <TableBody>
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
      {/* {selectedProduct && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedProduct={selectedProduct}
        />
      )} */}
      <EmptyRow colSpan={WholeSaleHeaderList.length} isEmpty={isEmpty} />
      {/* {data.map((item, index) => {
        const sale = item as unknown as Sale;
        const isLast = index === data.length - 1;
        return (
          <ProductBodyRow
            onClickRow={(event, product: Sale) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedProduct(sale);
            }}
            key={sale._id}
            wholeSale={sale}
            // scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })} */}
      <LoadingRow isLoading={isLoading} colSpan={WholeSaleHeaderList.length} />
    </TableBody>
  );
};

export default WholeSaleTableBody;
