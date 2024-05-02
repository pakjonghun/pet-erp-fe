import { FC } from 'react';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import { getNumberWithComma, getKCWFormat } from '@/utils/common';
import { SxProps, Table, TableHead, TableRow } from '@mui/material';
import TableBodySection from './TableBodySection';
import { useReactiveVar } from '@apollo/client';
import { saleTotal } from '@/store/saleStore';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import { CommonListProps } from '@/types';

interface Props extends CommonListProps<ProductSaleData> {
  setSelectedProductSale: (product: ProductSaleData | null) => void;
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

  return (
    <ScrollTableContainer
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
        ...sx,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <HeadCell text="이름" />
            <HeadCell
              sx={{ textAlign: 'right' }}
              text={
                <>
                  판매수량
                  <br />({getNumberWithComma(totalCount)})
                </>
              }
            />
            <HeadCell
              sx={{ textAlign: 'right' }}
              text={
                <>
                  매출
                  <br />({getKCWFormat(totalPayCost)})
                </>
              }
            />

            <HeadCell
              sx={{ textAlign: 'right' }}
              text={
                <>
                  수익
                  <br />({getKCWFormat(totalProfit)})
                </>
              }
            />
            <HeadCell
              sx={{ textAlign: 'right' }}
              text={
                <>
                  수익율
                  <br />({getKCWFormat(totalProfit)})
                </>
              }
            />
            <HeadCell text="TOP5 거래처" />
          </TableRow>
        </TableHead>
        <TableBodySection
          data={data}
          isEmpty={isEmpty}
          isLoading={isLoading}
          scrollRef={scrollRef}
          setSelectedProductSale={setSelectedProductSale}
        />
      </Table>
    </ScrollTableContainer>
  );
};

export default ProductSaleTable;
