import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHomeScreen from "../screens/owner/OwnerHomeScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
import PostLostItemScreen from "../screens/owner/PostLostItemScreen";
import ViewFoundItemsScreen from "../screens/owner/ViewFoundItemsScreen";
import MyLostPostsScreen from "../screens/owner/MyLostPostsScreen";
import SupportChatScreen from "../screens/common/SupportChatScreen";
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
      <Stack.Screen
        name="ViewFoundItems"
        component={ViewFoundItemsScreen}
        options={{ title: "Found Matches" }}
      />
      <Stack.Screen
        name="MyLostPosts"
        component={MyLostPostsScreen}
        options={{ title: "My Lost Posts" }}
      />
      <Stack.Screen
        name="SupportChat"
        component={SupportChatScreen}
        options={{ title: "Support Chat" }}
      />
    </Stack.Navigator>
  );
}
