import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinderHomeScreen from "../screens/finder/FinderHomeScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
import { useTheme } from "../context/ThemeContext";
const Stack = createNativeStackNavigator();
import PostFoundItemScreen from "../screens/finder/PostFoundItemScreen";
import LostRequestsScreen from "../screens/finder/LostRequestsScreen";
import MyFoundPostsScreen from "../screens/finder/MyFoundPostsScreen";
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

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostFoundItem"
        component={PostFoundItemScreen}
        options={{ title: "Post Found Item" }}
      />

      <Stack.Screen
        name="LostRequests"
        component={LostRequestsScreen}
        options={{ title: "Lost Item Requests" }}
      />

      <Stack.Screen
        name="MyFoundPosts"
        component={MyFoundPostsScreen}
        options={{ title: "My Found Posts" }}
      />
    </Stack.Navigator>
  );
}
