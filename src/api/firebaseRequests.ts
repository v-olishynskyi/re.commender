import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firebaseDB } from '../firebase/firebase';
import { MovieCart, UserType } from '../types';

export const getUserDoc = async (uid: string, withData?: boolean) => {
  const q = query(collection(firebaseDB, 'users'), where('uid', '==', uid));
  const docs = await getDocs(q);

  if (withData) {
    return docs.docs[0].data() as UserType;
  } else {
    return docs.docs[0];
  }
};

export const getUserDocData = async (uid: string) => {
  const q = query(collection(firebaseDB, 'users'), where('uid', '==', uid));
  const docs = await getDocs(q);

  return docs.docs[0].data() as UserType;
};

export const updateUserDoc = async (
  uid: string,
  data: Partial<UserType>,
  returnNewUser?: boolean
) => {
  const userDoc = (await getUserDoc(
    uid
  )) as QueryDocumentSnapshot<DocumentData>;
  const docRef = doc(firebaseDB, 'users', userDoc.id);

  await updateDoc(docRef, data);

  if (returnNewUser) {
    const userDocData = await getUserDocData(uid);

    return userDocData;
  }

  return;
};

export const getUserLibraryDoc = async (uid: string, withData?: boolean) => {
  console.log(`users/${uid}`);

  const q = query(
    collection(firebaseDB, 'usersLibraries'),
    where('userUID', '==', `users/${uid}`)
  );
  const docs = await getDocs(q);

  if (withData) {
    return docs.docs[0]?.data() as {
      movies: Array<MovieCart>;
      userUID: string;
    };
  } else {
    return docs.docs[0];
  }
};
