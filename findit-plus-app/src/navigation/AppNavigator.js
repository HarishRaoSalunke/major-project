// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginScreen from "../screens/auth/LoginScreen";
// import RegisterScreen from "../screens/auth/RegisterScreen";
// import LoginOtpScreen from "../screens/auth/LoginOtpScreen";
// import ModeSelectionScreen from "../screens/ModeSelectionScreen";

// import FinderNavigator from "./FinderNavigator";
// import OwnerNavigator from "./OwnerNavigator";
// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
//       <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
//       {/* Separate Interfaces */}
//       <Stack.Screen name="FinderStack" component={FinderNavigator} />
//       <Stack.Screen name="OwnerStack" component={OwnerNavigator} />
//     </Stack.Navigator>
//   );
// }
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginOtpScreen from "../screens/auth/LoginOtpScreen";
import ModeSelectionScreen from "../screens/ModeSelectionScreen";

import FinderNavigator from "./FinderNavigator";
import OwnerNavigator from "./OwnerNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return null; // or splash screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
          <Stack.Screen name="FinderStack" component={FinderNavigator} />
          <Stack.Screen name="OwnerStack" component={OwnerNavigator} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
