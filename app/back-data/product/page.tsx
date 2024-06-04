'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import CreateProductModal from './_components/AddProductModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductionTableBody from './_components/ProductionTableBody';
import { useUploadExcelFile } from '@/http/rest/hooks/file/useUploadExcelFile';
import { snackMessage } from '@/store/snackMessage';
import UploadButton from '@/components/ui/button/UploadButtont';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { EMPTY, LIMIT } from '@/constants';
import ProductionCards from './_components/ProductionCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { useDownloadExcelFile } from '@/http/rest/hooks/file/useDownloadExcelFile';
import CommonLoading from '@/components/ui/loading/CommonLoading';
import { ProductHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Product } from '@/http/graphql/codegen/graphql';
import { client } from '@/http/graphql/client';
import Cell from '@/components/table/Cell';
import { getKCWFormat } from '@/utils/common';
import RemoveProductModal from './_components/RemoveProductModal';
import EditProductModal from './_components/EditProductModal';
import { SelectOption } from '../types';
import EmptyRow from '@/components/table/EmptyRow';

const ProductPage = () => {
  const { mutate: uploadProduct, isPending } = useUploadExcelFile();
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [fileKey, setFileKey] = useState(new Date());

  const { data, networkStatus, fetchMore, refetch } = useProducts({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
  });
  const rows = (data?.products.data as Product[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;
  const isEmpty = !isLoading && rows.length === 0;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.products.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            productsInput: {
              keyword,
              skip: rows.length,
              limit: LIMIT,
            },
          },
        });
      }
    }
  };
  const scrollRef = useInfinityScroll({ callback });

  const handleUploadExcelFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);
    uploadProduct(
      { service: 'product', formBody },
      {
        onSuccess: () => {
          snackMessage({
            message: '제품 업로드가 완료되었습니다.',
            severity: 'success',
          });

          refetch();
          client.refetchQueries({ include: ['categories'] });
          client.refetchQueries({
            updateCache(cache) {
              cache.evict({ fieldName: 'productSales' });
              cache.evict({ fieldName: 'stocks' });
              cache.evict({ fieldName: 'categories' });
            },
          });
        },
        onError: (error) => {
          const message = error.response?.data.message;
          snackMessage({
            message: message ?? '제품 업로드가 실패하였습니다.',
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
    download('product', {
      onSuccess: () => {
        snackMessage({
          message: '제품 다운로드가 완료되었습니다.',
          severity: 'success',
        });
      },
      onError: (err) => {
        const message = err.message;
        snackMessage({
          message: message ?? '제품 다운로드가 실패하였습니다.',
          severity: 'error',
        });
      },
    });
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  const createRow = (product: Product) => {
    return [
      product.name,
      product.category?.name ?? EMPTY,
      product.barCode ?? EMPTY,
      product.code,
      product.wonPrice == null ? EMPTY : getKCWFormat(product.wonPrice),
      product.salePrice == null ? EMPTY : getKCWFormat(product.salePrice),
      product.leadTime ? `${product.leadTime}일` : EMPTY,
    ];
  };

  const parsedRowData = selectedProduct ? createRow(selectedProduct) : [];
  const [optionType, setOptionType] = useState<null | SelectOption>(null);

  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  return (
    <>
      <TablePage sx={{ flex: 1 }}>
        {openCreateProduct && (
          <CreateProductModal
            open={openCreateProduct}
            onClose={() => setOpenCreateProduct(false)}
          />
        )}
        <Stack
          sx={{ px: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TableTitle title="제품 백데이터" />
          <Stack direction="row" alignItems="center" gap={2}>
            <UploadButton
              fileKey={fileKey}
              loading={isPending}
              onChange={handleUploadExcelFile}
              text="제품 업로드"
            />
            <ActionButton
              icon={isDownloading ? <CommonLoading /> : <FileDownloadIcon />}
              text="제품 다운로드"
              onClick={handleDownload}
            />

            <ActionButton
              icon={<PlusOneOutlined />}
              text="제품 등록"
              onClick={() => setOpenCreateProduct(true)}
            />
          </Stack>
        </Stack>
        <FormGroup sx={{ ml: 2 }}>
          <FormControl>
            <TextField
              onChange={(event) => setKeyword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 270, my: 2 }}
              label="검색할 제품 이름을 입력하세요."
              size="small"
            />
          </FormControl>
        </FormGroup>
        <Typography sx={{ p: 3 }}>
          {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
        </Typography>
        <ProductionCards
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
          isLoading={isLoading}
          data={rows}
          isEmpty={isEmpty}
          scrollRef={scrollRef}
        />
        <ScrollTableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            height: '30vh',
            px: 2,
          }}
        >
          <Table
            sx={{
              '& th, tr, td': {
                p: 1,
                border: '0.5px solid lightGray',
              },
            }}
            stickyHeader
          >
            <TableHead>
              <TableRow
                sx={{
                  '& > th': {
                    bgcolor: 'primary.light',
                    color: 'gray',
                  },
                }}
              >
                {ProductHeaderList.map((item, index) => (
                  <HeadCell key={`${index}_${item}`} text={item} />
                ))}
              </TableRow>
            </TableHead>
            <ProductionTableBody
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              isLoading={isLoading}
              data={rows}
              isEmpty={isEmpty}
              scrollRef={scrollRef}
            />
          </Table>
        </ScrollTableContainer>
      </TablePage>
      <TablePage
        sx={{
          flex: 1,
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <Stack
          sx={{ px: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TableTitle title="선택된 제품 데이터" />
        </Stack>
        <TableContainer sx={{ px: 2 }}>
          <Table
            sx={{
              '& th, tr, td': {
                p: 1,
                border: '0.5px solid lightGray',
              },
            }}
            stickyHeader
          >
            <TableHead>
              <TableRow
                sx={{
                  '& > th': {
                    bgcolor: 'primary.light',
                    color: 'gray',
                  },
                }}
              >
                {ProductHeaderList.map((item, index) => (
                  <HeadCell key={`${index}_${item}`} text={item} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& .MuiTableCell-root': {
                  px: 1,
                  py: 0.4,
                  fontWeight: 500,
                },
              }}
            >
              {selectedProduct ? (
                <TableRow hover ref={scrollRef}>
                  {parsedRowData.map((item, index) => (
                    <Cell
                      key={`${selectedProduct._id}_${index}`}
                      sx={{ minWidth: 200 }}
                    >
                      {item}
                    </Cell>
                  ))}
                </TableRow>
              ) : (
                <EmptyRow
                  colSpan={7}
                  isEmpty={!selectedProduct}
                  message="선택된 데이터가 없습니다."
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedProduct && (
          <Stack
            direction="row"
            gap={1}
            sx={{ mt: 2 }}
            justifyContent="flex-end"
          >
            <Button
              color="error"
              variant="outlined"
              onClick={handleClickDelete}
            >
              삭제
            </Button>
            <Button variant="contained" onClick={handleClickEdit}>
              편집
            </Button>
          </Stack>
        )}
      </TablePage>

      {selectedProduct && (
        <RemoveProductModal
          open={optionType === 'delete'}
          onClose={() => {
            // setSelectedProduct(null);
            setOptionType(null);
          }}
          selectedProduct={selectedProduct}
        />
      )}

      {selectedProduct && (
        <EditProductModal
          open={optionType === 'edit'}
          onClose={() => {
            // setSelectedProduct(null);
            setOptionType(null);
          }}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductPage;
