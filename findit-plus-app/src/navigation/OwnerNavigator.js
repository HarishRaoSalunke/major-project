import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHomeScreen from "../screens/owner/OwnerHomeScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
import PostLostItemScreen from "../screens/owner/PostLostItemScreen";
const Stack = createNativeStackNavigator();

export default function OwnerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OwnerHome"
        component={OwnerHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostLostItem"
        component={PostLostItemScreen}
        options={{ title: "Post Lost Item" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
