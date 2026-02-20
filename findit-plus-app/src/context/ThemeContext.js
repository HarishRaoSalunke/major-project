import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

const lightColors = {
  background: "#F8FAFF",
  card: "#FFFFFF",
  text: "#111827",
  subText: "#6B7280",
  primary: "#2563EB",
  danger: "#DC2626",
};

const darkColors = {
  background: "#111827",
  card: "#1F2937",
  text: "#FFFFFF",
  subText: "#9CA3AF",
  primary: "#3B82F6",
  danger: "#EF4444",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("app_theme");
      if (savedTheme) setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("app_theme", newTheme);
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
