// src/context/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: actionType.SET_USER,
          user: user,
        });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <AuthContext.Provider value={{ loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
