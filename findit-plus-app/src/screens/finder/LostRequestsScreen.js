import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
const CATEGORY_OPTIONS = [
  "All",
  "Electronics",
  "Wallet",
  "Documents",
  "Clothing",
  "Jewelry",
  "Bags",
  "Keys",
  "Other",
];

const DATE_OPTIONS = ["All", "Today", "This Week", "This Month"];

export default function LostRequestsScreen() {
  const { colors } = useTheme();

  const [lostItems, setLostItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [categoryModal, setCategoryModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  useEffect(() => {
    fetchLostItems();
  }, [category, dateFilter]);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/lost/lost`, {
        params: {
          category,
          date: dateFilter,
        },
      });

      setLostItems(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* FILTER ROW
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            category !== "All" && styles.filterActive,
          ]}
          onPress={() => setCategoryModal(true)}
        >
          <Text
            style={[
              styles.filterText,
              category !== "All" && styles.filterTextActive,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            dateFilter !== "All" && styles.filterActive,
          ]}
          onPress={() => setDateModal(true)}
        >
          <Text
            style={[
              styles.filterText,
              dateFilter !== "All" && styles.filterTextActive,
            ]}
          >
            {dateFilter}
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* FILTER ROW */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            category !== "All" && styles.filterActive,
          ]}
          onPress={() => setCategoryModal(true)}
        >
          <Text
            style={[
              styles.filterText,
              category !== "All" && styles.filterTextActive,
            ]}
          >
            {category}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={category !== "All" ? "#fff" : "#6B7280"}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            dateFilter !== "All" && styles.filterActive,
          ]}
          onPress={() => setDateModal(true)}
        >
          <Text
            style={[
              styles.filterText,
              dateFilter !== "All" && styles.filterTextActive,
            ]}
          >
            {dateFilter}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={dateFilter !== "All" ? "#fff" : "#6B7280"}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
      {/* LOST ITEMS LIST */}
      <FlatList
        data={lostItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        )}
      />
      {/* CATEGORY MODAL */}
      <Modal visible={categoryModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {CATEGORY_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setCategory(item);
                  setCategoryModal(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      {/* DATE MODAL */}
      <Modal visible={dateModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {DATE_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setDateFilter(item);
                  setDateModal(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    elevation: 2,
  },

  filterActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
    elevation: 4,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  filterTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  title: { fontSize: 16, fontWeight: "700" },

  location: { marginTop: 5, color: "#6B7280" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 30,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 20,
    elevation: 6,
  },

  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
