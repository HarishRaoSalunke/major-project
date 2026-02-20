import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
const PRIMARY = "#7C3AED"; // Different theme color for Owner
const BG = "#F5F3FF";

export default function OwnerHomeScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Lost Item Owner
        </Text>
        <Ionicons name="briefcase" size={34} color={PRIMARY} />
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#EDE9FE" }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("PostLostItem")}
        >
          <Ionicons name="add-circle" size={32} color="#6D28D9" />
          <Text style={styles.cardTitle}>Post Lost Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#DBEAFE" }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("ViewFoundItems")}
        >
          <Ionicons name="search" size={32} color="#2563EB" />
          <Text style={styles.cardTitle}>View Found Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FCE7F3" }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("MyLostPosts")}
        >
          <Ionicons name="document-text" size={32} color="#BE185D" />
          <Text style={styles.cardTitle}>My Lost Posts</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={PRIMARY} />
          <Text style={[styles.navText, { color: PRIMARY }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={24} color="#555" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  card: {
    padding: 22,
    borderRadius: 22,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    elevation: 6,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
    fontWeight: "600",
  },
});
