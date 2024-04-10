import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { FC, useMemo } from 'react';
import { FindLogsDto, Log } from '@/api/graphql/codegen/graphql';
import { useFindLogs } from '@/api/graphql/hooks/log/useFindLogs';

interface Props {
  findLogsQuery: FindLogsDto;
}

const LogTable: FC<Props> = ({ findLogsQuery }) => {
  const a = useFindLogs({ findLogsQuery });
  return <>table</>;
};

export default LogTable;
