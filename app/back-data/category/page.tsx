'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ConnectingAirportsOutlined, PlusOneOutlined } from '@mui/icons-material';
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
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useTextDebounce from '@/hooks/useTextDebounce';
import CreateCategoryModal from './_components/AddCategory';
import { useFindManyCategory } from '@/api/graphql/hooks/category/useFindCategories';
import { LIMIT, TABLE_MAX_HEIGHT } from '@/constants';
import CategoryCard from './_components/CategoryCard';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useUploadExcelFile } from '@/api/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import ActionButton from '@/components/ui/button/ActionButton';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { useDownloadExcelFile } from '@/api/rest/hooks/file/useDownloadExcelFile';
import { client } from '@/api/graphql/client';

const CategoryPage = () => {
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);

  const { data, networkStatus, refetch, fetchMore } = useFindManyCategory({
    keyword: delayKeyword,
    limit: LIMIT,
    skip: 0,
  });

  const rows = data?.categories.data ?? [];
  const totalCount = data?.categories.totalCount;
  const hasNext = totalCount != null && totalCount > rows.length;
  const isEmpty = rows.length === 0;

  const getMoreCategory = () => {
    if (networkStatus != 1 && networkStatus != 3) {
      fetchMore({
        variables: {
          categoriesInput: {
            keyword: delayKeyword,
            limit: LIMIT,
            skip: rows.length,
          },
        },
      });
    }
  };
  const all = client.cache.extract();
  console.log('??????', Object.keys(all));
  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  const { mutate: uploadFile, isPending } = useUploadExcelFile();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    uploadFile(
      { service: 'category', formBody },
      {
        onSuccess: () => {
          snackMessage({ message: '파일 업로드가 완료되었습니다.', severity: 'success' });
          refetch();
          if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
          }
        },
        onError: (err) => {
          const message = err.response?.data.message;
          snackMessage({ message: message ?? '파일 업로드가 실패했습니다.', severity: 'error' });
          if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
          }
        },
      }
    );
  };

  const { mutate: download, isPending: isDownloading } = useDownloadExcelFile();

  const handleDownload = () => {
    download('category', {
      onSuccess: () => {
        snackMessage({ message: '카테고리 다운로드가 완료되었습니다.', severity: 'success' });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({ message: message ?? '파일 다운로드가 실패했습니다.', severity: 'error' });
      },
    });
  };

  return (
    <TablePage sx={{ flex: 1 }}>
      <CreateCategoryModal open={openCreateCategory} onClose={() => setOpenCreateCategory(false)} />
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="제품분류 백데이터" />

        <Stack direction="row" alignItems="center" gap={2}>
          <UploadButton
            inputRef={uploadInputRef}
            loading={isPending}
            text="제품분류 업로드"
            onChange={handleChangeFile}
          />
          <ActionButton
            icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
            text="제품분류 다운로드"
            onClick={handleDownload}
          />
          <ActionButton
            icon={<PlusOneOutlined />}
            text="제품분류 입력"
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
            label="검색할 제품분류를 입력하세요."
            size="small"
          />
        </FormControl>
      </FormGroup>
      <Grid
        container
        spacing={2}
        sx={{ p: 3, height: TABLE_MAX_HEIGHT, overflow: 'auto', placeContent: 'start' }}
      >
        {isEmpty && (
          <Typography sx={{ ml: 2 }} variant="body1">
            검색결과가 없습니다.
          </Typography>
        )}
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
              endIcon={<ExpandMoreIcon />}
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

export default CategoryPage;
