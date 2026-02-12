import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinderHomeScreen from "../screens/finder/FinderHomeScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
const Stack = createNativeStackNavigator();

export default function FinderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FinderHome"
        component={FinderHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
