import { FC, useState } from 'react';
import { Move } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import OrderBodyRow from './MoveBodyRow';
import LoadingRow from '@/components/table/LoadingRow';
import { OrderHeaderList } from '../constants';
import { CommonListProps } from '@/types';
import RemoveMoveModal from '../../_components/RemoveMoveModal';
import OrderDetailPopover from './MoveDetailPopover';
import EditMoveModal from '../../_components/EditMoveModal';

interface Props extends CommonListProps<Move> {}

const MoveTableBody: FC<Props> = ({ isLoading, isEmpty, data, scrollRef }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedMove, setSelectedMove] = useState<null | Move>(null);
  const [optionType, setOptionType] = useState<null | any>(null);

  const handleClickOption = (option: any | null, client: Move | null) => {
    setSelectedMove(client);
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
    <TableBody>
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
        <OrderDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedMove={selectedMove}
        />
      )}
      <EmptyRow colSpan={OrderHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const move = item as unknown as Move;
        const isLast = index === data.length - 1;
        return (
          <OrderBodyRow
            onClickRow={(event, move: Move) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedMove(move);
            }}
            key={move._id}
            move={move}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={OrderHeaderList.length} />
    </TableBody>
  );
};

export default MoveTableBody;
