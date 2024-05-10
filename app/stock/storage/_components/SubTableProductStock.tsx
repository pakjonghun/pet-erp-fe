import { FC, useState } from 'react';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
  Stack,
  Menu,
} from '@mui/material';
import { Product, StockStorageOutput } from '@/http/graphql/codegen/graphql';
import ActionButton from '@/components/ui/button/ActionButton';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import { LIMIT, SelectedOptionItem } from '@/constants';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import OptionMenu from '@/components/ui/listItem/OptionMenu';
import OptionCell from './OptionCell';

interface Props {
  keyword: string;
  storage: StockStorageOutput;
  onClickOption: (option: any | null, storage: StockStorageOutput) => void;
  setProductName: (productName: string) => void;
}

const SubTableProductStock: FC<Props> = ({
  keyword,
  storage,
  onClickOption,
  setProductName,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const productOptionMenus: Record<any, SelectedOptionItem> = {
    edit: {
      callback: () => {
        onClickOption('add', storage);
        setMenuAnchor(null);
      },
      label: '입고',
      icon: <InventoryIcon />,
    },
    delete: {
      callback: () => {
        onClickOption('out', storage);
        setMenuAnchor(null);
      },
      label: '출고',
      icon: <InventoryIcon />,
    },
    order: {
      callback: () => {
        onClickOption('order', storage);
        setMenuAnchor(null);
      },
      label: '발주',
      icon: <FactoryOutlinedIcon />,
    },
    move: {
      callback: () => {
        onClickOption('move', storage);
        setMenuAnchor(null);
      },
      label: '이동',
      icon: <LocalShippingOutlinedIcon />,
    },
  };

  const { data, networkStatus, fetchMore, refetch } = useProducts({
    keyword,
    skip: 0,
    limit: LIMIT,
  });
  const rows = (data?.products.data as Product[]) ?? [];
  const isLoading = networkStatus == 3 || networkStatus == 1;
  const isEmpty = !isLoading && rows.length === 0;

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isLoading) return;

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
  };
  const scrollRef = useInfinityScroll({ callback });

  return (
    <TableContainer sx={{ mt: 1 }}>
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
      >
        {Object.entries(productOptionMenus).map(([option, menu]) => (
          <OptionMenu key={option} menu={menu} option={option} />
        ))}
      </Menu>

      <Stack direction="row" alignItems="center" gap={2}>
        <Typography
          variant="subtitle1"
          sx={{ p: 2, pt: 0, display: 'inline-block' }}
        >{`${storage.name}`}</Typography>
      </Stack>
      <Table sx={{ mt: 2 }} size="small">
        <TableHead
          sx={{
            '.MuiTableCell-root': {
              fontWeight: 800,
            },
          }}
        >
          <TableRow>
            <TableCell>제품 이름</TableCell>
            <TableCell>재고수량</TableCell>
            <TableCell>최근 1주 판매량</TableCell>
            <TableCell>재고 소진까지 남은기간</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>제품 이름1</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>10일</TableCell>
            <OptionCell
              onClick={(event) => {
                setMenuAnchor(event);
                setProductName('제품 이름1');
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell>제품 이름2</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>10일</TableCell>
            <OptionCell
              onClick={(event) => {
                setMenuAnchor(event);
                setProductName('제품 이름2');
              }}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubTableProductStock;
