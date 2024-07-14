import { Collapse, Box, Tabs } from '@mui/material';
import React, { FC, useState } from 'react';
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
    <Collapse in={open}>
      <Box>
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
  );
};

export default CollapseRow;
