import { FC } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Typography,
  Stack,
} from '@mui/material';
import { SubsidiaryStockColumn } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import EmptyRow from '@/components/table/EmptyRow';
import LabelText from '@/components/ui/typograph/LabelText';
import { useSubsidiaryStocksState } from '@/http/graphql/hooks/stock/useSubsidiaryStocksState';
import {
  CommonHeaderRow,
  CommonTable,
  CommonTableBody,
} from '@/components/commonStyles';
import LoadingRow from '@/components/table/LoadingRow';

interface Props {
  productStock: SubsidiaryStockColumn;
  onClickOption: (
    option: any | null,
    client: SubsidiaryStockColumn | null
  ) => void;
}

const SubTableTotalProductStock: FC<Props> = ({
  productStock,
  onClickOption,
}) => {
  const { networkStatus, data } = useSubsidiaryStocksState(
    productStock.productName
  );

  const rows = data?.subsidiaryStocksState ?? [];

  const isLoading =
    networkStatus == 1 || networkStatus == 3 || networkStatus == 2;
  const isEmpty = !isLoading && rows.length == 0;

  return (
    <TableContainer sx={{ mt: 1 }}>
      <Stack
        sx={{ ml: 2 }}
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <LabelText label="부자재이름" text={productStock.productName} />

        <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 'auto' }}>
          <ActionButton
            size="small"
            icon={<AddCircleOutlineIcon />}
            text="입고"
            onClick={() => onClickOption('add', productStock)}
          />
          <ActionButton
            size="small"
            icon={<RemoveCircleOutlineIcon />}
            text="출고"
            onClick={() => onClickOption('out', productStock)}
          />
        </Stack>
      </Stack>
      <Typography variant="caption" sx={{ ml: 2, display: 'inline-block' }}>
        모든 창고의 부자재 현황 입니다.
      </Typography>
      <CommonTable sx={{ mt: 2 }} size="small">
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              fontWeight: 800,
            },
          }}
        >
          <CommonHeaderRow>
            <TableCell>위치</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>자산합계</TableCell>
          </CommonHeaderRow>
        </TableHead>
        <CommonTableBody>
          <EmptyRow
            colSpan={5}
            isEmpty={isEmpty}
            message="검색된 데이터가 없습니다."
          />
          <LoadingRow isLoading={isLoading} colSpan={5} />
          {rows.map((row, index) => {
            return (
              <TableRow key={`${row.__typename}_${index}`}>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            );
          })}
        </CommonTableBody>
      </CommonTable>
    </TableContainer>
  );
};

export default SubTableTotalProductStock;
