import { FC, useState } from 'react';
import { Client } from '@/http/graphql/codegen/graphql';
import { TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ClientBodyRow from './ClientBodyRow';
import RemoveClientModal from './RemoveClientModal';
import ClientDetailPopover from './ClientDetailPopover';
import { SelectOption } from '../../types';
import LoadingRow from '@/components/table/LoadingRow';
import { ClientHeaderList } from '../constants';
import EditPClientModal from './EditPClientModal';
import { CommonListProps } from '@/types';
import { CommonTableBody } from '@/components/commonStyles';

interface Props extends CommonListProps<Client> {
  selectedClient: Client | null;
  setSelectedClient: (item: Client | null) => void;
}

const ClientTableBody: FC<Props> = ({
  selectedClient,
  setSelectedClient,
  isLoading,
  isEmpty,
  data,
  scrollRef,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickOption = (option: SelectOption | null, client: Client | null) => {
    setSelectedClient(client);
    setOptionType(option);
  };

  return (
    <CommonTableBody>
      <EmptyRow colSpan={ClientHeaderList.length} isEmpty={isEmpty} />
      {data.map((item, index) => {
        const client = item as unknown as Client;
        const isLast = index === data.length - 1;
        const isSelected = selectedClient?._id == client._id;
        return (
          <ClientBodyRow
            isSelected={isSelected}
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
    </CommonTableBody>
  );
};

export default ClientTableBody;
