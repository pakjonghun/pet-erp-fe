import CommonLoading from '@/components/ui/loading/CommonLoading';
import { Stack } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { ProductSaleMenu } from '@/http/graphql/codegen/graphql';
import ProductSaleDetailItem from './_components/ProductSaleDetailItem';

interface Props {
  rows: ProductSaleMenu[];
  selectedProduct: ProductSaleMenu | null;
  isLoading: boolean;
  onClickItem: (item: ProductSaleMenu) => void;
  cardScrollRef: Dispatch<SetStateAction<null | HTMLElement>>;
}

const ProductCardContent: FC<Props> = ({
  rows,
  selectedProduct,
  isLoading,
  onClickItem,
  cardScrollRef,
}) => {
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        display: {
          xs: 'flex',
          md: 'none',
        },
      }}
    >
      {rows.map((data, index) => {
        const isLast = index + 1 === rows.length;
        return (
          <ProductSaleDetailItem
            isSelected={selectedProduct?.code === data.code}
            onClickItem={onClickItem}
            scrollRef={isLast ? cardScrollRef : undefined}
            key={data._id}
            index={index + 1}
            data={data}
          />
        );
      })}
      {isLoading && <CommonLoading />}
    </Stack>
  );
};

export default ProductCardContent;
