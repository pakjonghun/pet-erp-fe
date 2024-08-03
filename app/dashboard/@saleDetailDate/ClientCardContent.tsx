import CommonLoading from '@/components/ui/loading/CommonLoading';
import { Stack } from '@mui/material';
import SaleDetailItem from './_components/SaleDetailItem';
import { Dispatch, FC, SetStateAction } from 'react';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';

interface Props {
  rows: ClientSaleMenu[];
  selectedClient: ClientSaleMenu | null;
  isLoading: boolean;
  onClickItem: (item: ClientSaleMenu) => void;
  cardScrollRef: Dispatch<SetStateAction<null | HTMLElement>>;
}

const ClientCardContent: FC<Props> = ({
  rows,
  selectedClient,
  isLoading,
  onClickItem,
  cardScrollRef,
}) => {
  return (
    <Stack direction="column" gap={1}>
      {rows.map((data, index) => {
        const isLast = index + 1 === rows.length;
        return (
          <SaleDetailItem
            isSelected={selectedClient?._id === data._id}
            onClickItem={onClickItem}
            scrollRef={isLast ? cardScrollRef : undefined}
            key={data._id}
            index={index + 1}
            data={data}
          />
        );
      })}
      {isLoading && <CommonLoading />}
    </Stack>
  );
};

export default ClientCardContent;
