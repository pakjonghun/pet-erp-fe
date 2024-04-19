import { FC, useEffect, useState } from 'react';
import { Product } from '@/api/graphql/codegen/graphql';
import { useProducts } from '@/api/graphql/hooks/product/useProducts';
import { LIMIT } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { Box, Button, Popover, Stack, TableBody } from '@mui/material';
import EmptyRow from '@/components/table/EmptyRow';
import ProductBodyRow from './ProductBodyRow';
import { SelectedProductOption } from '../types';
import RemoveProductModal from './RemoveProductModal';
import EditProductModal from './EditProductModal';
import PopupContainer from '@/components/ui/modal/ModalContainer';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import LabelText from '@/components/ui/typograph/LabelText';
import { getKCWFormat } from '@/util';

interface Props {
  keyword: string;
}

const ProductionTableBody: FC<Props> = ({ keyword }) => {
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const [optionType, setOptionType] = useState<null | SelectedProductOption>(null);
  const { data, networkStatus, fetchMore, refetch, client } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    refetch();
  }, [keyword, client, refetch]);

  const rows = data?.products.data ?? [];

  const handleClickOption = (option: SelectedProductOption | null, product: Product | null) => {
    setSelectedProduct(product);
    setOptionType(option);
  };

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (networkStatus != 3 && networkStatus != 1) {
        const totalCount = data?.products.totalCount;
        if (totalCount != null && totalCount > rows.length) {
          fetchMore({
            variables: {
              productsInput: {
                keyword,
                skip: rows.length,
                limit: LIMIT,
              },
            },
          });
        }
      }
    }
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const scrollRef = useInfinityScroll({ callback });
  const isEmpty = rows.length === 0;

  return (
    <TableBody>
      {selectedProduct && (
        <RemoveProductModal
          open={optionType === 'delete'}
          onClose={() => handleClickOption(null, null)}
          selectedProduct={selectedProduct}
        />
      )}

      {selectedProduct && (
        <EditProductModal
          open={optionType === 'edit'}
          onClose={() => handleClickOption(null, null)}
          selectedProduct={selectedProduct}
        />
      )}
      {!!selectedProduct && (
        <Popover
          anchorReference="anchorPosition"
          onClose={handleClosePopover}
          anchorPosition={popoverPosition}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
        >
          <PopupContainer isModal={false} onClose={handleClosePopover}>
            <ModalTitle text="제품 세부내용" />
            <Stack>
              <LabelText label="코드" text={selectedProduct.code} />
              <LabelText label="이름" text={selectedProduct.name} />
              <LabelText label="분류" text={selectedProduct.category?.name ?? ''} />
              <LabelText label="바코드" text={selectedProduct.barCode ?? ''} />
              <LabelText label="판매가" text={getKCWFormat(selectedProduct.salePrice)} />
              <LabelText label="원가" text={getKCWFormat(selectedProduct.wonPrice)} />
              <LabelText label="유지기간" text={selectedProduct.maintainDate ?? ''} />
              <LabelText label="리드타임" text={selectedProduct.leadTime} />
            </Stack>
            <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  handleClosePopover();
                  handleClickOption('delete', selectedProduct);
                }}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClosePopover();
                  handleClickOption('edit', selectedProduct);
                }}
              >
                편집
              </Button>
            </Stack>
          </PopupContainer>
        </Popover>
      )}

      <EmptyRow colSpan={6} isEmpty={isEmpty} />
      {rows.map((item, index) => {
        const product = item as unknown as Product;
        const isLast = index === rows.length - 1;
        return (
          <ProductBodyRow
            onClickRow={(event, product: Product) => {
              setPopoverPosition({ left: event.clientX, top: event.clientY });
              setPopoverAnchor(event.currentTarget);
              setSelectedProduct(product);
            }}
            key={product._id}
            product={product}
            scrollRef={isLast ? scrollRef : null}
            onClickOption={handleClickOption}
          />
        );
      })}
    </TableBody>
  );
};

export default ProductionTableBody;
