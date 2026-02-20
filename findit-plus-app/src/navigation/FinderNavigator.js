import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinderHomeScreen from "../screens/finder/FinderHomeScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
import { useTheme } from "../context/ThemeContext";
const Stack = createNativeStackNavigator();

export default function FinderNavigator() {
  const { colors } = useTheme();
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
      <Stack.Screen
        name="FinderHome"
        component={FinderHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
