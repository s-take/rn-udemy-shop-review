import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  doc,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, auth } from "../../firebaseConfig";
import { Shop } from "../types/shop";
import { initialUser, User } from "../types/user";
import { Review } from "../types/review";

export const getShops = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "shops"), orderBy("score", "desc"))
  );
  const shops = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Shop)
  );
  return shops;
};

export const signin = async () => {
  const userCredential = await signInAnonymously(auth);
  const { uid } = userCredential.user;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", uid), initialUser);
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...docSnap.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, params);
};

export const addReview = async (shopId: string, review: Review) => {
  const reviewRef = collection(db, "shops", shopId, "reviews");
  await addDoc(reviewRef, review);
};

export const createReviewRef = (shopId: string) => {
  return doc(collection(db, "shops", shopId, "reviews"));
};

export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storegaにアップロード
  const storageRef = ref(getStorage(), path);
  // const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try {
    await uploadBytes(storageRef, blob);
    downloadUrl = await getDownloadURL(storageRef);
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};

export const getReviews = async (shopId: string) => {
  const reviewDocs = await getDocs(
    query(
      collection(db, "shops", shopId, "reviews"),
      orderBy("createdAt", "desc")
    )
  );
  // const reviewDocs = await firebase
  //   .firestore()
  //   .collection("shops")
  //   .doc(shopId)
  //   .collection("reviews")
  //   .orderBy("createdAt", "desc")
  //   .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};
