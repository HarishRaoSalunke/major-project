// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";
// import AppNavigator from "./src/navigation/AppNavigator";
// import { useTheme } from "./src/context/ThemeContext";
// import AuthProvider from "./src/context/AuthContext"; // default export
// import { RegisterProvider } from "./src/context/RegisterContext"; // named export
// import { ThemeProvider } from "./src/context/ThemeContext";
// export default function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <RegisterProvider>
//           <NavigationContainer>
//             <AppNavigator />
//           </NavigationContainer>
//         </RegisterProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthProvider from "./src/context/AuthContext";
import { RegisterProvider } from "./src/context/RegisterContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

function ThemedNavigation() {
  const { theme, colors } = useTheme();
  const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RegisterProvider>
          <ThemedNavigation />
        </RegisterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
