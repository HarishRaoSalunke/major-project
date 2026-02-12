import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import * as Location from "expo-location";
import { RegisterContext } from "../../context/RegisterContext";
import { Ionicons } from "@expo/vector-icons";

const API = "http://192.168.29.9:5000/api/auth";

export default function RegisterScreen({ navigation }) {
  const { registerData, updateField } = useContext(RegisterContext);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userIdAvailable, setUserIdAvailable] = useState(true);

  /* ---------- OTP ---------- */
  // const sendOtp = async () => {
  //   if (!registerData.mobile || registerData.mobile.length !== 10) {
  //     Alert.alert("Error", "Enter valid 10 digit mobile number");
  //     return;
  //   }

  //   await fetch(`${API}/register/send-otp`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ mobile: registerData.mobile }),
  //   });

  //   setOtpSent(true);
  // };
  const sendOtp = async () => {
    try {
      if (!registerData.mobile || registerData.mobile.length !== 10) {
        Alert.alert("Error", "Enter valid 10 digit mobile number");
        return;
      }

      const res = await fetch(`${API}/register/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: registerData.mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to send OTP");
        return;
      }

      Alert.alert("OTP Sent", "OTP has been sent to your mobile number");
      setOtpSent(true);
    } catch (error) {
      Alert.alert("Error", "Network error. Try again.");
    }
  };
  const verifyOtp = async () => {
    const res = await fetch(`${API}/register/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: registerData.mobile, otp }),
    });

    if (!res.ok) {
      Alert.alert("Invalid OTP");
      return;
    }

    setOtpVerified(true);
    Alert.alert("OTP Verified Successfully");
  };

  /* ---------- USER ID ---------- */
  const checkUserId = async (value) => {
    updateField("userId", value);

    const res = await fetch(`${API}/register/check-userid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: value }),
    });

    const data = await res.json();
    setUserIdAvailable(data.available);
  };

  /* ---------- LOCATION ---------- */
  // const detectLocation = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") return;

  //   const loc = await Location.getCurrentPositionAsync({});
  //   const geo = await Location.reverseGeocodeAsync(loc.coords);

  //   updateField("address", `${geo[0].street}, ${geo[0].city}`);
  //   updateField("pincode", geo[0].postalCode);
  // };
  const detectLocation = async () => {
    try {
      // 1️⃣ Ask permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      // 2️⃣ Get MOST ACCURATE current location (GPS)
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      });

      // 3️⃣ Reverse geocode
      const geo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (!geo || geo.length === 0) {
        Alert.alert("Error", "Unable to fetch address");
        return;
      }

      const place = geo[0];

      // 4️⃣ Build clean, accurate address
      const addressParts = [
        place.name, // house / building
        place.street,
        place.subdistrict,
        place.city,
        place.region,
      ];

      const fullAddress = addressParts.filter(Boolean).join(", ");

      // 5️⃣ Autofill fields
      updateField("address", fullAddress);
      updateField("pincode", place.postalCode || "");
    } catch (error) {
      console.log("Location error:", error);
      Alert.alert("Error", "Failed to detect location");
    }
  };
  /* ---------- COMPLETE ---------- */
  // const completeRegister = async () => {
  //   const required = [
  //     "fullName",
  //     "mobile",
  //     "userId",
  //     "password",
  //     "address",
  //     "pincode",
  //   ];

  //   for (let key of required) {
  //     if (!registerData[key]) {
  //       Alert.alert("All fields are required");
  //       return;
  //     }
  //   }

  //   if (!otpVerified || !userIdAvailable) {
  //     Alert.alert("Fix errors before continuing");
  //     return;
  //   }

  //   await fetch(`${API}/register/complete`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(registerData),
  //   });

  //   Alert.alert("Registration successful");
  //   navigation.replace("Login");
  // };
  const completeRegister = async () => {
    try {
      const res = await fetch(`${API}/register/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (!res.ok) {
        const err = await res.json();
        Alert.alert("Error", err.message || "Registration failed");
        return;
      }

      Alert.alert(
        "Registration Successful 🎉",
        "You can now login using your mobile number or User ID",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  const isFormComplete =
    registerData.fullName &&
    registerData.mobile &&
    registerData.mobile.length === 10 &&
    otpVerified &&
    registerData.userId &&
    userIdAvailable &&
    registerData.password &&
    registerData.address &&
    registerData.pincode;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={registerData.fullName}
        onChangeText={(v) => updateField("fullName", v)}
      />

      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="#6B7280"
        keyboardType="number-pad"
        maxLength={10}
        style={styles.input}
        value={registerData.mobile}
        onChangeText={(v) => updateField("mobile", v)}
      />

      {!otpSent && (
        <TouchableOpacity
          style={[styles.button, otpSent && { opacity: 0.5 }]}
          disabled={otpSent}
          onPress={sendOtp}
        >
          <Text style={styles.btnText}>
            {otpSent ? "OTP Sent" : "Send OTP"}
          </Text>
        </TouchableOpacity>
      )}

      {otpSent && !otpVerified && (
        <>
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      <TextInput
        placeholder="User ID"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={registerData.userId}
        onChangeText={(v) => updateField("userId", v)}
        onBlur={() => checkUserId(registerData.userId)}
      />
      {!userIdAvailable && (
        <Text style={styles.error}>User ID already taken</Text>
      )}

      <View style={styles.passwordBox}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry={!showPassword}
          style={{ flex: 1, color: "#111827" }}
          onChangeText={(v) => updateField("password", v)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Address"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={registerData.address}
        onChangeText={(v) => updateField("address", v)}
      />

      <TextInput
        placeholder="Pincode"
        placeholderTextColor="#6B7280"
        keyboardType="number-pad"
        style={styles.input}
        value={registerData.pincode}
        onChangeText={(v) => updateField("pincode", v)}
      />

      <TouchableOpacity onPress={detectLocation}>
        <Text style={styles.link}>Detect Location</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.button,
          (!otpVerified || !userIdAvailable) && { opacity: 0.5 },
        ]}
        disabled={!otpVerified || !userIdAvailable}
        onPress={completeRegister}
      >
        <Text style={styles.btnText}>Complete Registration</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.button, !isFormComplete && { opacity: 0.5 }]}
        disabled={!isFormComplete}
        onPress={completeRegister}
      >
        <Text style={styles.btnText}>Complete Registration</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const PRIMARY = "#2563EB";
const BG = "#F8FAFF";
const BORDER = "#E5E7EB";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6B7280";
const ERROR = "#DC2626";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BG,
    padding: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: TEXT_DARK,
    textAlign: "center",
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: TEXT_DARK,
    marginBottom: 14,
  },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: PRIMARY,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  link: {
    textAlign: "center",
    color: PRIMARY,
    fontWeight: "700",
    marginVertical: 14,
  },

  error: {
    color: ERROR,
    fontSize: 13,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 4,
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 14,
  },

  otpBox: {
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },

  otpTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 8,
  },

  otpInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT_DARK,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 4,
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_MUTED,
    marginBottom: 6,
    marginLeft: 4,
  },
});
