import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from '@mui/material';
import { FC } from 'react';
import { FindLogsDto, Log } from '@/api/graphql/codegen/graphql';
import { useFindLogs } from '@/api/graphql/hooks/log/useFindLogs';
import dayjs from 'dayjs';

interface Props {
  findLogsQuery: FindLogsDto;
}

const LogTable: FC<Props> = ({ findLogsQuery }) => {
  const { data, fetchMore } = useFindLogs({ findLogsQuery });
  console.log('data : ', data);
  const createRow = (log: Omit<Log, '__typename'>) => {
    const copyData = Object.assign({}, log);
    copyData.createdAt = dayjs(log.createdAt).format('YYYY. MM. DD.');
    return copyData;
  };

  const rows = data.logs.data?.map((row) => createRow(row as Log));

  return (
    <Paper sx={{ px: 3 }}>
      <button
        onClick={() =>
          fetchMore({
            variables: {
              findLogsQuery: {
                ...findLogsQuery,
                skip: rows.length,
              },
            },
          })
        }
      >
        add
      </button>
      <TableContainer sx={{ maxHeight: 800, width: '100%' }}>
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
            {rows.map((row) => (
              <TableRow
                sx={{
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.light, 0.5),
                  },
                }}
                key={row._id}
              >
                <TableCell sx={{ px: 3, whiteSpace: 'nowrap' }}>{row.createdAt}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.userId}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.description}</TableCell>
                <TableCell sx={{ px: 3 }}>{row.logType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LogTable;
