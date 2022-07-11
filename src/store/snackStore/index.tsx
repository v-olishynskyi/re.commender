import { atom } from 'recoil';
import { SnackStateType } from './types';

export const snackState = atom<SnackStateType>({
  key: 'SnackState',
  default: null,
});
