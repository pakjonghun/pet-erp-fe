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
  Table,
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
  return (
    <TablePage sx={{ flex: 1 }}>
      {openCreateProduct && (
        <AddWholeSaleModal open={openCreateProduct} onClose={() => setOpenCreateProduct(false)} />
      )}
      <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <TableTitle title="도매 판매" />
        {!cannotModify && (
          <Stack direction="row" alignItems="center" gap={2}>
            <ActionButton
              icon={<PlusOneOutlined />}
              text="도매 판매 등록"
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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {WholeSaleHeaderList.map((item, index) => (
                <HeadCell key={`${index}_${item}`} text={item} />
              ))}
            </TableRow>
          </TableHead>
          <WholeSaleTableBody
            isLoading={isLoading}
            data={rows}
            isEmpty={isEmpty}
            scrollRef={scrollRef}
          />
        </Table>
      </ScrollTableContainer>
    </TablePage>
  );
};

export default WholeSalePage;
