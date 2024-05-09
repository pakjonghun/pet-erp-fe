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
import { ProductOrder, TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import OptionCell from './OptionCell';
import { SelectedOptionItem } from '@/constants';
import AddOrderModal from '../../_components/AddOrderModal';
import EditOrderModal from '../../_components/EditOrderModal';
import RemoveOrderModal from '../../_components/RemoveOrderModal';

interface Props {
  productStock: TotalProductStockOutput;
}

const mockSelectedOrder: ProductOrder = {
  _id: '1',
  factory: {
    _id: '2',
    name: 'fac2',
  },
  notPayCost: 10,
  payCost: 120,
  products: [],
  storage: {
    _id: '22',
    name: 'pro2',
  },
  totalPayCost: 100,
};

const SubTableOrder: FC<Props> = ({ productStock }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | ProductOrder>(null);

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
        >{`${productStock.product.name}(${productStock.storageCount}+${productStock.orderCount})`}</Typography>
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
            <TableCell>공장</TableCell>
            <TableCell>제품목록</TableCell>
            <TableCell>총 수량</TableCell>
            <TableCell>계약금</TableCell>
            <TableCell>잔금</TableCell>
            <TableCell>총 금액</TableCell>
            <TableCell>지불여부</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Global Tech Factory</TableCell>
            <TableCell>Laptop(100EA), Desktop Computer(50EA)</TableCell>
            <TableCell>101</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>100</TableCell>
            <TableCell>900</TableCell>
            <TableCell>미지급</TableCell>
            <OptionCell onClick={setMenuAnchor} />
          </TableRow>
          <TableRow>
            <TableCell>Global Tech Factory</TableCell>
            <TableCell>Laptop(100EA), Desktop Computer(50EA)</TableCell>
            <TableCell>101</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>100</TableCell>
            <TableCell>900</TableCell>
            <TableCell>미지급</TableCell>
            <OptionCell onClick={setMenuAnchor} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubTableOrder;
