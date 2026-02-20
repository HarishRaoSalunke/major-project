import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
const PRIMARY = "#2563EB";
const SECONDARY = "#60A5FA";
const BG_TOP = "#EEF2FF";
const BG_BOTTOM = "#FFFFFF";
const API_BASE = "http://192.168.29.9:5000/api/auth";

export default function LoginScreen({ navigation }) {
  const [mode, setMode] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  // const handleLogin = () => {
  //   if (mode === "mobile" && mobile.length !== 10) {
  //     Alert.alert("Invalid", "Enter a valid 10-digit mobile number");
  //     return;
  //   }

  //   if (mode === "user" && (!userId || !password)) {
  //     Alert.alert("Missing", "Enter User ID and Password");
  //     return;
  //   }

  //   // backend call will be added here (already planned)
  // };
  const handleLogin = async () => {
    try {
      if (mode === "mobile") {
        if (mobile.length !== 10) {
          Alert.alert("Invalid", "Enter a valid 10-digit mobile number");
          return;
        }

        const res = await fetch(`${API_BASE}/login/mobile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }),
        });

        const data = await res.json();

        if (data.code === "USER_NOT_FOUND") {
          Alert.alert("Not Registered", "Please register first", [
            {
              text: "Register Now",
              onPress: () => navigation.navigate("Register"),
            },
            { text: "Cancel", style: "cancel" },
          ]);
          return;
        }

        // OTP sent successfully
        navigation.navigate("LoginOtp", { mobile });
      }

      if (mode === "user") {
        if (!userId || !password) {
          Alert.alert("Missing", "Enter User ID and Password");
          return;
        }

        const res = await fetch(`${API_BASE}/login/password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, password }),
        });

        const data = await res.json();

        if (data.code === "USER_NOT_FOUND") {
          Alert.alert("Not Registered", "Please register first", [
            {
              text: "Register Now",
              onPress: () => navigation.navigate("Register"),
            },
            { text: "Cancel", style: "cancel" },
          ]);
          return;
        }

        if (data.code === "INVALID_PASSWORD") {
          Alert.alert("Error", "Wrong password");
          return;
        }

        // login success
        // navigation.replace("ModeSelection");
        // await login(data.user);
        // navigation.navigate("ModeSelection");
        await login(data.user);
        // DO NOT navigate manually
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  const isMobileValid = mobile.length === 10;
  const isUserValid = userId && password;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      {/* Top background */}
      <View style={styles.topBg} />

      <View style={styles.container}>
        {/* App Name */}
        <Text style={styles.appName}>FindIt+</Text>
        <Text style={styles.subtitle}>Lost & Found made smart</Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          {/* Toggle */}
          <View style={styles.toggle}>
            <TouchableOpacity onPress={() => setMode("mobile")}>
              <Text
                style={[
                  styles.toggleText,
                  mode === "mobile" && styles.toggleActive,
                ]}
              >
                Mobile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode("user")}>
              <Text
                style={[
                  styles.toggleText,
                  mode === "user" && styles.toggleActive,
                ]}
              >
                User ID
              </Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          {mode === "mobile" ? (
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
            />
          ) : (
            <>
              <TextInput
                placeholder="Enter User ID"
                placeholderTextColor="#999"
                value={userId}
                onChangeText={setUserId}
                style={styles.input}
              />
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </>
          )}

          {/* Button */}
          {/* <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              {mode === "mobile" ? "Send OTP" : "Login"}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.button,
              ((mode === "mobile" && !isMobileValid) ||
                (mode === "user" && !isUserValid)) && { opacity: 0.5 },
            ]}
            disabled={
              (mode === "mobile" && !isMobileValid) ||
              (mode === "user" && !isUserValid)
            }
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              {mode === "mobile" ? "Send OTP" : "Login"}
            </Text>
          </TouchableOpacity>
          {/* Register */}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>
              New user? <Text style={styles.registerLink}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BG_BOTTOM,
  },
  topBg: {
    position: "absolute",
    top: 0,
    height: "40%",
    width: "100%",
    backgroundColor: BG_TOP,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  appName: {
    fontSize: 34,
    fontWeight: "800",
    color: PRIMARY,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600",
  },
  toggleActive: {
    color: PRIMARY,
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY,
    paddingBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    color: "#000",
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
    marginTop: 18,
    color: "#444",
  },
  registerLink: {
    color: PRIMARY,
    fontWeight: "700",
  },
});
