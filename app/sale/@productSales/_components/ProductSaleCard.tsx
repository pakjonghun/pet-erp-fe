import { FC, useState } from 'react';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EMPTY } from '@/constants';
import { ProductSaleData } from '@/http/graphql/codegen/graphql';
import LabelText from '@/components/ui/typograph/LabelText';

interface Props {
  productSaleData: ProductSaleData;
  scrollRef: ((elem: HTMLTableRowElement) => void) | null;
}

const ProductSaleCard: FC<Props> = ({ productSaleData, scrollRef }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <Paper ref={scrollRef} sx={{ position: 'relative', py: 3, px: 4 }}>
      <IconButton
        sx={{ position: 'absolute', right: 3, top: 3 }}
        onClick={(event) => {
          setMenuAnchor(event.currentTarget);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Box>
        {/* <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="이름" text={subsidiary.name} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="분류" text={subsidiary.category?.name ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText label="코드" text={subsidiary.code} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LabelText label="원가" text={subsidiary.wonPrice ?? EMPTY} />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}>
            <LabelText
              label="리드타임(일)"
              text={subsidiary.leadTime ? `${subsidiary.leadTime}일` : EMPTY}
            />
          </Box>
        </Stack> */}
      </Box>
    </Paper>
  );
};

export default ProductSaleCard;
