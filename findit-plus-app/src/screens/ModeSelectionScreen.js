// // import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// // export default function ModeSelectionScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Choose Your Mode</Text>

// //       <TouchableOpacity style={styles.card}>
// //         <Text style={styles.cardTitle}>🔍 Lost Item Finder</Text>
// //         <Text style={styles.cardSub}>Found an item? Help return it</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.card}>
// //         <Text style={styles.cardTitle}>📦 Lost Item Owner</Text>
// //         <Text style={styles.cardSub}>Lost something? Find it here</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function ModeSelectionScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Choose Your Mode</Text>

//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.replace("FinderStack")}
//       >
//         <Text style={styles.cardTitle}>🔍 Lost Item Finder</Text>
//         <Text style={styles.cardSub}>Found an item? Help return it</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.replace("OwnerStack")}
//       >
//         <Text style={styles.cardTitle}>📦 Lost Item Owner</Text>
//         <Text style={styles.cardSub}>Lost something? Find it here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "#F8FAFF",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "800",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 24,
//     borderRadius: 20,
//     marginBottom: 20,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//   },
//   cardSub: {
//     marginTop: 6,
//     color: "#555",
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

export default function ModeSelectionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Mode</Text>
        <Text style={styles.subtitle}>Select how you want to use FindIt+</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Finder Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0F2FE" }]}
          activeOpacity={0.85}
          onPress={() => navigation.replace("FinderStack")}
        >
          <Ionicons name="search-circle" size={40} color="#0284C7" />
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Lost Item Finder</Text>
            <Text style={styles.cardSub}>
              Found an item? Help return it to the owner.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Owner Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FEF3C7" }]}
          activeOpacity={0.85}
          onPress={() => navigation.replace("OwnerStack")}
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
