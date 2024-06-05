import { FC, useState } from 'react';
import { WholeSaleItem } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import WholeSaleBodyRow from './WholeSaleBodyRow';
import LoadingRow from '@/components/table/LoadingRow';
import { WholeSaleHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import { SelectOption } from '@/app/back-data/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<WholeSaleItem> {
  selectedWholeSale: null | WholeSaleItem;
  setSelectedWholeSale: (itme: null | WholeSaleItem) => void;
}

const WholeSaleTableBody: FC<Props> = ({
  selectedWholeSale,
  setSelectedWholeSale,
  data,
  isLoading,
  isEmpty,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (
    option: SelectOption | null,
    wholeSale: WholeSaleItem | null
  ) => {
    setOptionType(option);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedWholeSale(null);
  };

  return (
    <CommonTableBody>
      <EmptyRow colSpan={WholeSaleHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const sale = item as unknown as WholeSaleItem;
        const isLast = index === data.length - 1;
        const isSelected = item._id === selectedWholeSale?._id;
        return (
          <WholeSaleBodyRow
            isSelected={isSelected}
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
