import { FC } from 'react';
import { Product, Storage } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import ModalTitle from '@/components/ui/typograph/ModalTitle';
import { getKCWFormat } from '@/utils/common';
import { Stack, Button } from '@mui/material';
import BasePopover from '@/components/ui/modal/BasePopover';
import { EMPTY } from '@/constants';
import { useStorages } from '@/http/graphql/hooks/storage/useStorages';

interface Props {
  open: boolean;
  anchorEl: null | HTMLElement;
  position: { left: number; top: number };
  selectedProduct: Product;
  onClose: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const ProductDetailPopover: FC<Props> = ({
  open,
  anchorEl,
  position,
  selectedProduct,
  onClose,
  onClickDelete,
  onClickEdit,
}) => {
  const { data } = useStorages({
    keyword: '',
    limit: 1000,
    skip: 0,
  });

  const targetStorage = ((data?.storages.data as Storage[]) ?? []).find(
    (item) => item._id === selectedProduct.storageId
  );

  return (
    <BasePopover onClose={onClose} position={position} open={open} anchorEl={anchorEl}>
      <ModalTitle text="제품 세부내용" />
      <Stack>
        <LabelText label="코드" text={selectedProduct.code} />
        <LabelText label="이름" text={selectedProduct.name} />
        <LabelText label="분류" text={selectedProduct.category?.name ?? EMPTY} />
        <LabelText label="바코드" text={selectedProduct.barCode ?? EMPTY} />
        <LabelText
          label="판매가"
          text={
            selectedProduct.salePrice == null
              ? EMPTY
              : getKCWFormat(selectedProduct.salePrice) ?? EMPTY
          }
        />
        <LabelText
          label="원가"
          text={
            selectedProduct.wonPrice == null
              ? EMPTY
              : getKCWFormat(selectedProduct.wonPrice) ?? EMPTY
          }
        />
        <LabelText label="리드타임" text={selectedProduct.leadTime ?? EMPTY} />
        <LabelText label="출고 창고" text={targetStorage?.name ?? EMPTY} />
      </Stack>
      <Stack direction="row" gap={1} sx={{ mt: 2 }} justifyContent="flex-end">
        <Button color="error" variant="outlined" onClick={onClickDelete}>
          삭제
        </Button>
        <Button variant="contained" onClick={onClickEdit}>
          편집
        </Button>
      </Stack>
    </BasePopover>
  );
};

export default ProductDetailPopover;
