import { UserType } from '../../types';

export type UserStoreType = {
  loading: boolean;
  error: string | null;
  user: UserType | null;
};
