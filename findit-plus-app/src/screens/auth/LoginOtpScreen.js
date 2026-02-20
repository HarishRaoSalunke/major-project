// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useState } from "react";

// const PRIMARY = "#2563EB";
// const BG_TOP = "#EEF2FF";
// const BG_BOTTOM = "#FFFFFF";
// const API = "http://192.168.29.9:5000/api/auth";

// export default function LoginOtpScreen({ route, navigation }) {
//   const { mobile } = route.params;
//   const [otp, setOtp] = useState("");

//   const verifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter the 6-digit OTP");
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/register/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile, otp }),
//       });

//       if (!res.ok) {
//         Alert.alert("Error", "Incorrect OTP");
//         return;
//       }
//       navigation.navigate("ModeSelection");
//     } catch (err) {
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={styles.wrapper}
//     >
//       {/* Top curved background */}
//       <View style={styles.topBg} />

//       <View style={styles.container}>
//         <Text style={styles.title}>Verify OTP</Text>
//         <Text style={styles.subtitle}>
//           Enter the 6-digit code sent to{" "}
//           <Text style={styles.mobile}>{mobile}</Text>
//         </Text>

//         <View style={styles.card}>
//           <TextInput
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={6}
//             value={otp}
//             onChangeText={setOtp}
//             placeholder="● ● ● ● ● ●"
//             placeholderTextColor="#9CA3AF"
//           />

//           <TouchableOpacity
//             style={[styles.button, otp.length !== 6 && { opacity: 0.5 }]}
//             disabled={otp.length !== 6}
//             onPress={verifyOtp}
//           >
//             <Text style={styles.buttonText}>Verify OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }
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
const BG_TOP = "#EEF2FF";
const BG_BOTTOM = "#FFFFFF";
const API = "http://192.168.29.9:5000/api/auth";

export default function LoginOtpScreen({ route }) {
  const { mobile } = route.params;
  const [otp, setOtp] = useState("");
  const { login } = useContext(AuthContext);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP");
      return;
    }

    try {
      const res = await fetch(`${API}/register/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await res.json();
      console.log("OTP RESPONSE:", data); // 👈 ADD THIS
      if (!res.ok) {
        Alert.alert("Error", "Incorrect OTP");
        return;
      }

      // ✅ Save user to AuthContext
      await login(data.user);

      // ❌ DO NOT navigate
    } catch (err) {
      console.log("OTP ERROR:", err); // 👈 ADD THIS
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <View style={styles.topBg} />

      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{" "}
          <Text style={styles.mobile}>{mobile}</Text>
        </Text>

        <View style={styles.card}>
          <TextInput
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            placeholder="● ● ● ● ● ●"
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            style={[styles.button, otp.length !== 6 && { opacity: 0.5 }]}
            disabled={otp.length !== 6}
            onPress={verifyOtp}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
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
    height: "38%",
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

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
    fontSize: 15,
  },

  mobile: {
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  otpInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 18,
    fontSize: 24,
    letterSpacing: 12,
    textAlign: "center",
    color: "#111827",
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
  },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
