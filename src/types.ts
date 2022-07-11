export type UserType = {
  uid: string;
  email: string;
  name: string;
  family_name: string;
  authProvider?: string;
  isAnonymous?: boolean;
};
