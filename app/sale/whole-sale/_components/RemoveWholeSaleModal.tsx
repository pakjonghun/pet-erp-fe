import { FC } from 'react';
import { WholeSaleOutput } from '@/http/graphql/codegen/graphql';
import { useRemoveProduct } from '@/http/graphql/hooks/product/useRemoveProduct';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';

interface Props {
  open: boolean;
  selectedWholeSale: WholeSaleOutput;
  onClose: () => void;
}

const RemoveWholeSaleModal: FC<Props> = ({ open, selectedWholeSale, onClose }) => {
  const [removeWholeSale, { loading }] = useRemoveProduct();

  const handleClickRemove = () => {
    removeWholeSale({
      variables: {
        _id: selectedWholeSale._id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${selectedWholeSale.mallId}거래처와 도매 거래 삭제되었습니다.`,
          severity: 'success',
        });
        onClose();
      },
      onError: (err) => {
        snackMessage({
          message:
            err.message ?? `${selectedWholeSale.mallId}거래처와 도매 거래 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        도매 판매삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 판매는 복구가 불가능합니다.
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

export default RemoveWholeSaleModal;