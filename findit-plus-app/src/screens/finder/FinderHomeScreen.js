// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function FinderHomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Lost Item Finder</Text>

//       <TouchableOpacity style={styles.card}>
//         <Text style={styles.cardTitle}>➕ Post Found Item</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card}>
//         <Text style={styles.cardTitle}>📋 View Lost Item Requests</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card}>
//         <Text style={styles.cardTitle}>📝 My Found Posts</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#F8FAFF",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "800",
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 18,
//     marginBottom: 15,
//     elevation: 4,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#2563EB";
const BG = "#F1F5FF";

export default function FinderHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Lost Item Finder</Text>
        <Ionicons name="search-circle" size={34} color={PRIMARY} />
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0F2FE" }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("PostFoundItem")}
        >
          <Ionicons name="add-circle" size={32} color="#0284C7" />
          <Text style={styles.cardTitle}>Post Found Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FEF3C7" }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("LostRequests")}
        >
          <Ionicons name="clipboard" size={32} color="#D97706" />
          <Text style={styles.cardTitle}>View Lost Item Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#DCFCE7" }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MyFoundPosts")}
        >
          <Ionicons name="document-text" size={32} color="#16A34A" />
          <Text style={styles.cardTitle}>My Found Posts</Text>
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
