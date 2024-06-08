'use client';

import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import TablePage from '@/components/table/TablePage';
import TableTitle from '@/components/ui/typograph/TableTitle';
import {
  Button,
  Chip,
  FormControl,
  FormGroup,
  InputAdornment,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { PlusOneOutlined, Search } from '@mui/icons-material';
import { useState } from 'react';
import AddWholeSaleModal from './_components/AddWholeSaleModal';
import useTextDebounce from '@/hooks/useTextDebounce';
import WholeSaleTableBody from './_components/WholeSaleTableBody';
import { LIMIT } from '@/constants';
import WholeSaleCards from './_components/WholeSaleCards';
import ActionButton from '@/components/ui/button/ActionButton';
import { WholeSaleHeaderList } from './constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useWholeSales } from '@/http/graphql/hooks/wholeSale/useWholeSales';
import { useReactiveVar } from '@apollo/client';
import { saleRange } from '@/store/saleStore';
import { UserRole, WholeSaleItem } from '@/http/graphql/codegen/graphql';
import { authState } from '@/store/isLogin';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { SelectOption } from '@/app/back-data/types';
import RemoveWholeSaleModal from './_components/RemoveWholeSaleModal';
import EditWholeSaleModal from './_components/EditWholeSaleModal';
import { getProfitRate } from '@/utils/sale';
import dayjs from 'dayjs';
import { getKCWFormat, getNumberWithComma } from '@/utils/common';
import EmptyRow from '@/components/table/EmptyRow';
import Cell from '@/components/table/Cell';

const WholeSalePage = () => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role == UserRole.Staff;
  const [keyword, setKeyword] = useState('');
  const delayKeyword = useTextDebounce(keyword);
  const { from, to } = useReactiveVar(saleRange);

  const { data, networkStatus, fetchMore } = useWholeSales({
    keyword: delayKeyword,
    limit: LIMIT,
    skip: 0,
    from,
    to,
  });
  const rows = (data?.wholeSales.data as WholeSaleItem[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

      const totalCount = data?.wholeSales.totalCount;
      if (totalCount == null) return;

      if (totalCount <= rows.length) return;
      fetchMore({
        variables: {
          wholeSalesInput: {
            keyword: delayKeyword,
            skip: rows.length,
            limit: LIMIT,
            from,
            to,
          },
        },
      });
    }
  };
  const scrollRef = useInfinityScroll({ callback });

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [selectedWholeSale, setSelectedWholeSale] = useState<null | WholeSaleItem>(null);
  const [optionType, setOptionType] = useState<null | SelectOption>(null);
  const handleClickEdit = () => {
    setOptionType('edit');
  };

  const handleClickDelete = () => {
    setOptionType('delete');
  };

  const createRow = (sale: WholeSaleItem) => {
    const profit = sale.totalPayCost - sale.totalWonCost;
    const profitRate = getProfitRate(sale.totalPayCost - sale.totalWonCost, sale.totalPayCost);
    return [
      sale.mallId,
      dayjs(sale.saleAt).format('YYYY-MM-DD'),
      getNumberWithComma(sale.totalCount),
      getKCWFormat(sale.totalWonCost),
      getKCWFormat(sale.totalPayCost),
      getKCWFormat(profit),
      `${profitRate}%`,
      sale.isDone ? '정산완료' : '정산중',
      <Stack key={Math.random()} direction="column" gap={1}>
        {sale.productList.map((item) => (
          <Chip
            key={`${item.__typename}_${Math.random()}`}
            label={`${item.productName}(${item.count})`}
          />
        ))}
      </Stack>,
    ];
  };

  const parsedRowData = selectedWholeSale ? createRow(selectedWholeSale) : [];

  return (
    <Stack direction="column" sx={{ width: '100%' }}>
      <TablePage sx={{ flex: 1 }}>
        {selectedWholeSale && (
          <RemoveWholeSaleModal
            open={optionType === 'delete'}
            onClose={() => {
              setOptionType(null);
              setSelectedWholeSale(null);
            }}
            selectedWholeSale={selectedWholeSale}
          />
        )}

        {selectedWholeSale && (
          <EditWholeSaleModal
            setSelectedWholeSale={setSelectedWholeSale}
            open={optionType === 'edit'}
            onClose={() => setOptionType(null)}
            wholeSale={selectedWholeSale}
          />
        )}

        {openCreateProduct && (
          <AddWholeSaleModal open={openCreateProduct} onClose={() => setOpenCreateProduct(false)} />
        )}
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <TableTitle title="비 사방넷 판매" />
          {!cannotModify && (
            <Stack direction="row" alignItems="center" gap={2}>
              <ActionButton
                icon={<PlusOneOutlined />}
                text="비 사방넷 판매 등록"
                onClick={() => setOpenCreateProduct(true)}
              />
            </Stack>
          )}
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
        <WholeSaleCards
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
          }}
        >
          <CommonTable stickyHeader>
            <TableHead>
              <CommonHeaderRow>
                {WholeSaleHeaderList.map((item, index) => (
                  <HeadCell key={`${index}_${item}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>
            <WholeSaleTableBody
              selectedWholeSale={selectedWholeSale}
              setSelectedWholeSale={setSelectedWholeSale}
              isLoading={isLoading}
              data={rows}
              isEmpty={isEmpty}
              scrollRef={scrollRef}
            />
          </CommonTable>
        </ScrollTableContainer>
      </TablePage>
      <TablePage
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          px: 2,
        }}
      >
        <TableTitle title="선택된 비 사방넷 판매 데이터" />
        <TableContainer
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
                {WholeSaleHeaderList.map((item, index) => (
                  <HeadCell key={`${index}_${item}`} text={item} />
                ))}
              </CommonHeaderRow>
            </TableHead>

            {!!selectedWholeSale ? (
              <TableRow hover ref={scrollRef}>
                {parsedRowData.map((item, index) => (
                  <Cell key={`${selectedWholeSale._id}_${index}`} sx={{ minWidth: 200 }}>
                    {item}
                  </Cell>
                ))}
              </TableRow>
            ) : (
              <EmptyRow
                colSpan={9}
                isEmpty={!selectedWholeSale}
                message="선택된 데이터가 없습니다."
              />
            )}
          </CommonTable>
        </TableContainer>
        {!!selectedWholeSale && (
          <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
            <Button color="error" variant="outlined" onClick={handleClickDelete}>
              삭제
            </Button>
            <Button variant="contained" onClick={handleClickEdit}>
              편집
            </Button>
          </Stack>
        )}
      </TablePage>
    </Stack>
  );
};

export default WholeSalePage;
