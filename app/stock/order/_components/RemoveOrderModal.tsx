import { FC } from 'react';
import { ProductOrder } from '@/http/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';
import { useRemoveClient } from '@/http/graphql/hooks/client/useDeleteClient';

interface Props {
  open: boolean;
  selectedOrder: ProductOrder;
  onClose: () => void;
}

const RemoveOrderModal: FC<Props> = ({ open, selectedOrder, onClose }) => {
  const [removeClient, { loading }] = useRemoveClient();

  const handleClickRemove = () => {
    removeClient({
      variables: {
        _id: selectedOrder._id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${res.removeClient.name}발주가 삭제되었습니다.`,
          severity: 'success',
        });
        onClose();
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? `${selectedOrder.name}발주 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        발주 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 발주는 복구가 불가능합니다.
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        정말로 삭제하겠습니까?
      </Typography>
      <Stack direction="row" gap={1} sx={{ mt: 3 }} justifyContent="flex-end">
        <Button color="info" variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button
          color="error"
          endIcon={loading ? <CommonLoading /> : ''}
          variant="contained"
          onClick={handleClickRemove}
        >
          삭제
        </Button>
      </Stack>
    </BaseModal>
  );
};

export default RemoveOrderModal;
