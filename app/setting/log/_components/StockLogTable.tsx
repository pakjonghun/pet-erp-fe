import { FC, useEffect } from 'react';
import { TableHead, TableRow } from '@mui/material';
import { FindStockLogs, Log } from '@/http/graphql/codegen/graphql';
import dayjs from 'dayjs';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import LoadingRow from '@/components/table/LoadingRow';
import EmptyRow from '@/components/table/EmptyRow';
import Cell from '@/components/table/Cell';
import HeadCell from '@/components/table/HeadCell';
import ScrollTableContainer from '@/components/table/ScrollTableContainer';
import { CommonHeaderRow, CommonTable, CommonTableBody } from '@/components/commonStyles';
import { useFindStockLogs } from '@/http/graphql/hooks/log/useFindStockLogs';

interface Props {
  findStockLogs: FindStockLogs;
}

const StockLogTable: FC<Props> = ({ findStockLogs }) => {
  const { data, networkStatus, fetchMore, refetch } = useFindStockLogs(findStockLogs);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createRow = (log: Omit<Log, '__typename'>) => {
    const copyData = Object.assign({}, log);
    copyData.createdAt = dayjs(log.createdAt).format('YYYY. MM. DD. HH:mm');
    return copyData;
  };

  const rows = data?.stockLogs?.data?.map((row) => createRow(row as Log)) ?? [];
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      const totalCount = data?.stockLogs.totalCount;
      if (totalCount && totalCount > rows.length) {
        fetchMore({
          variables: {
            findStockLogs: {
              ...findStockLogs,
              skip: rows.length,
            },
          },
        });
      }
    }
  };

  const scrollRef = useInfinityScroll({ callback });

  const isLoading = networkStatus === 1 || networkStatus === 3 || networkStatus === 2;
  const isEmpty = !isLoading && rows.length === 0;

  return (
    <ScrollTableContainer sx={{ mt: 3 }}>
      <CommonTable sx={{ tableLayout: 'auto' }} stickyHeader>
        <TableHead>
          <CommonHeaderRow>
            <HeadCell text="날짜" />
            <HeadCell text="작성자" />
            <HeadCell tableCellProp={{ width: '60%' }} text="내용" />
            <HeadCell text="로그타입" />
          </CommonHeaderRow>
        </TableHead>
        <CommonTableBody>
          <EmptyRow colSpan={4} isEmpty={isEmpty} />
          {rows.map((row, index) => {
            let result = row.description;
            if (row.description.includes('{')) {
              result = parseToJSON(row.description);
            }

            return (
              <TableRow hover key={row._id} ref={index === rows.length - 1 ? scrollRef : null}>
                <Cell sx={{ whiteSpace: 'nowrap' }}>{row.createdAt}</Cell>
                <Cell>{row.userId}</Cell>
                <Cell sx={{ whiteSpace: 'nowrap' }}>{result}</Cell>
                <Cell>{row.logType}</Cell>
              </TableRow>
            );
          })}
          <LoadingRow isLoading={isLoading} colSpan={4} />
        </CommonTableBody>
      </CommonTable>
    </ScrollTableContainer>
  );
};

export default StockLogTable;

function parseToJSON(data: string) {
  const blackListTypeList = ['array', 'object'];

  try {
    const jsonData = JSON.parse(data);
    let description = '';
    const entries = Object.entries(jsonData);
    entries.forEach(([k, v], index) => {
      const suffix =
        index === entries.length - 1 //
          ? ''
          : ', ';

      const valueType = typeof v;
      const isBannedType = blackListTypeList.includes(valueType);
      if (isBannedType) return;

      let value = v;
      if (k.includes('at')) {
        value = dayjs(new Date(v as string)).format('YYYY-MM-DD');
      }
      description += `${k} : ${value}` + suffix;
    });
    return description;
  } catch (err) {
    const _err = err as { message: string };
    console.log(_err.message);
    return '';
  }
}
