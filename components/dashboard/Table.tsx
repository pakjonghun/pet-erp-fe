import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { SaleInfo } from '@/http/graphql/codegen/graphql';
import { FC } from 'react';
import { getKCWFormat, getNumberWithComma } from '@/util';

interface Props {
  saleInfos: SaleInfo[];
}

const DashboardTable: FC<Props> = ({ saleInfos }) => {
  function createData({ accCount, accPayCost, accProfit, name }: SaleInfo) {
    return {
      name,
      accCount: getNumberWithComma(accCount ?? 0),
      accPayCost: getKCWFormat(accPayCost ?? 0),
      accProfit: getKCWFormat(accProfit ?? 0),
      profitRate: Math.floor(((accProfit ?? 0) / (accPayCost ?? 0)) * 10000) / 100,
    };
  }

  const rows = saleInfos.map((sale) => createData(sale));

  return (
    <TableContainer component={Paper} sx={{ p: 3 }}>
      <Typography sx={{ my: 1, pl: 1 }} variant="h5">
        월 BEST 상품
      </Typography>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">매출</TableCell>
            <TableCell align="right">수량</TableCell>
            <TableCell align="right">수익</TableCell>
            <TableCell align="right">수익율</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.accPayCost}</TableCell>
              <TableCell align="right">{row.accCount}</TableCell>
              <TableCell align="right">{row.accProfit}</TableCell>
              <TableCell align="right">{row.profitRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
