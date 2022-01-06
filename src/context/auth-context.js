import React, { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  loading: false,
  uid: null,
});

export const AuthContextProvider = ({ children }) => {
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(false);
        setUid(user.uid);
      } else {
        setLoading(false);
        setUid(null);
      }
    });
  }, [uid]);

  return (
    <>
      <AuthContext.Provider value={{ uid, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
