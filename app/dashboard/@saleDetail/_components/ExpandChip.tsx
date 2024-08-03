import { getNumberToString, getProfit, getProfitRate } from '@/utils/sale';
import { Add, Remove } from '@mui/icons-material';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { Maybe } from 'graphql/jsutils/Maybe';
import { FC, useState } from 'react';

const initLen = 3;
interface Item {
  name?: Maybe<String>;
  accCount?: Maybe<Number> | null;
  accDeliveryCost?: Maybe<Number> | null;
  accTotalPayment?: Maybe<Number> | null;
  accWonCost?: Maybe<Number> | null;
  accPayCost?: Maybe<Number> | null;
}

interface Props {
  list: Item[];
}

const rowLen = 2;

const ExpandChip: FC<Props> = ({ list }) => {
  const [displayCount, setDisplayCount] = useState(initLen);

  const container = Array.from({ length: Math.ceil(list.length / 2) }, (item) => [] as Item[]);
  list.forEach((item, i) => {
    const index = Math.floor(i / rowLen);
    container[index].push(item);
  });

  let count = 1;
  return (
    <Stack
      onClick={() => {
        const realLen = list.length;
        setDisplayCount(displayCount == initLen ? realLen : initLen);
      }}
      gap={0.3}
    >
      {container.slice(0, displayCount).map((item, i) => {
        return (
          <Stack
            sx={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', gap: 0.3 }}
            key={item.map((k) => k.name).join(', ')}
          >
            {item.map((jtem) => {
              const totalPaymentNumber = (jtem.accTotalPayment ?? 0) as number;
              const totalPayment = getNumberToString(totalPaymentNumber, 'comma');
              const profit = getProfit({
                accPayCost: (jtem.accPayCost ?? 0) as number,
                accWonCost: (jtem.accWonCost ?? 0) as number,
                accDeliveryCost: (jtem.accDeliveryCost ?? 0) as number,
              });
              const profitRate = getProfitRate(profit, totalPaymentNumber);

              return (
                <Chip
                  size="small"
                  sx={{
                    height: 'auto',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                    },
                    width: `${100 / rowLen}%`,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: 0.1,
                  }}
                  key={Object.values(jtem).join(', ')}
                  label=<Stack
                    direction="column"
                    sx={{ width: '100%', textAlign: 'left', height: 'max-content', py: 0.4 }}
                  >
                    <Typography variant="caption">
                      {`${count++}. ${jtem.name}(${getNumberToString(
                        (jtem?.accCount ?? 0) as number,
                        'comma'
                      )}개)`}
                    </Typography>
                    <Typography
                      sx={{ pl: 1.7 }}
                      variant="caption"
                    >{`매출 ${totalPayment}원, 수익율 ${getNumberToString(
                      Math.floor(profitRate),
                      'percent'
                    )}`}</Typography>
                  </Stack>
                />
              );
            })}
          </Stack>
        );
      })}
      {initLen < container.length && (
        <IconButton sx={{ width: 'fit-content', p: 0, m: 0 }} size="small">
          {displayCount == initLen ? (
            <Add sx={{ width: 16, height: 16 }} />
          ) : (
            <Remove sx={{ width: 16, height: 16 }} />
          )}
        </IconButton>
      )}
    </Stack>
  );
};

export default ExpandChip;
