import { atom } from 'recoil';
import { UserStoreType } from './types';

const defaulValues: UserStoreType = {
  loading: false,
  error: null,
  user: null,
};

export const userAtom = atom<UserStoreType>({
  key: 'CurrentUser',
  default: defaulValues,
  dangerouslyAllowMutability: true,
});
