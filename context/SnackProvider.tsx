'use client';

import { FC, ReactNode } from 'react';
import { snackMessage } from '@/store/snackMessage';
import { useReactiveVar } from '@apollo/client';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  children: ReactNode;
}

const SnackProvider: FC<Props> = ({ children }) => {
  const snack = useReactiveVar(snackMessage);

  const handleClose = () => {
    snackMessage(null);
  };

  return (
    <>
      {!!snack && (
        <div>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={!!snack}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack.severity}
              variant="filled"
              sx={{ width: '100%', minWidth: 400 }}
            >
              {snack.message}
            </Alert>
          </Snackbar>
        </div>
      )}
      {children}
    </>
  );
};

export default SnackProvider;
