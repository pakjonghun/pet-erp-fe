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
import { Move, TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import OptionCell from './OptionCell';
import { SelectedOptionItem } from '@/constants';
import EditMoveModal from '../../_components/EditMoveModal';
import RemoveMoveModal from '../../_components/RemoveMoveModal';
import AddMoveModal from '../../_components/AddMoveModal';

interface Props {
  productStock: TotalProductStockOutput;
}

const mockSelectedMove: Move = {
  _id: '1',
  products: [],
  startDate: new Date(),
};

const SubTableMove: FC<Props> = ({ productStock }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedMove, setSelectedMove] = useState<null | Move>(null);

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        setSelectedMove(mockSelectedMove);
        setOpenEditModal(true);
        setMenuAnchor(null);
      },
      label: '편집',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        setSelectedMove(mockSelectedMove);
        setOpenRemoveModal(true);
        setMenuAnchor(null);
      },
      label: '삭제',
      icon: <InventoryIcon />,
    },
  };

  return (
    <TableContainer sx={{ mt: 1 }}>
      <AddMoveModal
        productName=""
        storageStock={null}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      {selectedMove && (
        <EditMoveModal
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedMove(null);
          }}
          selectedMove={selectedMove}
        />
      )}

      {selectedMove && (
        <RemoveMoveModal
          open={openRemoveModal}
          onClose={() => {
            setOpenRemoveModal(false);
            setSelectedMove(null);
          }}
          selectedMove={selectedMove}
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
            text="이동등록"
            onClick={() => {
              setOpenAddModal(true);
            }}
          />
        </Stack>
      </Stack>
      <Table sx={{ mt: 2 }} size="small">
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
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
            <TableCell>출발장소</TableCell>
            <TableCell>도착장소</TableCell>
            <TableCell>출발날짜</TableCell>
            <TableCell>도착날짜</TableCell>
            <TableCell>제품목록</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>공장1</TableCell>
            <TableCell>창고1</TableCell>
            <TableCell>2024-10-10</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Laptop(100EA), Desktop Computer(50EA)</TableCell>
            <OptionCell onClick={setMenuAnchor} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubTableMove;
