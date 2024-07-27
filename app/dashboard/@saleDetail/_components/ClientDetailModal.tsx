'use client';

import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { ClientSaleMenu } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';
import { getNumberWithComma } from '@/utils/common';
import BaseModal from '@/components/ui/modal/BaseModal';

interface Props {
  selectedClient: ClientSaleMenu;
  open: boolean;
  onClose: () => void;
}

const ClientSaleModal: FC<Props> = ({
  selectedClient: { name, code, products },
  open,
  onClose,
}) => {
  const productList = products.map((client) => Object.assign({}, client));

  return (
    <BaseModal open={open} onClose={onClose}>
      <Typography variant="h6" component="h6" sx={{ mb: 2, fontWeight: 600 }}>
        제품 상세정보
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={3} mb={2}>
        <LabelText label="이름" text={name} />
        <LabelText label="코드" text={code} />
      </Stack>

      <LabelText
        label="제품별 판매수량"
        text={productList.length > 0 ? '' : '판매 기록 없음'}
        sx={{ color: 'gray' }}
      />
      <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={2} mt={1}>
        {(productList ?? []).map((product) => {
          return (
            <LabelText
              key={product?.name ?? ''}
              label={product?.name ?? ''}
              text={getNumberWithComma(product.accCount ?? 0)}
            />
          );
        })}
      </Stack>
    </BaseModal>
  );
};

export default ClientSaleModal;
