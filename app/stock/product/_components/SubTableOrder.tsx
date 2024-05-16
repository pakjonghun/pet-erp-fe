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
  Menu,
} from '@mui/material';
import { ProductOrder, StockColumn, TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import OptionCell from './OptionCell';
import { SelectedOptionItem } from '@/constants';
import AddOrderModal from '../../_components/AddOrderModal';
import EditOrderModal from '../../_components/EditOrderModal';
import RemoveOrderModal from '../../_components/RemoveOrderModal';
import { useStocksOrder } from '@/http/graphql/hooks/stock/useStocksOrder';
import dayjs from 'dayjs';
import { getNumberWithComma } from '@/utils/common';

interface Props {
  productStock: StockColumn;
}

const mockSelectedOrder: ProductOrder = {
  isDone: false,
  _id: '1',
  factory: {
    _id: '2',
    name: 'fac2',
  },
  notPayCost: 10,
  payCost: 120,
  products: [],
  totalPayCost: 100,
  createdAt: new Date(),
};

const SubTableOrder: FC<Props> = ({ productStock }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | ProductOrder>(null);
  const { data, networkStatus } = useStocksOrder(productStock.productName);
  const isLoading = networkStatus == 1 || networkStatus == 3 || networkStatus == 2;
  const rows = (data?.stocksOrder as ProductOrder[]) ?? [];

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        setSelectedOrder(mockSelectedOrder);
        setOpenEditModal(true);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        setSelectedOrder(mockSelectedOrder);
        setOpenRemoveModal(true);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <InventoryIcon />,
    },
  };

  return (
    <TableContainer sx={{ mt: 1 }}>
      {openAddModal && <AddOrderModal open={openAddModal} onClose={() => setOpenAddModal(false)} />}

      {selectedOrder && (
        <EditOrderModal
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedOrder(null);
          }}
          selectedOrder={selectedOrder}
        />
      )}

      {selectedOrder && (
        <RemoveOrderModal
          open={openRemoveModal}
          onClose={() => {
            setOpenRemoveModal(false);
            setSelectedOrder(null);
          }}
          selectedOrder={selectedOrder}
        />
      )}

      <Stack direction="row" alignItems="center" gap={2}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, pt: 0, display: 'inline-block' }}
        >{`${productStock.productName}`}</Typography>
        <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 'auto' }}>
          <ActionButton
            size="small"
            icon={<InventoryIcon />}
            text="발주등록"
            onClick={() => {
              setOpenAddModal(true);
            }}
          />
        </Stack>
      </Stack>
      <Table sx={{ mt: 2 }} size="small">
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
          {Object.entries(productOptionMenus).map(([option, menu]) => (
            <OptionMenu key={option} menu={menu} option={option} />
          ))}
        </Menu>
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              fontWeight: 800,
            },
          }}
        >
          <TableRow>
            <TableCell>발주날짜</TableCell>
            <TableCell>공장</TableCell>
            <TableCell>총 수량</TableCell>
            <TableCell>계약금</TableCell>
            <TableCell>잔금</TableCell>
            <TableCell>총 금액</TableCell>
            <TableCell>지불여부</TableCell>
            <TableCell>생산완료 예정일</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => {
            const allEmptyLeadTime = row.products.every((item) => item.product.leadTime == null);
            const largestLeadTime = allEmptyLeadTime
              ? null
              : row.products.reduce(
                  (acc, cur) =>
                    (cur.product.leadTime ?? 0) > acc ? cur.product.leadTime ?? 0 : acc,
                  -Infinity
                );

            const completeDate =
              largestLeadTime == null
                ? '알수없음'
                : dayjs(row.createdAt).add(largestLeadTime, 'day').format('YYYY-MM-DD');

            return (
              <TableRow key={row._id}>
                <TableCell>{dayjs(row.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.factory.name}</TableCell>
                <TableCell>
                  {getNumberWithComma(row.products.reduce((acc, cur) => acc + cur.count, 0))}
                </TableCell>
                <TableCell>{row.payCost}</TableCell>
                <TableCell>{row.notPayCost}</TableCell>
                <TableCell>{row.totalPayCost}</TableCell>
                <TableCell>{row.isDone ? '지불완료' : '미지불'}</TableCell>
                <TableCell>{completeDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubTableOrder;
