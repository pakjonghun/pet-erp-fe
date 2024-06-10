import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { SaleInfos } from '@/http/graphql/codegen/graphql';

interface Props {
  saleInfos: SaleInfos[];
}

const DashboardTableBody: FC<Props> = ({ saleInfos }) => {
  return (
    <>
      {saleInfos.map((saleInfo) => (
        <TableRow key={saleInfo.name}>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{saleInfo.name}</TableCell>
          <SaleTableCell
            current={saleInfo.accPayCost ?? 0}
            previous={saleInfo.prevAccPayCost ?? 0}
          />
          <SaleTableCell
            current={saleInfo.accCount ?? 0}
            previous={saleInfo.prevAccCount ?? 0}
            numberType="comma"
          />
          <SaleTableCell
            current={saleInfo.accProfit ?? 0}
            previous={saleInfo.prevAccProfit ?? 0}
            numberType="comma"
          />
          <SaleTableCell
            current={getProfitRate(saleInfo?.accProfit ?? 0, saleInfo?.accPayCost ?? 0)}
            previous={getProfitRate(saleInfo?.prevAccProfit ?? 0, saleInfo?.prevAccPayCost ?? 0)}
            numberType="percent"
          />
        </TableRow>
      ))}
    </>
  );
};

export default DashboardTableBody;
