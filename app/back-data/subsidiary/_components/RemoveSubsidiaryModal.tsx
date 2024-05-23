import { FC } from 'react';
import { Subsidiary } from '@/http/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';
import { useRemoveSubsidiary } from '@/http/graphql/hooks/subsidiary/useRemoveSubsidiary';
import { client } from '@/http/graphql/client';

interface Props {
  open: boolean;
  selectedSubsidiary: Subsidiary;
  onClose: () => void;
}

const RemoveSubsidiaryModal: FC<Props> = ({ open, selectedSubsidiary, onClose }) => {
  const [removeSubsidiary, { loading }] = useRemoveSubsidiary();

  const handleClickRemove = () => {
    removeSubsidiary({
      variables: {
        _id: selectedSubsidiary._id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${res.removeSubsidiary.name}부자재가 삭제되었습니다.`,
          severity: 'success',
        });
        client.refetchQueries({
          updateCache(cache) {
            cache.evict({ fieldName: 'subsidiaryStocks' });
            cache.evict({ fieldName: 'subsidiaryStocksState' });
            cache.evict({ fieldName: 'subsidiaryCountStocks' });
          },
        });

        onClose();
      },
      onError: (err) => {
        snackMessage({
          message: err.message ?? `${selectedSubsidiary.name}부자재 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        부자재 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 부자재는 복구가 불가능합니다.
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

export default RemoveSubsidiaryModal;
