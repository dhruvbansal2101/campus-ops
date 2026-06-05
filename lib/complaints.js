import { db } from "./firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export const createComplaint = async ({
  title,
  category,
  description,
  userId,
  userName,
}) => {
  return await addDoc(collection(db, "complaints"), {
    title,
    category,
    description,
    userId,
    userName,
    status: "reported",
    createdAt: serverTimestamp(),
  });
};

export const getUserComplaints = async (userId) => {
  const q = query(
    collection(db, "complaints"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getLatestComplaint = async (userId) => {
  const complaints = await getUserComplaints(userId);

  return complaints.length > 0 ? complaints[0] : null;
};

export const getComplaintStats = async (userId) => {
  const complaints = await getUserComplaints(userId);

  return {
    total: complaints.length,
    resolved: complaints.filter(
      (c) => c.status === "sorted"
    ).length,
    pending: complaints.filter(
      (c) => c.status !== "sorted"
    ).length,
  };
};