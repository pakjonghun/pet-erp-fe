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

interface Props {
  findLogsQuery: FindLogsDto;
}

const LogTable: FC<Props> = ({ findLogsQuery }) => {
  const { data, loading, networkStatus, called, fetchMore } = useFindLogs({ findLogsQuery });
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

  return (
    <Paper sx={{ px: 3 }}>
      <TableContainer sx={{ maxHeight: 200, width: '100%' }}>
        <Table sx={{ tableLayout: 'auto' }} stickyHeader>
          <TableHead>
            <TableRow hover>
              <TableCell sx={{ px: 3, width: 100 }}>날짜</TableCell>
              <TableCell sx={{ px: 3, width: 100 }}>작성자</TableCell>
              <TableCell sx={{ px: 3, width: '60%' }}>내용</TableCell>
              <TableCell sx={{ px: 3, width: 100 }}>로그타입</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableCell sx={{ px: 3, whiteSpace: 'nowrap' }}>{row.createdAt}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.userId}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.description}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.logType}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Collapse in={isLoading}>{<CircularProgress />}</Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LogTable;
