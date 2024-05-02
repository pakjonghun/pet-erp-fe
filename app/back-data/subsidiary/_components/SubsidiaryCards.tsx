import { FC, useState } from 'react';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import { SelectOption } from '../../types';
import RemoveSubsidiaryModal from './RemoveSubsidiaryModal';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import SubsidiaryDetailPopover from './SubsidiaryDetailPopover';
import SubsidiaryCard from './SubsidiaryCard';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<Subsidiary> {
  sx?: SxProps;
}

const SubsidiaryCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<null | Subsidiary>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, item: Subsidiary | null) => {
    setSelectedSubsidiary(item);
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
      {selectedSubsidiary && (
        <RemoveSubsidiaryModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedSubsidiary={selectedSubsidiary}
        />
      )}
      {selectedSubsidiary && (
        <SubsidiaryDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedSubsidiary={selectedSubsidiary}
        />
      )}

      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <Grid key={item._id} item xs={12} lg={6}>
            <SubsidiaryCard
              onClickRow={(event, subsidiary) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedSubsidiary(item);
              }}
              subsidiary={item}
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

export default SubsidiaryCards;
