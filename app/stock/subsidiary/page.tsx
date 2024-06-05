'use client';

import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TableHead,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import AddProductStockModal from './_components/AddProductStockModal';
import OutProductStockModal from './_components/OutProductStockModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import ProductStockTableBody from './_components/ProductStockTableBody';
import { LIMIT } from '@/constants';
import ProductStockCards from './_components/ProductStockCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { ProductStockHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Storage, SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import BaseSelect from '@/components/ui/select/BaseSelect';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSubsidiaryStocks } from '@/http/graphql/hooks/stock/useSubsidiaryStocks';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';

const SubsidiaryStockPage = () => {
  const { data: storageData } = useStorages({
    keyword: '',
    limit: 100,
    skip: 0,
  });
  const [storageOption, setStorageOption] = useState('모두선택');

  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const [productStock, setProductStock] =
    useState<null | SubsidiaryStockColumn>(null);

  const { data, networkStatus, fetchMore } = useSubsidiaryStocks({
    keyword: delayKeyword,
    skip: 0,
    limit: LIMIT,
    storageName: storageOption == '모두선택' ? undefined : storageOption,
  });

  const rows = (data?.subsidiaryStocks.data as SubsidiaryStockColumn[]) ?? [];
  const isLoading =
    networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.subsidiaryStocks.totalCount;
      if (totalCount != null && totalCount > rows.length) {
        fetchMore({
          variables: {
            stocksInput: {
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
  const isEmpty = !isLoading && rows.length === 0;

  const [openAddStock, setOpenAddStock] = useState(false);
  const [openOutStock, setOpenOutStock] = useState(false);

  const storageOptions = ['모두선택'].concat(
    ((storageData?.storages.data as Storage[]) ?? []).map((item) => item.name)
  );

  return (
    <>
      <TablePage sx={{ flex: 1 }}>
        {openAddStock && (
          <AddProductStockModal
            productStock={productStock}
            open={openAddStock}
            onClose={() => {
              setOpenAddStock(false);
              setProductStock(null);
            }}
          />
        )}
        {openOutStock && (
          <OutProductStockModal
            productStock={productStock}
            open={openOutStock}
            onClose={() => {
              setOpenOutStock(false);
              setProductStock(null);
            }}
          />
        )}
        <Stack
          sx={{ px: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TableTitle title="부자재 재고관리" />
          <Stack direction="row" alignItems="center" gap={2}>
            <ActionButton
              icon={<AddCircleOutlineIcon />}
              text="입고"
              onClick={() => setOpenAddStock(true)}
            />
            <ActionButton
              icon={<RemoveCircleOutlineIcon />}
              text="출고"
              onClick={() => setOpenOutStock(true)}
            />
          </Stack>
        </Stack>
        <FormGroup sx={{ ml: 2 }}>
          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },
            }}
            gap={2}
          >
            <FormControl
              sx={{
                width: {
                  md: 300,
                  xs: '100%',
                },
                pr: 2,
              }}
            >
              <TextField
                onChange={(event) => setKeyword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ my: 2 }}
                label="검색할 부자재 이름을 입력하세요."
                size="small"
              />
            </FormControl>
            <FormControl
              sx={{
                pr: 2,
                width: {
                  md: 120,
                  xs: '100%',
                },
              }}
            >
              <BaseSelect
                defaultValue={storageOption}
                label="창고 선택"
                onChangeValue={(event) => {
                  setStorageOption(event.target.value);
                }}
                optionItems={storageOptions}
                value={storageOption}
              />
            </FormControl>
          </Stack>
        </FormGroup>
        <Typography sx={{ p: 3 }}>
          {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
        </Typography>
        <ProductStockCards
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
          data={rows}
          isEmpty={isEmpty}
          isLoading={isLoading}
          scrollRef={scrollRef}
        />
        <ScrollTableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            height: '30vh',
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {ProductStockHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            <ProductStockTableBody
              productStock={productStock}
              setProductStock={setProductStock}
              openAddStock={() => setOpenAddStock(true)}
              openOutStock={() => setOpenOutStock(true)}
              data={rows}
              isEmpty={isEmpty}
              isLoading={isLoading}
              scrollRef={scrollRef}
            />
          </CommonTable>
        </ScrollTableContainer>
      </TablePage>
      <TablePage sx={{ flex: 1 }}>
        {openAddStock && (
          <AddProductStockModal
            productStock={productStock}
            open={openAddStock}
            onClose={() => {
              setOpenAddStock(false);
              setProductStock(null);
            }}
          />
        )}
        {openOutStock && (
          <OutProductStockModal
            productStock={productStock}
            open={openOutStock}
            onClose={() => {
              setOpenOutStock(false);
              setProductStock(null);
            }}
          />
        )}
        <Stack
          sx={{ px: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TableTitle title="부자재 재고관리" />
          <Stack direction="row" alignItems="center" gap={2}>
            <ActionButton
              icon={<AddCircleOutlineIcon />}
              text="입고"
              onClick={() => setOpenAddStock(true)}
            />
            <ActionButton
              icon={<RemoveCircleOutlineIcon />}
              text="출고"
              onClick={() => setOpenOutStock(true)}
            />
          </Stack>
        </Stack>
        <FormGroup sx={{ ml: 2 }}>
          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },
            }}
            gap={2}
          >
            <FormControl
              sx={{
                width: {
                  md: 300,
                  xs: '100%',
                },
                pr: 2,
              }}
            >
              <TextField
                onChange={(event) => setKeyword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ my: 2 }}
                label="검색할 부자재 이름을 입력하세요."
                size="small"
              />
            </FormControl>
            <FormControl
              sx={{
                pr: 2,
                width: {
                  md: 120,
                  xs: '100%',
                },
              }}
            >
              <BaseSelect
                defaultValue={storageOption}
                label="창고 선택"
                onChangeValue={(event) => {
                  setStorageOption(event.target.value);
                }}
                optionItems={storageOptions}
                value={storageOption}
              />
            </FormControl>
          </Stack>
        </FormGroup>
        <Typography sx={{ p: 3 }}>
          {isEmpty ? '검색 결과가 없습니다' : `총 ${rows.length}건 검색`}
        </Typography>
        <ProductStockCards
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
          data={rows}
          isEmpty={isEmpty}
          isLoading={isLoading}
          scrollRef={scrollRef}
        />
        <ScrollTableContainer
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {ProductStockHeaderList.map((item, index) => (
                  <HeadCell key={`${item}_${index}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            <ProductStockTableBody
              productStock={productStock}
              setProductStock={setProductStock}
              openAddStock={() => setOpenAddStock(true)}
              openOutStock={() => setOpenOutStock(true)}
              data={rows}
              isEmpty={isEmpty}
              isLoading={isLoading}
              scrollRef={scrollRef}
            />
          </CommonTable>
        </ScrollTableContainer>
      </TablePage>
    </>
  );
};

export default SubsidiaryStockPage;
