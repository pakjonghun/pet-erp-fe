import { FC, useState } from 'react';
import { Client } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ClientBodyRow from './ClientBodyRow';
import RemoveClientModal from './RemoveClientModal';
import ClientDetailPopover from './ClientDetailPopover';
import { CommonListProps, SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { ClientHeaderList } from '../constants';
import EditPClientModal from './EditPClientModal';

interface Props extends CommonListProps<Client> {}

const ClientTableBody: FC<Props> = ({ isLoading, isEmpty, data, scrollRef }) => {
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
    <TableBody>
      {selectedClient && (
        <RemoveClientModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedClient={selectedClient}
        />
      )}

      {selectedClient && (
        <EditPClientModal
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
      <EmptyRow colSpan={ClientHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const client = item as unknown as Client;
        const isLast = index === data.length - 1;
        return (
          <ClientBodyRow
            onClickRow={(event, client: Client) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedClient(client);
            }}
            key={client._id}
            client={client}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
      <LoadingRow isLoading={isLoading} colSpan={ClientHeaderList.length} />
    </TableBody>
  );
};

export default ClientTableBody;
