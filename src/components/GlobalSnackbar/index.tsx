import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Snackbar, Alert } from '@mui/material';
import snackAtom from '../../recoil/snackStore';

const GlobalSnackbar = () => {
  const snackStore = useRecoilValue(snackAtom);
  const resetSnackState = useResetRecoilState(snackAtom);

  return (
    <>
      {snackStore ? (
        <Snackbar
          open={snackStore.show}
          autoHideDuration={snackStore.autoHideDuration || 6000}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            (snackStore.handleClose && snackStore.handleClose()) ||
              resetSnackState();
          }}
          message={snackStore.isSimpleSnack ? snackStore.message || '' : ''}
          sx={snackStore.isSimpleSnack ? snackStore.sx : undefined}
          anchorOrigin={
            snackStore.anchorOrigin || {
              horizontal: 'left',
              vertical: 'bottom',
            }
          }>
          {!snackStore.isSimpleSnack || snackStore.severity ? (
            <Alert
              onClose={snackStore.handleClose || resetSnackState}
              severity={snackStore.severity || 'info'}
              sx={snackStore.sx || undefined}>
              {snackStore.message || ''}
            </Alert>
          ) : undefined}
        </Snackbar>
      ) : null}
    </>
  );
};

export default GlobalSnackbar;
