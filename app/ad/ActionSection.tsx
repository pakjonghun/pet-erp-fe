import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { PlusOneOutlined } from '@mui/icons-material';
import ActionButton from '@/components/ui/button/ActionButton';
import { Stack } from '@mui/material';
import UploadButton from '@/components/ui/button/UploadButtont';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ChangeEvent, FC, useState } from 'react';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import { HandleQuery } from '@/hooks/useHandleQuery';
import { AdType } from '@/http/graphql/codegen/graphql';

interface Props {
  q: HandleQuery;
}

const ActionSection: FC<Props> = ({ q }) => {
  const [fileKey, setFileKey] = useState(new Date());
  const { mutate: uploadFile, isPending } = useUploadExcelFile();
  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadFile(
      { service: 'ad', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '광고 업로드가 완료되었습니다.',
            severity: 'success',
          });
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'ads' });
            },
          });
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({
            message: message ?? '광고 업로드가 실패하였습니다.',
            severity: 'error',
          });
        },
        onSettled: () => {
          setFileKey(new Date());
        },
      }
    );
  };

  const { mutate: download, isPending: isDownloading } = useDownloadExcelFile();

  const handleDownload = () => {
    download('ad', {
      onSuccess: () => {
        snackMessage({
          message: '광고 다운로드가 완료되었습니다.',
          severity: 'success',
        });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '광고 다운로드가 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <ActionButton
        icon={<PlusOneOutlined />}
        text="광고 입력"
        onClick={() =>
          q.setQuery([
            { key: 'createAd', value: '1' },
            { key: 'tab', value: AdType.ChannelAppProduct },
          ])
        }
      />
      <UploadButton
        fileKey={fileKey}
        loading={isPending}
        onChange={handleUploadExcelFile}
        text="광고 업로드"
      />
      <ActionButton
        icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
        text="광고 다운로드"
        onClick={handleDownload}
      />
    </Stack>
  );
};

export default ActionSection;
