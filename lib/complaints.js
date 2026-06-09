import { db } from "./firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  updateDoc,
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
    statusUpdatedAt: serverTimestamp(),
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

export const getComplaintById = async (id) => {
  const docRef = doc(db, "complaints", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getAllComplaints = async () => {
  const q = query(
    collection(db, "complaints"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateComplaintStatus = async (
  complaintId,
  status
) => {
  const complaintRef = doc(
    db,
    "complaints",
    complaintId
  );

  await updateDoc(complaintRef, {
    status,
    statusUpdatedAt: serverTimestamp(),
  });
};