import InventoryIcon from '@mui/icons-material/Inventory';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Tabs,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
  Stack,
  alpha,
} from '@mui/material';
import { FC } from 'react';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';

interface Props {
  productStock: TotalProductStockOutput;
  onClickOption: (option: any | null, client: TotalProductStockOutput | null) => void;
}

const TotalProductStock: FC<Props> = ({ productStock, onClickOption }) => {
  return (
    <TableContainer sx={{ mt: 1 }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, pt: 0, display: 'inline-block' }}
        >{`${productStock.product.name}(${productStock.storageCount}+${productStock.orderCount})`}</Typography>
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
            <TableCell>재고</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
        // sx={{
        //   'tr:last-child .MuiTableCell-root': {
        //     border: 'none',
        //   },
        // }}
        >
          <TableRow>
            <TableCell>제작중</TableCell>
            <TableCell>1공장</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>보관중</TableCell>
            <TableCell>1창고</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalProductStock;
