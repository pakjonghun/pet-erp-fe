import { FC, useState } from 'react';
import { Client } from '@/api/graphql/codegen/graphql';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Grid, SxProps } from '@mui/material';
import RemoveClientModal from './RemoveClientModal';
import ClientDetailPopover from './ClientDetailPopover';
import EmptyItem from '@/components/ui/listItem/EmptyItem';
import ClientCard from './ClientCard';
import { SelectOption } from '../../types';
import { useClients } from '@/api/graphql/hooks/client/useClients';

interface Props {
  keyword: string;
  sx?: SxProps;
}

const ClientCards: FC<Props> = ({ keyword, sx }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<null | Client>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const { data, networkStatus, fetchMore, refetch } = useClients({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

  const rows = data?.clients.data ?? [];

  const handleClickOption = (option: SelectOption | null, client: Client | null) => {
    setSelectedClient(client);
    setOptionType(option);
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 3 && networkStatus != 1) {
        const totalCount = data?.clients.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              clientsInput: {
                keyword,
                skip: rows.length,
                limit: LIMIT,
              },
            },
          });
        }
      }
    }
  };

  const handleClickEdit = () => {
    handleClosePopover();
    handleClickOption('edit', selectedClient);
  };

  const handleClickDelete = () => {
    handleClosePopover();
    handleClickOption('delete', selectedClient);
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = rows.length === 0;

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
      {/* {selectedClient && (
        <EditClientModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )} */}
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

      {rows.map((item, index) => {
        const client = item as unknown as Client;
        const isLast = index === rows.length - 1;
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
    </Grid>
  );
};

export default ClientCards;
