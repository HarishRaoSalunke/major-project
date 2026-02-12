import { createContext, useState } from "react";

export const RegisterContext = createContext();

export function RegisterProvider({ children }) {
  const [registerData, setRegisterData] = useState({});

  const updateField = (key, value) => {
    setRegisterData((prev) => ({ ...prev, [key]: value }));
  };

  const resetRegister = () => setRegisterData({});

  return (
    <RegisterContext.Provider
      value={{ registerData, updateField, resetRegister }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
 