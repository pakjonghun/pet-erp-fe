import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  alpha,
  FormControl,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { StockStorageHeaderList } from '../constants';
import { StockStorageOutput } from '@/http/graphql/codegen/graphql';
import SubTableProductStock from './SubTableProductStock';
import { Search } from '@mui/icons-material';
import useTextDebounce from '@/hooks/useTextDebounce';

interface Props {
  open: boolean;
  storageStock: StockStorageOutput;
  onClickOption: (
    option: any | null,
    client: StockStorageOutput | null
  ) => void;
}

const CollapseTabs = ['총괄현황', '발주현황', '이동현황'];

const CollapseRow: FC<Props> = ({ open, storageStock, onClickOption }) => {
  const [keyword, setKeyword] = useState('');
  const delayedKeyword = useTextDebounce(keyword);

  return (
    <TableRow>
      <TableCell
        sx={{
          py: 0,
          bgcolor: (theme) => alpha(theme.palette.grey[100], 0.5),
        }}
        colSpan={StockStorageHeaderList.length}
      >
        <Collapse in={open}>
          <Box sx={{ mt: 4, mb: 8, width: '90%', ml: 'auto' }}>
            <FormControl>
              <TextField
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300, my: 2 }}
                label="검색할 제품 이름을 입력하세요."
                size="small"
              />
            </FormControl>
            <SubTableProductStock
              storage={storageStock}
              keyword={delayedKeyword}
            />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseRow;
