'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { PlusOneOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import CreateCategoryModal from './_components/AddFactoryModal';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import CategoryCard from './_components/FactoryCard';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import ActionButton from '@/components/ui/button/ActionButton';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import { useSubsidiaryCategories } from '@/http/graphql/hooks/subsidiary-category/useSubsidiaryCategories';
import { Storage } from '@/http/graphql/codegen/graphql';

const FactoryPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, refetch, fetchMore } = useSubsidiaryCategories({
    keyword: delayKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = (data?.subsidiaryCategories.data as unknown as Storage[]) ?? [];
  const totalCount = data?.subsidiaryCategories.totalCount;
  const hasNext = totalCount != null && totalCount > rows.length;
  const isLoading = networkStatus == 1 || networkStatus == 3;
  const isEmpty = !isLoading && rows.length === 0;
  const searchCount = rows.length;

  const getMoreCategory = () => {
    if (isLoading) return;

    fetchMore({
      variables: {
        categoriesInput: {
          keyword: delayKeyword,
          limit: LIMIT,
          skip: rows.length,
        },
      },
    });
  };

  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  const { mutate: uploadFile, isPending } = useUploadExcelFile();
  const [fileKey, setFileKey] = useState(new Date());

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    uploadFile(
      { service: 'subsidiary-category', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '파일 업로드가 완료되었습니다.',
            severity: 'success',
          });
          refetch();
        },
        onError: (err) => {
          const message = err.response?.data.message;
          snackMessage({
            message: message ?? '파일 업로드가 실패했습니다.',
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
    download('subsidiary-category', {
      onSuccess: () => {
        snackMessage({
          message: '공장 다운로드가 완료되었습니다.',
          severity: 'success',
        });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '파일 다운로드가 실패했습니다.',
          severity: 'error',
        });
      },
    });
  };

  return (
    <TablePage sx={{ flex: 1 }}>
      <CreateCategoryModal
        open={openCreateCategory}
        onClose={() => setOpenCreateCategory(false)}
      />
      <Stack
        sx={{ px: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableTitle title="공장 백데이터" />

        <Stack direction="row" alignItems="center" gap={2}>
          <UploadButton
            fileKey={fileKey}
            loading={isPending}
            text="공장 업로드"
            onChange={handleChangeFile}
          />
          <ActionButton
            icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
            text="공장 다운로드"
            onClick={handleDownload}
          />
          <ActionButton
            icon={<PlusOneOutlined />}
            text="공장 등록"
            onClick={() => setOpenCreateCategory(true)}
          />
        </Stack>
      </Stack>
      <FormGroup sx={{ ml: 2 }}>
        <FormControl>
          <TextField
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 270, my: 2 }}
            label="검색할 공장이름을 입력하세요."
            size="small"
          />
        </FormControl>
      </FormGroup>
      <Typography sx={{ p: 3, pt: 0 }} variant="body1">
        {isEmpty
          ? '검색결과가 없습니다.'
          : `${searchCount}건의 데이터가 검색되었습니다.`}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          height: TABLE_MAX_HEIGHT,
          overflow: 'auto',
          placeContent: 'start',
        }}
      >
        {rows.map((row) => (
          <Grid key={row._id} item xs={12} sm={4} md={3} lg={2}>
            <CategoryCard item={row} />
          </Grid>
        ))}
        {hasNext && (
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              onClick={getMoreCategory}
              variant="outlined"
              sx={{ fontSize: 18, width: '100%', height: '100%' }}
              endIcon={isLoading ? <CommonLoading /> : <ExpandMoreIcon />}
              size="large"
            >
              더 보기
            </Button>
          </Grid>
        )}
      </Grid>
    </TablePage>
  );
};

export default FactoryPage;
