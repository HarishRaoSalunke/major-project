import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD SAVED LOGIN ---------- */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("auth_user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (err) {
        console.log("Auth load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* ---------- LOGIN ---------- */
  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("auth_user", JSON.stringify(userData));
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("auth_user");
  };
  /* ---------- UPDATE USER ---------- */
  const updateUser = async (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    await AsyncStorage.setItem("auth_user", JSON.stringify(newUser));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        updateUser, // 👈 ADD THIS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
