import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export const createUserDocument = async (
  user
) => {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      role: "student",
      createdAt: serverTimestamp(),
    });
  }
};

export const getUserDocument = async (
  uid
) => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  return snapshot.data();
};