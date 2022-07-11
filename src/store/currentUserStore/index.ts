import { atom, selector, SetterOrUpdater } from 'recoil';
import { CurrentUserStateType } from './types';

const defaulValues: CurrentUserStateType = {
  loading: false,
  error: null,
  user: null,
};

export const currentUserRecoilState = atom<CurrentUserStateType>({
  key: 'CurrentUserState',
  default: defaulValues,
  dangerouslyAllowMutability: true,
});

export const currentUser = selector({
  key: 'CurrentUser',
  get: ({ get }) => {
    return get(currentUserRecoilState).user;
  },
});

export const currentUserStateSetter = (
  recoilSetter: SetterOrUpdater<CurrentUserStateType>,
  newValue: Partial<CurrentUserStateType>
) => recoilSetter(prevValue => ({ ...prevValue, newValue }));
