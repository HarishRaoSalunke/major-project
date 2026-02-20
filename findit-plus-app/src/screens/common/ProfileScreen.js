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
const PRIMARY = "#2563EB";
const BG = "#F8FAFF";

export default function ProfileScreen({ navigation }) {
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
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
          <Text style={styles.name}>{user?.fullName || "User Name"}</Text>
          <Text style={styles.userId}>@{user?.userId}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <ProfileItem label="Mobile" value={user?.mobile} />
          {/* <ProfileItem label="Email" value={user?.email} /> */}
          <ProfileItem label="Address" value={user?.address} />
          <ProfileItem label="Pincode" value={user?.pincode} />
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#6B7280" }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#DC2626" }]}
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
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginVertical: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  userId: {
    color: "#6B7280",
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#fff",
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
    color: "#6B7280",
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
    backgroundColor: PRIMARY,
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
    backgroundColor: PRIMARY,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
