import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import DashboardTableCell from './TableCell';
import { getProfitRate } from '../utils';

interface Props {
  title: string;
  saleInfos: SaleInfos[];
}

const DashboardTable: FC<Props> = ({ saleInfos, title }) => {
  return (
    <TableContainer component={Paper} sx={{ p: 3 }}>
      <Typography sx={{ my: 1, pl: 1 }} variant="h5">
        {title}
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
          {saleInfos.map((saleInfo) => (
            <TableRow key={saleInfo.name}>
              <TableCell>{saleInfo.name}</TableCell>
              <DashboardTableCell
                current={saleInfo.accPayCost ?? 0}
                previous={saleInfo.prevAccPayCost ?? 0}
              />
              <DashboardTableCell
                current={saleInfo.accCount ?? 0}
                previous={saleInfo.prevAccCount ?? 0}
                numberType="comma"
              />
              <DashboardTableCell
                current={saleInfo.accProfit ?? 0}
                previous={saleInfo.prevAccProfit ?? 0}
                numberType="comma"
              />
              <DashboardTableCell
                current={getProfitRate(saleInfo?.accProfit ?? 0, saleInfo?.accPayCost ?? 0)}
                previous={getProfitRate(
                  saleInfo?.prevAccProfit ?? 0,
                  saleInfo?.prevAccPayCost ?? 0
                )}
                numberType="percent"
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
