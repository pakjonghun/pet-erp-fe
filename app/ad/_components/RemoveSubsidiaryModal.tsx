import { FC } from 'react';
import { AdsOutPutItem } from '@/http/graphql/codegen/graphql';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import BaseModal from '@/components/ui/modal/BaseModal';
import { snackMessage } from '@/store/snackMessage';
import { Typography, Stack, Button } from '@mui/material';
import { useRemoveAd } from '@/http/graphql/hooks/ad/useRemoveAd';

interface Props {
  open: boolean;
  selectedOption: AdsOutPutItem;
  onClose: () => void;
}

const RemoveSubsidiaryModal: FC<Props> = ({ open, selectedOption, onClose }) => {
  const [remove, { loading }] = useRemoveAd();

  const handleClickRemove = () => {
    remove({
      variables: {
        _id: selectedOption._id,
      },
      onCompleted: (res) => {
        snackMessage({
          message: '광고가 삭제되었습니다.',
          severity: 'success',
        });
        onClose();
      },
      onError: (err) => {
        snackMessage({
          message: '삭제가 실패했습니다.',
          severity: 'error',
        });
        onClose();
      },
    });
  };

  return (
    <BaseModal onClose={onClose} open={open}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        광고 삭제
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.warning.dark }}>
        삭제된 광고는 복구가 불가능합니다.
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
