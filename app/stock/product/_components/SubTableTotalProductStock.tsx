import { FC } from 'react';
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
import { StockColumn } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import { useStocksState } from '@/http/graphql/hooks/stock/useStocksState';
import EmptyRow from '@/components/table/EmptyRow';
import LabelText from '@/components/ui/typograph/LabelText';

interface Props {
  productStock: StockColumn;
  onClickOption: (option: any | null, client: StockColumn | null) => void;
}

const SubTableTotalProductStock: FC<Props> = ({ productStock, onClickOption }) => {
  const { networkStatus, data } = useStocksState(productStock.productName);

  const rows = data?.stocksState ?? [];

  const isLoading = networkStatus == 1 || networkStatus == 3 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length == 0;
  return (
    <TableContainer sx={{ mt: 1 }}>
      <Stack
        sx={{ ml: 2 }}
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <LabelText label="제품이름" text={productStock.productName} />

        <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 'auto' }}>
          <ActionButton
            size="small"
            icon={<InventoryIcon />}
            text="입고"
            onClick={() => onClickOption('add', productStock)}
          />
          <ActionButton
            size="small"
            icon={<InventoryIcon />}
            text="출고"
            onClick={() => onClickOption('out', productStock)}
          />
        </Stack>
      </Stack>
      <Typography variant="caption" sx={{ ml: 2, display: 'inline-block' }}>
        모든 창고 및 공장에서 생산중인 현황입니다.
      </Typography>
      <Table sx={{ mt: 2 }} size="small">
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              fontWeight: 800,
            },
          }}
        >
          <TableRow>
            <TableCell>구분</TableCell>
            <TableCell>위치</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>생산완료 예정일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <EmptyRow colSpan={5} isEmpty={isEmpty} message="검색된 데이터가 없습니다." />
          {rows.map((row, index) => {
            return (
              <TableRow key={`${row.__typename}_${index}`}>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.orderCompleteDate ?? '제품 리드타임 미입력'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubTableTotalProductStock;
