import { AlertColor, SnackbarOrigin, SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export type SnackStoreType = {
  show: boolean;
  message: string;
  isSimpleSnack?: boolean;
  severity?: AlertColor;
  autoHideDuration?: number;
  handleClose?: VoidFunction;
  sx?: SxProps<Theme>;
  anchorOrigin?: SnackbarOrigin;
} | null;
