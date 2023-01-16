import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Shop } from "../types/shop";

export const getShops = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "shops"), orderBy("score", "desc"))
  );
  const shops = querySnapshot.docs.map((doc) => doc.data() as Shop);
  return shops;
};
