import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Snackbar, Alert } from '@mui/material';

import { snackState } from '../../store';

const GlobalSnackbar = () => {
  const snackStateValue = useRecoilValue(snackState);
  const resetSnackState = useResetRecoilState(snackState);

  return (
    <>
      {snackStateValue ? (
        <Snackbar
          open={snackStateValue.show}
          autoHideDuration={snackStateValue.autoHideDuration || 6000}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            (snackStateValue.handleClose && snackStateValue.handleClose()) ||
              resetSnackState();
          }}
          message={
            snackStateValue.isSimpleSnack ? snackStateValue.message || '' : ''
          }
          sx={snackStateValue.isSimpleSnack ? snackStateValue.sx : undefined}
          anchorOrigin={
            snackStateValue.anchorOrigin || {
              horizontal: 'left',
              vertical: 'bottom',
            }
          }>
          {!snackStateValue.isSimpleSnack || snackStateValue.severity ? (
            <Alert
              onClose={snackStateValue.handleClose || resetSnackState}
              severity={snackStateValue.severity || 'info'}
              sx={snackStateValue.sx || undefined}>
              {snackStateValue.message || ''}
            </Alert>
          ) : undefined}
        </Snackbar>
      ) : null}
    </>
  );
};

export default GlobalSnackbar;
