import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  setPersistence(auth, browserLocalPersistence);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function loginWithGoogle() {
    return signInWithRedirect(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return credential;
    });
  }

  function updateUserProfile(profile) {
    return updateProfile(currentUser, {
      ...profile,
    });
  }

  function updateUserPassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  function reAuthenticate(credential) {
    return reauthenticateWithCredential(currentUser,credential);
  }

  function logout() {
    return signOut(auth);
  }

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    forgotPassword,
    updateUserProfile,
    updateUserPassword,
    reAuthenticate,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
