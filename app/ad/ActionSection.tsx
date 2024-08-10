import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { PlusOneOutlined } from '@mui/icons-material';
import ActionButton from '@/components/ui/button/ActionButton';
import { Stack } from '@mui/material';
import UploadButton from '@/components/ui/button/UploadButtont';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ChangeEvent, useState } from 'react';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import { client } from '@/http/graphql/client';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CreateOptionModal from './_components/AddOptionModal';

const ActionSection = () => {
  const [openCreateOption, setOpenCreateOption] = useState(false);

  const [fileKey, setFileKey] = useState(new Date());
  const { mutate: uploadFile, isPending } = useUploadExcelFile();
  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadFile(
      { service: 'subsidiary', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '광고 업로드가 완료되었습니다.',
            severity: 'success',
          });
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'subsidiaryCategories' });
              cache.evict({ fieldName: 'subsidiaryStocks' });
              cache.evict({ fieldName: 'subsidiaryStocksState' });
              cache.evict({ fieldName: 'subsidiaryCountStocks' });
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
    download('subsidiary', {
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
      {openCreateOption && (
        <CreateOptionModal open={openCreateOption} onClose={() => setOpenCreateOption(false)} />
      )}
      <ActionButton
        icon={<PlusOneOutlined />}
        text="광고 입력"
        onClick={() => setOpenCreateOption(true)}
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
