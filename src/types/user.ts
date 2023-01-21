import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  name: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};

export const initialUser: User = {
  name: "",
  updatedAt: Timestamp.now(),
  createdAt: Timestamp.now(),
};
