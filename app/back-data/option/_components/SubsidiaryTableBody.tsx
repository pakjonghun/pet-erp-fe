import { FC, useState } from 'react';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import EmptyRow from '@/components/table/EmptyRow';
import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { OptionHeaderList } from '../constants';
import SubsidiaryBodyRow from './SubsidiaryBodyRow';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<OutputOption> {
  selectedSubsidiary: OutputOption | null;
  setSelectedSubsidiary: (value: OutputOption | null) => void;
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

  const handleClickOption = (option: SelectOption | null, subsidiary: OutputOption | null) => {
    setSelectedSubsidiary(subsidiary);
    setOptionType(option);
  };

  return (
    <CommonTableBody>
      <EmptyRow colSpan={OptionHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const isSelected = item.id === selectedSubsidiary?.id;
        const isLast = index === data.length - 1;
        return (
          <SubsidiaryBodyRow
            isSelected={isSelected}
            onClickRow={(event, option: OutputOption) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedSubsidiary(option);
            }}
            key={item._id}
            subsidiary={item}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={OptionHeaderList.length} />
    </CommonTableBody>
  );
};

export default SubsidiaryTableBody;
