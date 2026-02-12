// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/navigation/AppNavigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppNavigator />a
//     </NavigationContainer>
//   );
// }
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import AuthProvider from "./src/context/AuthContext"; // default export
import { RegisterProvider } from "./src/context/RegisterContext"; // named export

export default function App() {
  return (
    <AuthProvider>
      <RegisterProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </RegisterProvider>
    </AuthProvider>
  );
}
