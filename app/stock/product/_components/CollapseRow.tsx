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
import React, { FC, useState } from 'react';
import { ClientHeaderList } from '../constants';
import { NormalTab } from '@/components/commonStyles';
import { TotalProductStockOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import TotalProductStock from './TotalProductStock';

interface Props {
  open: boolean;
  productStock: TotalProductStockOutput;
  onClickOption: (option: any | null, client: TotalProductStockOutput | null) => void;
}

const CollapseTabs = ['총괄현황', '발주현황', '이동현황'];

const CollapseRow: FC<Props> = ({ open, productStock, onClickOption }) => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <TableRow>
      <TableCell
        sx={{
          py: 0,
          bgcolor: (theme) => alpha(theme.palette.grey[100], 0.5),
        }}
        colSpan={ClientHeaderList.length}
      >
        <Collapse in={open}>
          <Box sx={{ mt: 4, mb: 8, width: '90%', ml: 'auto' }}>
            <Tabs value={tabValue} sx={{ borderBottom: '1px solid gray', mb: 3 }}>
              {CollapseTabs.map((tab, index) => {
                return (
                  <NormalTab
                    key={`${index}_${tab}`}
                    fontSize={14}
                    label={tab}
                    onClick={() => setTabValue(index)}
                  />
                );
              })}
            </Tabs>
            {tabValue === 0 && (
              <TotalProductStock onClickOption={onClickOption} productStock={productStock} />
            )}
            {tabValue === 1 && (
              <TotalProductStock onClickOption={onClickOption} productStock={productStock} />
            )}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseRow;
