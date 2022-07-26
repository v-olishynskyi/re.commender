import { atom } from 'recoil';
import { SnackStoreType } from './types';

export const snackAtom = atom<SnackStoreType>({
  key: 'SnackState',
  default: null,
});
