import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // We might be in the middle of account setup, wait and retry fetching the doc
        const fetchDoc = async (retries = 3) => {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setUserData(userDoc.data());
              setUser(currentUser);
              setLoading(false);
              return;
            } else if (retries > 0) {
                setTimeout(() => fetchDoc(retries - 1), 1000); // Retry after 1s
                return;
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
          setUser(currentUser); // Set anyway if we fail
          setLoading(false);
        };

        setLoading(true);
        await fetchDoc();
      } else {
        setUserData(null);
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [refreshTrigger]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, setUserData, triggerRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};
