import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signupWithEmail = async (
  name,
  email,
  password
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(result.user, {
    displayName: name,
  });

  return result.user;
};

export const loginWithEmail = async (
  email,
  password
) => {
  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return result.user;
};

export const resetPassword = async (email) => {
  return sendPasswordResetEmail(
    auth,
    email
  );
};

export const logout = () => signOut(auth);
export const createPasswordForGoogleUser = async (
  email,
  password
) => {
  const credential =
    EmailAuthProvider.credential(
      email,
      password
    );

  return linkWithCredential(
    auth.currentUser,
    credential
  );
};

export const changePassword = async (
  newPassword
) => {
  return updatePassword(
    auth.currentUser,
    newPassword
  );
};