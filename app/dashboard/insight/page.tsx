'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AutocompleteRenderInputParams,
  Button,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import MultiAutoComplete from '@/components/ui/select/MultiAutoComplete';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { LIMIT } from '@/constants';
import { useProducts } from '@/http/graphql/hooks/product/useProducts';
import useTextDebounce from '@/hooks/useTextDebounce';
import GroupList, { GroupProps } from '../_components/GroupList';
import { Product } from '@/http/graphql/codegen/graphql';
import { ERP_GROUP_LIST } from './constants';
import { v4 } from 'uuid';

const ProductLayout = () => {
  const [productKeyword, setProductKeyword] = useState('');
  const delayedProductKeyword = useTextDebounce(productKeyword);

  const {
    data: products,
    networkStatus: productNetwork,
    fetchMore: productFetchMore,
  } = useProducts({
    keyword: delayedProductKeyword,
    limit: LIMIT,
    skip: 0,
  });
  const productRows = products?.products.data ?? [];
  const productByName = new Map(productRows.map((item) => [item.name, item]));
  const cachedOptions = useMemo(
    () => productRows.map((row) => row.name) ?? [],
    [products?.products.data]
  );
  const isProductLoading = productNetwork == 1 || productNetwork == 2 || productNetwork == 3;
  const productCallback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (isProductLoading) return;

      const totalCount = products?.products.totalCount;
      if (totalCount != null && totalCount > productRows.length) {
        productFetchMore({
          variables: {
            productsInput: {
              keyword: delayedProductKeyword,
              limit: LIMIT,
              skip: productRows.length,
            },
          },
        });
      }
    }
  };
  const productScrollRef = useInfinityScroll({ callback: productCallback });

  const [productList, setProductList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<GroupProps[]>([]);

  useEffect(() => {
    try {
      const defaultGroupList = localStorage.getItem(ERP_GROUP_LIST);
      if (!defaultGroupList) return;

      const parsedGroupList = JSON.parse(defaultGroupList);
      setGroupList(parsedGroupList);
    } catch (err) {
      //
    }
  }, [setGroupList]);

  const handleCreateGroup = () => {
    const groupItem: GroupProps = {
      id: v4(),
      tagName: `#태그 이름을 정해주세요.`,
      productList: productList.map((item) => productByName.get(item)) as Product[],
    };
    setGroupList((prev) => {
      const nextGroupList = [groupItem, ...prev];
      try {
        localStorage.setItem(ERP_GROUP_LIST, JSON.stringify(nextGroupList));
      } catch (err) {
        //
      } finally {
        return nextGroupList;
      }
    });
    setProductList([]);
    setProductKeyword('');
  };

  const removeGroupList = (id: string) => {
    setGroupList((prev) => {
      const nextGroupList = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(ERP_GROUP_LIST, JSON.stringify(nextGroupList));
      } catch (err) {
        //
      } finally {
        return nextGroupList;
      }
    });
  };

  return (
    <>
      <Stack direction="row" gap={3} sx={{ mt: 4 }}>
        <MultiAutoComplete
          inputValue={productKeyword}
          onInputChange={(_, newValue) => setProductKeyword(newValue)}
          loading={isProductLoading}
          onChange={setProductList}
          value={productList}
          scrollRef={productScrollRef}
          options={cachedOptions}
          renderSearchInput={(params: AutocompleteRenderInputParams) => {
            return (
              <FormControl fullWidth>
                <TextField {...params} label="비교 분석할 제품목록 선택" size="small" />
              </FormControl>
            );
          }}
        />
        <Button
          sx={{ whiteSpace: 'nowrap', width: '140px' }}
          disabled={!productList.length}
          variant="contained"
          onClick={handleCreateGroup}
        >
          그룹생성
        </Button>
      </Stack>
      {groupList.map(({ productList, tagName, id }) => {
        return (
          <GroupList
            key={id}
            id={id}
            removeGroupList={removeGroupList}
            tagName={tagName}
            productList={productList}
          />
        );
      })}
    </>
  );
};

export default ProductLayout;
