import { FC, useState } from 'react';
import { Client } from '@/http/graphql/codegen/graphql';
import { TABLE_MAX_HEIGHT } from '@/constants';
import { Grid, SxProps } from '@mui/material';
import RemoveClientModal from './RemoveClientModal';
import ClientDetailPopover from './ClientDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ClientCard from './ClientCard';
import { SelectOption } from '../../types';
import LoadingCard from '../../../../components/ui/loading/LoadingCard';
import EditPClientModal from './EditPClientModal';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<Client> {
  sx?: SxProps;
}

const ClientCards: FC<Props> = ({ isLoading, isEmpty, data, scrollRef, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<null | Client>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, client: Client | null) => {
    setSelectedClient(client);
    setOptionType(option);
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedClient);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedClient);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setSelectedClient(null);
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

      {selectedClient && (
        <RemoveClientModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}
      {selectedClient && (
        <EditPClientModal
          setSelectedClient={setSelectedClient}
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}
      {selectedClient && (
        <ClientDetailPopover
          onClose={handleClosePopover}
          position={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          selectedClient={selectedClient}
        />
      )}

      {data.map((item, index) => {
        const client = item as unknown as Client;
        const isLast = index === data.length - 1;
        return (
          <Grid key={client._id} item xs={12} lg={6}>
            <ClientCard
              onClickRow={(event, client: Client) => {
                setPopoverPosition({ left: event.clientX, top: event.clientY });
                setPopoverAnchor(event.currentTarget);
                setSelectedClient(client);
              }}
              client={client}
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

export default ClientCards;
