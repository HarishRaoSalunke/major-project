import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

export default function ViewFoundItemsScreen() {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);

  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/lost/found-matches/${user._id}`);
      setFoundItems(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={foundItems}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            No Matching Found Items
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && (
              <Image
                source={{
                  uri: `${BASE_URL.replace("/api", "")}/uploads/${item.image}`,
                }}
                style={styles.image}
              />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Available</Text>
              </View>

              <Text style={styles.date}>
                {new Date(item.createdAt).toDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  location: {
    marginTop: 4,
    color: "#6B7280",
  },

  statusBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#2563EB",
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
