import { FC, useState } from 'react';
import { AdsOutPutItem } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import { SelectOption } from '../types';
import RemoveSubsidiaryModal from './RemoveSubsidiaryModal';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import LoadingCard from '@/components/ui/loading/LoadingCard';
import SubsidiaryCard from './SubsidiaryCard';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<AdsOutPutItem> {
  sx?: SxProps;
}

const OptionCards: FC<Props> = ({ data, isLoading, isEmpty, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<null | AdsOutPutItem>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, item: AdsOutPutItem | null) => {
    setSelectedOption(item);
    setOptionType(option);
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
      {selectedOption && (
        <RemoveSubsidiaryModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedOption={selectedOption}
        />
      )}

      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <Grid key={item._id} item xs={12} lg={6}>
            <SubsidiaryCard
              onClickRow={(event, option) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedOption(item);
              }}
              option={item}
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

export default OptionCards;
