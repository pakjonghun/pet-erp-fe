import { FC, useState } from 'react';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import { CommonListProps, SelectOption } from '../../types';
import RemoveSubsidiaryModal from './RemoveSubsidiaryModal';
import EditSubsidiaryModal from './EditSubsidiaryModal';
import ProductDetailPopover from './SubsidiaryDetailPopover';
import LoadingRow from '@/components/table/LoadingRow';
import { SubsidiaryHeaderList } from '../constants';
import SubsidiaryBodyRow from './SubsidiaryBodyRow';

interface Props extends CommonListProps<Subsidiary> {}

const SubsidiaryTableBody: FC<Props> = ({ data, isLoading, isEmpty, scrollRef }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<null | Subsidiary>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, subsidiary: Subsidiary | null) => {
    setSelectedSubsidiary(subsidiary);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedSubsidiary);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedSubsidiary);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedSubsidiary(null);
  };

  return (
    <TableBody>
      {selectedSubsidiary && (
        <RemoveSubsidiaryModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedSubsidiary={selectedSubsidiary}
        />
      )}

      {selectedSubsidiary && (
        <EditSubsidiaryModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedSubsidiary={selectedSubsidiary}
        />
      )}
      {selectedSubsidiary && (
        <ProductDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedSubsidiary={selectedSubsidiary}
        />
      )}
      <EmptyRow colSpan={SubsidiaryHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <SubsidiaryBodyRow
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
    </TableBody>
  );
};

export default SubsidiaryTableBody;
