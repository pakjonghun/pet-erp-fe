import { FC, useState } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
  Stack,
} from '@mui/material';
import {
  ProductOrder,
  StockColumn,
  UserRole,
} from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import AddOrderModal from '../../_components/AddOrderModal';
import { useStocksOrder } from '@/http/graphql/hooks/stock/useStocksOrder';
import dayjs from 'dayjs';
import { getNumberWithComma } from '@/utils/common';
import EmptyRow from '@/components/table/EmptyRow';
import { useReactiveVar } from '@apollo/client';
import { authState } from '@/store/isLogin';
import {
  CommonHeaderRow,
  CommonTable,
  CommonTableBody,
} from '@/components/commonStyles';
import LoadingRow from '@/components/table/LoadingRow';

interface Props {
  productStock: StockColumn;
}

const SubTableOrder: FC<Props> = ({ productStock }) => {
  const { role } = useReactiveVar(authState);
  const cannotModify = role === UserRole.Staff;
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data, networkStatus } = useStocksOrder(productStock.productName);
  const isLoading =
    networkStatus == 1 || networkStatus == 3 || networkStatus == 2;
  const rows = (data?.stocksOrder as ProductOrder[]) ?? [];
  const isEmpty = !isLoading && rows.length == 0;

  return (
    <TableContainer sx={{ mt: 1 }}>
      {openAddModal && (
        <AddOrderModal
          product={productStock.productName}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      )}

      <Stack direction="row" alignItems="center" gap={2}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, pt: 0, display: 'inline-block' }}
        >{`${productStock.productName}`}</Typography>
        {!cannotModify && (
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            sx={{ ml: 'auto' }}
          >
            <ActionButton
              size="small"
              icon={<InventoryIcon />}
              text="발주 등록"
              onClick={() => {
                setOpenAddModal(true);
              }}
            />
          </Stack>
        )}
      </Stack>
      <CommonTable sx={{ mt: 2 }} size="small">
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              fontWeight: 800,
            },
          }}
        >
          <CommonHeaderRow>
            <TableCell>발주날짜</TableCell>
            <TableCell>공장</TableCell>
            <TableCell>총 수량</TableCell>
            <TableCell>계약금</TableCell>
            <TableCell>잔금</TableCell>
            <TableCell>총 금액</TableCell>
            <TableCell>지불여부</TableCell>
            <TableCell>생산완료 예정일</TableCell>
          </CommonHeaderRow>
        </TableHead>
        <CommonTableBody>
          <EmptyRow
            colSpan={8}
            isEmpty={isEmpty}
            message="검색결과가 없습니다."
          />
          <LoadingRow isLoading={isLoading} colSpan={8} />
          {rows?.map((row) => {
            const allEmptyLeadTime = row.products.every(
              (item) => item.product.leadTime == null
            );
            const largestLeadTime = allEmptyLeadTime
              ? null
              : row.products.reduce(
                  (acc, cur) =>
                    (cur.product.leadTime ?? 0) > acc
                      ? cur.product.leadTime ?? 0
                      : acc,
                  -Infinity
                );

            const completeDate =
              largestLeadTime == null
                ? '제품 리드타임 미입력'
                : dayjs(row.createdAt)
                    .add(largestLeadTime, 'day')
                    .format('YYYY-MM-DD');

            return (
              <TableRow key={row._id}>
                <TableCell>
                  {dayjs(row.createdAt).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell>{row.factory.name}</TableCell>
                <TableCell>
                  {getNumberWithComma(
                    row.products.reduce((acc, cur) => acc + cur.count, 0)
                  )}
                </TableCell>
                <TableCell>{row.payCost}</TableCell>
                <TableCell>{row.notPayCost}</TableCell>
                <TableCell>{row.totalPayCost}</TableCell>
                <TableCell>{row.isDone ? '지불완료' : '미지불'}</TableCell>
                <TableCell>{completeDate}</TableCell>
              </TableRow>
            );
          })}
        </CommonTableBody>
      </CommonTable>
    </TableContainer>
  );
};

export default SubTableOrder;
