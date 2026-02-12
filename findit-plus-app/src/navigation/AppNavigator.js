// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginScreen from "../screens/auth/LoginScreen";
// import RegisterScreen from "../screens/auth/RegisterScreen";
// // import LoginOtpScreen from "../screens/auth/LoginOtpScreen";
// // import HomeScreen from "../screens/HomeScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       {/* <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} /> */}
//     </Stack.Navigator>
//   );
// }
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginOtpScreen from "../screens/auth/LoginOtpScreen";
import ModeSelectionScreen from "../screens/ModeSelectionScreen";

import FinderNavigator from "./FinderNavigator";
import OwnerNavigator from "./OwnerNavigator";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
      <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
      {/* Separate Interfaces */}
      <Stack.Screen name="FinderStack" component={FinderNavigator} />
      <Stack.Screen name="OwnerStack" component={OwnerNavigator} />
    </Stack.Navigator>
  );
}
