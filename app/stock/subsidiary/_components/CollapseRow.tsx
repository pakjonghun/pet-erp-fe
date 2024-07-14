import { FC } from 'react';
import { Collapse, Box } from '@mui/material';
import { SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import SubTableTotalProductStock from './SubTableTotalProductStock';

interface Props {
  open: boolean;
  productStock: SubsidiaryStockColumn;
  onClickOption: (
    option: any | null,
    client: SubsidiaryStockColumn | null
  ) => void;
}

const CollapseRow: FC<Props> = ({ open, productStock, onClickOption }) => {
  return (
    <Collapse in={open}>
      <Box>
        <SubTableTotalProductStock
          onClickOption={onClickOption}
          productStock={productStock}
        />
      </Box>
    </Collapse>
  );
};

export default CollapseRow;
