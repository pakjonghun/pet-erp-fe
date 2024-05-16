import { TableRow, TableCell, Collapse, Box, Tabs, alpha } from '@mui/material';
import React, { FC, useState } from 'react';
import { ProductStockHeaderList } from '../constants';
import { NormalTab } from '@/components/commonStyles';
import { StockColumn } from '@/http/graphql/codegen/graphql';
import SubTableOrder from './SubTableOrder';
import SubTableTotalProductStock from './SubTableTotalProductStock';

interface Props {
  open: boolean;
  productStock: StockColumn;
  onClickOption: (option: any | null, client: StockColumn | null) => void;
}

const CollapseTabs = ['총괄현황', '발주현황'];

const CollapseRow: FC<Props> = ({ open, productStock, onClickOption }) => {
  const [tabValue, setTabValue] = useState(0);

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
              <SubTableTotalProductStock
                onClickOption={onClickOption}
                productStock={productStock}
              />
            )}
            {tabValue === 1 && <SubTableOrder productStock={productStock} />}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseRow;
