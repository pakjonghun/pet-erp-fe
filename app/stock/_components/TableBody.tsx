import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitRate } from '@/utils/sale';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import { useReactiveVar } from '@apollo/client';
import { showPrevData } from '@/store/saleStore';

interface Props {
  saleInfos: SaleInfos[];
}

const DashboardTableBody: FC<Props> = ({ saleInfos }) => {
  const isShowPrevData = useReactiveVar(showPrevData);
  return (
    <>
      {saleInfos.map((saleInfo) => (
        <TableRow key={saleInfo.name}>
          <TableCell>{saleInfo.name}</TableCell>
          <SaleTableCell
            isShowPrevData={isShowPrevData}
            current={saleInfo.accPayCost ?? 0}
            previous={saleInfo.prevAccPayCost ?? 0}
          />
          <SaleTableCell
            isShowPrevData={isShowPrevData}
            current={saleInfo.accCount ?? 0}
            previous={saleInfo.prevAccCount ?? 0}
            numberType="comma"
          />
          <SaleTableCell
            isShowPrevData={isShowPrevData}
            current={saleInfo.accProfit ?? 0}
            previous={saleInfo.prevAccProfit ?? 0}
            numberType="comma"
          />
          <SaleTableCell
            isShowPrevData={isShowPrevData}
            current={getProfitRate(
              saleInfo?.accProfit ?? 0,
              saleInfo?.accPayCost ?? 0
            )}
            previous={getProfitRate(
              saleInfo?.prevAccProfit ?? 0,
              saleInfo?.prevAccPayCost ?? 0
            )}
            numberType="percent"
          />
        </TableRow>
      ))}
    </>
  );
};

export default DashboardTableBody;
