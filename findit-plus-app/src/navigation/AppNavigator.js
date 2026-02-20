import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginOtpScreen from "../screens/auth/LoginOtpScreen";
import ModeSelectionScreen from "../screens/ModeSelectionScreen";

import FinderNavigator from "./FinderNavigator";
import OwnerNavigator from "./OwnerNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const { colors } = useTheme();
  if (loading) return null; // or splash screen

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
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
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
