import { FC } from 'react';
import { TableRow, TableCell, Collapse, Box, Tabs, alpha } from '@mui/material';
import { ProductStockHeaderList } from '../constants';
import { StockColumn, SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import SubTableTotalProductStock from './SubTableTotalProductStock';

interface Props {
  open: boolean;
  productStock: SubsidiaryStockColumn;
  onClickOption: (option: any | null, client: SubsidiaryStockColumn | null) => void;
}

const CollapseRow: FC<Props> = ({ open, productStock, onClickOption }) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          py: 0,
          bgcolor: (theme) => alpha(theme.palette.grey[100], 0.5),
        }}
        colSpan={ProductStockHeaderList.length}
      >
        <Collapse in={open}>
          <Box sx={{ mt: 4, mb: 8, width: '90%', ml: 'auto' }}>
            <SubTableTotalProductStock onClickOption={onClickOption} productStock={productStock} />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseRow;
