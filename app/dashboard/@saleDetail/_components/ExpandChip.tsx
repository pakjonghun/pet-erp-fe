import { Add, Remove } from '@mui/icons-material';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { Maybe } from 'graphql/jsutils/Maybe';
import { FC, useState } from 'react';

const initLen = 3;
interface Item {
  name?: Maybe<String>;
  accCount?: Maybe<Number> | null;
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
              return (
                <Chip
                  size="small"
                  sx={{
                    width: `${100 / rowLen}%`,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: 2,
                  }}
                  key={Object.values(jtem).join(', ')}
                  label=<Typography
                    sx={{ width: '100%', textAlign: 'left' }}
                    variant="caption"
                  >{`${count++} ${jtem.name}(${jtem.accCount})`}</Typography>
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
