import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
const PRIMARY = "#2563EB";
const BG = "#F1F5FF";

export default function ModeSelectionScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Choose Your Mode
          </Text>

          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={26} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Select how you want to use FindIt+</Text>
      </View>
      <View style={styles.cardContainer}>
        {/* Finder Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0F2FE" }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("FinderStack")}
        >
          <Ionicons name="search-circle" size={40} color="#0284C7" />
          <View style={styles.textBox}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Lost Item Finder
            </Text>
            <Text style={[styles.cardSub, { color: colors.subText }]}>
              {" "}
              Found an item? Help return it to the owner.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Owner Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FEF3C7" }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("OwnerStack")}
        >
          <Ionicons name="briefcase" size={40} color="#D97706" />
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Lost Item Owner</Text>
            <Text style={styles.cardSub}>
              Lost something? Post and track your item here.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
  },

  cardContainer: {
    gap: 20,
  },

  card: {
    flexDirection: "row",
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    elevation: 8,
  },

  textBox: {
    marginLeft: 16,
    flex: 1,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  cardSub: {
    marginTop: 6,
    fontSize: 14,
    color: "#374151",
  },
});
