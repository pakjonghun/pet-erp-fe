import { FC } from 'react';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import { getNumberWithComma, getKCWFormat } from '@/utils/common';
import { SxProps, TableHead } from '@mui/material';
import TableBodySection from './TableBodySection';
import { useReactiveVar } from '@apollo/client';
import { saleTotal } from '@/store/saleStore';
import { CommonListProps } from '@/types';
import { CommonHeaderRow, CommonTable } from '@/components/commonStyles';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import { getProfitRate } from '@/utils/sale';

interface Props extends CommonListProps<ProductSaleMenu> {
  setSelectedProductSale: (product: ProductSaleMenu | null) => void;
  sx?: SxProps;
}

const ProductSaleTable: FC<Props> = ({
  data,
  isEmpty,
  isLoading,
  scrollRef,
  setSelectedProductSale,
  sx,
}) => {
  const { totalCount, totalProfit, totalPayCost } = useReactiveVar(saleTotal);
  const profitRate = getProfitRate(totalProfit, totalPayCost);

  return (
    <ScrollTableContainer
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
        height: '100%',
        ...sx,
      }}
    >
      <CommonTable stickyHeader>
        <TableHead>
          <CommonHeaderRow>
            <HeadCell text="이름/코드" />
            <HeadCell
              sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
              text={<>판매수량 ({getNumberWithComma(totalCount)})</>}
            />
            <HeadCell
              sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
              text={<>매출({getKCWFormat(totalPayCost)})</>}
            />

            <HeadCell
              sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
              text={<>수익({getKCWFormat(totalProfit)})</>}
            />
            <HeadCell
              sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
              text={<>{`수익율(${profitRate}%`})</>}
            />
            <HeadCell text="거래처" />
          </CommonHeaderRow>
        </TableHead>
        <TableBodySection
          data={data}
          isEmpty={isEmpty}
          isLoading={isLoading}
          scrollRef={scrollRef}
          setSelectedProductSale={setSelectedProductSale}
        />
      </CommonTable>
    </ScrollTableContainer>
  );
};

export default ProductSaleTable;
