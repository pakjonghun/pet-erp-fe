import { FC } from 'react';
import { Client, Product } from '@/http/graphql/codegen/graphql';
import { useRemoveProduct } from '@/http/graphql/hooks/product/useRemoveProduct';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';

interface Props {
  open: boolean;
  selectedClient: Client;
  onClose: () => void;
}

const RemoveClientModal: FC<Props> = ({ open, selectedClient, onClose }) => {
  const [removeProduct, { loading }] = useRemoveProduct();

  const handleClickRemove = () => {
    removeProduct({
      variables: {
        _id: selectedClient._id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${res.removeProduct.name}거래처가 삭제되었습니다.`,
          severity: 'success',
        });
        onClose();
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? `${selectedClient.name}거래처 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        거래처 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 거래처은 복구가 불가능합니다.
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

export default RemoveClientModal;
