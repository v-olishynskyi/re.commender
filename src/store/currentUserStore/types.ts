import { UserType } from '../../types';

export type CurrentUserStateType = {
  loading: boolean;
  error: string | null;
  user: UserType | null;
};
