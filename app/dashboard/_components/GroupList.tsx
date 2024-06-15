'use client';

import { FC, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton, ListSubheader, Stack, TextField, Typography } from '@mui/material';
import { Product, SaleInfos } from '@/http/graphql/codegen/graphql';
import { useReactiveVar } from '@apollo/client';
import { saleRange, showPrevData } from '@/store/saleStore';
import { useDashboardProducts } from '@/http/graphql/hooks/product/useDashboardProducts';
import { getNumberToString } from '@/utils/sale';
import { Cancel } from '@mui/icons-material';

export interface GroupProps {
  id: string;
  tagName: string;
  productList: Product[];
}

interface Props extends GroupProps {
  removeGroupList: (id: string) => void;
}

const GroupList: FC<Props> = ({ id, tagName, productList, removeGroupList }) => {
  const isShowPrevData = useReactiveVar(showPrevData);
  const { from, to } = useReactiveVar(saleRange);
  const productCodeList = productList.map((item) => item.code);

  const { data: insightData, networkStatus } = useDashboardProducts({
    from: from,
    to: to.endOf('day'),
    productCodeList,
  });

  const isLoading = networkStatus == 3 || networkStatus == 1;
  const productInsightList = insightData?.dashboardProducts;
  const productInsightsByCode = new Map<string, SaleInfos>();
  productInsightList?.forEach((item) => {
    if (!item._id) return;
    productInsightsByCode.set(item._id, item);
  });

  const [checked, setChecked] = useState(() => productList.map((item) => item.code));
  const [isEditing, setIsEditing] = useState(false);
  const [tag, setTag] = useState(tagName);

  const selectedProductInsightList = checked.map((item) => {
    return productInsightsByCode.get(item);
  });

  const footerTotal = selectedProductInsightList.reduce(
    (acc, cur) => {
      const nextValue = {
        accCount: (acc?.accCount ?? 0) + (cur?.accCount ?? 0),
        accPayCost: (acc?.accPayCost ?? 0) + (cur?.accPayCost ?? 0),
        accProfit: (acc?.accProfit ?? 0) + (cur?.accProfit ?? 0),
        prevAccCount: (acc?.prevAccCount ?? 0) + (cur?.prevAccCount ?? 0),
        prevAccProfit: (acc?.prevAccProfit ?? 0) + (cur?.prevAccProfit ?? 0),
        prevAccPayCost: (acc?.prevAccPayCost ?? 0) + (cur?.prevAccPayCost ?? 0),
      };
      return nextValue;
    },
    {
      accCount: 0,
      accPayCost: 0,
      accProfit: 0,
      prevAccCount: 0,
      prevAccProfit: 0,
      prevAccPayCost: 0,
    }
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <List
      sx={{
        position: 'relative',
        my: 6,
        borderRadius: 2,
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.shadows[1],
      }}
      subheader={
        <ListSubheader
          sx={{ height: 44, p: 0, borderRadius: 1, boxShadow: (theme) => theme.shadows[1] }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {isEditing ? (
              <TextField
                variant="outlined"
                autoFocus
                fullWidth
                sx={{
                  py: 0,
                  display: 'inline',
                  '& .MuiOutlinedInput-root': {
                    input: {
                      height: '100%',
                    },
                    '& fieldset': {
                      borderWidth: 1,
                      outline: 'none',
                    },
                    '& input': {
                      px: 2.4,
                    },
                  },
                }}
                size="small"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(false);
                  }
                }}
                onBlur={() => setIsEditing(false)}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            ) : (
              <Typography
                sx={{
                  border: '3px solid transparent',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  p: 1,
                  px: 2,
                  height: '100%',
                  width: '100%',
                }}
                onDoubleClick={() => setIsEditing(true)}
              >
                {tag}
              </Typography>
            )}
            <IconButton onClick={() => removeGroupList(id)}>
              <Cancel />
            </IconButton>
          </Stack>
        </ListSubheader>
      }
    >
      <ListItemText
        sx={{ mt: 2, px: 2 }}
        primary={
          <Grid container>
            <Grid textAlign="left" item xs={3}>
              <Stack direction="row" alignItems="center">
                <ListItemIcon>
                  <Checkbox
                    onChange={() => {
                      const isChecked = checked.length === productList?.length;
                      if (isChecked) {
                        setChecked([]);
                      } else {
                        setChecked(productList.map((item) => item.code));
                      }
                    }}
                    edge="start"
                    checked={checked.length === productList?.length}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '.MuiListItemText-primary': {
                      fontSize: 14,
                      fontWeight: 'bold',
                    },
                  }}
                  primary="이름"
                />
              </Stack>
            </Grid>
            <Grid
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              item
              xs={3}
            >
              판매수
            </Grid>
            <Grid
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              textAlign="center"
              item
              xs={3}
            >
              매출
            </Grid>
            <Grid
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              textAlign="center"
              item
              xs={3}
            >
              수익
            </Grid>
          </Grid>
        }
      />
      {productList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        const saleData = productInsightsByCode.get(value.code);

        return (
          <ListItem sx={{ px: 2 }} key={value._id} disablePadding>
            <ListItemButton sx={{ p: 0 }} role={undefined} onClick={handleToggle(value.code)} dense>
              <Grid container rowSpacing={1}>
                <Grid item xs={3}>
                  <Stack direction="row" alignItems="center">
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value.code) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '100px',
                        textOverflow: 'ellipsis',
                      }}
                      primary={value.name}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={getNumberToString(saleData?.accCount ?? 0, 'comma')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={getNumberToString(saleData?.accPayCost ?? 0, 'currency')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={getNumberToString(saleData?.accProfit ?? 0, 'currency')}
                  />
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItemText
        sx={{ mt: 2, px: 1, pt: 1, borderTop: '1px solid lightGrey' }}
        primary={
          <Grid sx={{ fontSize: 14 }} container>
            <Grid textAlign="center" item xs={3}>
              합계
            </Grid>
            <Grid textAlign="center" item xs={3}>
              {getNumberToString(footerTotal?.accCount ?? 0, 'comma')}
            </Grid>
            <Grid textAlign="center" item xs={3}>
              {getNumberToString(footerTotal?.accPayCost ?? 0, 'currency')}
            </Grid>
            <Grid textAlign="center" item xs={3}>
              {getNumberToString(footerTotal?.accProfit ?? 0, 'currency')}
            </Grid>
          </Grid>
        }
        secondary={
          isShowPrevData ? (
            <Grid sx={{ fontSize: 14 }} container>
              <Grid textAlign="center" item xs={3}>
                이전기간과 비교
              </Grid>
              <Grid textAlign="center" item xs={3}>
                {getNumberToString(footerTotal?.prevAccCount ?? 0, 'comma')}
              </Grid>
              <Grid textAlign="center" item xs={3}>
                {getNumberToString(footerTotal?.prevAccPayCost ?? 0, 'currency')}
              </Grid>
              <Grid textAlign="center" item xs={3}>
                {getNumberToString(footerTotal?.prevAccProfit ?? 0, 'currency')}
              </Grid>
            </Grid>
          ) : (
            <></>
          )
        }
      />
    </List>
  );
};

export default GroupList;
