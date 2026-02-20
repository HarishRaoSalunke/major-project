import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../context/ThemeContext";

const PRIMARY = "#2563EB";
const BG = "#F8FAFF";
const HEADER_BG = "#F3F4F6";
const HEADER_NAME = "#111827";
const HEADER_USERNAME = "#6B7280";
export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, logout, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await updateUser({ profileImage: imageUri });
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: HEADER_BG }]}>
          <View style={styles.avatarContainer}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.avatar}
              />
            ) : (
              <Ionicons name="person-circle" size={110} color={PRIMARY} />
            )}

            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Ionicons name="add" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { color: HEADER_NAME }]}>
            {user?.fullName || "User Name"}
          </Text>
          <Text style={[styles.userId, { color: HEADER_USERNAME }]}>
            @{user?.userId}
          </Text>
        </View>

        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <ProfileItem label="Mobile" value={user?.mobile} />
          {/* <ProfileItem label="Email" value={user?.email} /> */}
          <ProfileItem label="Address" value={user?.address} />
          <ProfileItem label="Pincode" value={user?.pincode} />
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={() =>
            Alert.alert("Logout", "Are you sure?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", onPress: handleLogout },
            ])
          }
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileItem({ label, value }) {
  const { colors } = useTheme();

  return (
    <View style={styles.item}>
      <Text style={[styles.label, { color: colors.subText }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 25,
    borderRadius: 20,
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  userId: {
    marginTop: 4,
  },

  infoCard: {
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    marginBottom: 25,
  },

  item: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
