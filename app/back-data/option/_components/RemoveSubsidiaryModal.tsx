import { FC } from 'react';
import { OutputOption } from '@/http/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';
import { client } from '@/http/graphql/client';
import { useRemoveOption } from '@/http/graphql/hooks/option/useRemoveOption';

interface Props {
  open: boolean;
  selectedOption: OutputOption;
  onClose: () => void;
}

const RemoveSubsidiaryModal: FC<Props> = ({ open, selectedOption, onClose }) => {
  const [removeOption, { loading }] = useRemoveOption();

  const handleClickRemove = () => {
    removeOption({
      variables: {
        id: selectedOption.id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: `${res.removeOption.name}옵션이 삭제되었습니다.`,
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
          message: err.message ?? `${selectedOption.name}옵션 삭제가 실패했습니다.`,
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        옵션 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 옵션은 복구가 불가능합니다.
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
