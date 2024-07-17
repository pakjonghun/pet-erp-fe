import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import SaleTableCell from '@/components/table/SaleTableCell';
import { getProfitListItem, getProfitRate } from '@/utils/sale';
import { SaleInfos } from '@/http/graphql/codegen/graphql';
import { useReactiveVar } from '@apollo/client';
import { showPrevData } from '@/store/saleStore';
import { usePathname } from 'next/navigation';

interface Props {
  saleInfos: SaleInfos[];
}

const DashboardTableBody: FC<Props> = ({ saleInfos }) => {
  const pathname = usePathname();
  const isClient = pathname.toLowerCase().includes('client');

  const isShowPrevData = useReactiveVar(showPrevData);
  return (
    <>
      {saleInfos.map((saleInfo) => {
        const { current, prev } = getProfitListItem(saleInfo);

        return (
          <TableRow key={saleInfo.name}>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
              {isClient ? saleInfo._id : saleInfo.name}
            </TableCell>
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={saleInfo.accTotalPayment ?? 0}
              previous={saleInfo.prevAccTotalPayment ?? 0}
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={saleInfo.accCount ?? 0}
              previous={saleInfo.prevAccCount ?? 0}
              numberType="comma"
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={current}
              previous={prev}
              numberType="currency"
            />
            <SaleTableCell
              isShowPrevData={isShowPrevData}
              current={getProfitRate(current, saleInfo?.accPayCost ?? 0)}
              previous={getProfitRate(prev, saleInfo?.prevAccPayCost ?? 0)}
              numberType="percent"
            />
          </TableRow>
        );
      })}
    </>
  );
};

export default DashboardTableBody;
