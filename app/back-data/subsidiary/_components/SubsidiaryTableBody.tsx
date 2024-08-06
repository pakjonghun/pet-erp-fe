import { FC, useState } from 'react';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { SubsidiaryHeaderList } from '../constants';
import SubsidiaryBodyRow from './SubsidiaryBodyRow';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<Subsidiary> {
  selectedSubsidiary: Subsidiary | null;
  setSelectedSubsidiary: (value: Subsidiary | null) => void;
}

const SubsidiaryTableBody: FC<Props> = ({
  selectedSubsidiary,
  setSelectedSubsidiary,
  data,
  isLoading,
  isEmpty,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, subsidiary: Subsidiary | null) => {
    setSelectedSubsidiary(subsidiary);
    setOptionType(option);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedSubsidiary(null);
  };

  return (
    <CommonTableBody>
      <EmptyRow colSpan={SubsidiaryHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const isSelected = item._id === selectedSubsidiary?._id;
        const isLast = index === data.length - 1;
        return (
          <SubsidiaryBodyRow
            isSelected={isSelected}
            onClickRow={(event, subsidiary: Subsidiary) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedSubsidiary(subsidiary);
            }}
            key={item._id}
            subsidiary={item}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={SubsidiaryHeaderList.length} />
    </CommonTableBody>
  );
};

export default SubsidiaryTableBody;
