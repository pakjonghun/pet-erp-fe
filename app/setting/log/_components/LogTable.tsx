import { FC, useEffect } from 'react';
import {
  CircularProgress,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from '@mui/material';
import { FindLogsDto, Log } from '@/api/graphql/codegen/graphql';
import { useFindLogs } from '@/api/graphql/hooks/log/useFindLogs';
import dayjs from 'dayjs';
import { client } from '@/api/graphql/client';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import LoadingRow from '@/components/table/LoadingRow';
import EmptyRow from '@/components/table/EmptyRow';
import Cell from '@/components/table/Cell';

interface Props {
  findLogsQuery: FindLogsDto;
}

const LogTable: FC<Props> = ({ findLogsQuery }) => {
  const { data, networkStatus, fetchMore } = useFindLogs({ findLogsQuery });
  const createRow = (log: Omit<Log, '__typename'>) => {
    const copyData = Object.assign({}, log);
    copyData.createdAt = dayjs(log.createdAt).format('YYYY. MM. DD.');
    return copyData;
  };

  const rows = data?.logs?.data?.map((row) => createRow(row as Log)) ?? [];
  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      const totalCount = data?.logs.totalCount;
      if (totalCount && totalCount > rows.length) {
        fetchMore({
          variables: {
            findLogsQuery: {
              ...findLogsQuery,
              skip: rows.length,
            },
          },
        });
      }
    }
  };

  const scrollRef = useInfinityScroll({ callback });
  useEffect(() => {
    client.cache.evict({ fieldName: 'logs' });
    client.cache.gc();
  }, [findLogsQuery]);

  const isLoading = networkStatus === 1 || networkStatus === 3;
  const isEmpty = rows.length === 0;

  return (
    <Paper sx={{ px: 3 }}>
      <TableContainer sx={{ maxHeight: 1000, width: '100%' }}>
        <Table sx={{ tableLayout: 'auto' }} stickyHeader>
          <TableHead>
            <TableRow hover>
              <Cell>날짜</Cell>
              <Cell>작성자</Cell>
              <Cell width="60%">내용</Cell>
              <Cell>로그타입</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyRow colSpan={4} isEmpty={isEmpty} />
            {rows.map((row, index) => (
              <TableRow
                sx={{
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.light, 0.5),
                  },
                }}
                key={row._id}
                ref={index === rows.length - 1 ? scrollRef : null}
              >
                <Cell sx={{ whiteSpace: 'nowrap' }}>{row.createdAt}</Cell>
                <Cell>{row.userId}</Cell>
                <Cell>{row.description}</Cell>
                <Cell>{row.logType}</Cell>
              </TableRow>
            ))}
            <LoadingRow isLoading={isLoading} colSpan={4} />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LogTable;
