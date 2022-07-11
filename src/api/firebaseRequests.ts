import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseDB } from '../firebase/firebase';
import { UserType } from '../types';

export const getUserDoc = async (uid: string) => {
  const q = query(collection(firebaseDB, 'users'), where('uid', '==', uid));
  const docs = await getDocs(q);

  return docs.docs[0];
};

export const getUserDocData = async (uid: string) => {
  const q = query(collection(firebaseDB, 'users'), where('uid', '==', uid));
  const docs = await getDocs(q);

  return docs.docs[0].data() as UserType;
};
