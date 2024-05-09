import { FC, useState } from 'react';
import { Move, ProductOrder } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import MoveCard from './MoveCard';
import LoadingCard from '../../../../components/ui/loading/LoadingCard';
import { CommonListProps } from '@/types';
import EditOrderModal from '../../_components/EditMoveModal';
import RemoveMoveModal from '../../_components/RemoveMoveModal';
import MoveDetailPopover from './MoveDetailPopover';
import EditMoveModal from '../../_components/EditMoveModal';

interface Props extends CommonListProps<Move> {
  sx?: SxProps;
}

const MoveCards: FC<Props> = ({ isLoading, isEmpty, data, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedMove, setSelectedMove] = useState<null | Move>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (option: any | null, move: Move | null) => {
    setSelectedMove(move);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedMove);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedMove);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedMove(null);
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

      {selectedMove && (
        <EditMoveModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedMove={selectedMove}
        />
      )}

      {selectedMove && (
        <RemoveMoveModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedMove={selectedMove}
        />
      )}

      {selectedMove && (
        <MoveDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedMove={selectedMove}
        />
      )}

      {data.map((item, index) => {
        const move = item as unknown as Move;
        const isLast = index === data.length - 1;
        return (
          <Grid key={move._id} item xs={12} lg={6}>
            <MoveCard
              onClickRow={(event, move: Move) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedMove(move);
              }}
              move={move}
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

export default MoveCards;
