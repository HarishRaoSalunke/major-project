import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
const PRIMARY = "#2563EB";
const API = "http://192.168.29.9:5000/api/auth";
const HEADER_BG = "#F3F4F6";
const HEADER_TEXT = "#111827";
export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const [address, setAddress] = useState(user?.address || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [newUserId, setNewUserId] = useState(user?.userId || "");
  const handleSave = async () => {
    try {
      const res = await fetch(`${API}/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          fullName,
          newUserId,
          address,
          pincode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Update failed");
        return;
      }

      await updateUser(data.user);

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: HEADER_BG }]}>
        <Text style={[styles.title, { color: HEADER_TEXT }]}>Edit Profile</Text>
      </View>
      <Text style={[styles.label, { color: colors.subText }]}>Full Name</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter Full Name"
        placeholderTextColor={colors.subText}
      />
      <Text style={[styles.label, { color: colors.subText }]}>User ID</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        value={newUserId}
        onChangeText={setNewUserId}
        placeholder="Enter User ID"
        placeholderTextColor={colors.subText}
      />
      <Text style={[styles.label, { color: colors.subText }]}>
        Mobile (Not Editable)
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: "#E5E7EB",
            color: "#6B7280",
          },
        ]}
        value={user?.mobile}
        editable={false}
      />

      <Text style={[styles.label, { color: colors.subText }]}>Address</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter Address"
      />

      <Text style={[styles.label, { color: colors.subText }]}>Pincode</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        value={pincode}
        onChangeText={setPincode}
        keyboardType="number-pad"
        placeholder="Enter Pincode"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#6B7280",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },
});
