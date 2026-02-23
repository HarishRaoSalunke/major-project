import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

export default function MyFoundPostsScreen() {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/lost/my-found/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === "active") return "#2563EB";
    if (status === "matched") return "#F59E0B";
    if (status === "returned") return "#16A34A";
    if (status === "closed") return "#6B7280";
    return "#2563EB";
  };

  const getStatusText = (status) => {
    if (status === "active") return "Searching";
    if (status === "matched") return "Matched";
    if (status === "returned") return "Returned";
    if (status === "closed") return "Closed";
    return "Searching";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            No Found Posts Yet
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            {/* IMAGE */}
            {item.image && (
              <Image
                source={{
                  uri: `${BASE_URL.replace("/api", "")}/uploads/${item.image}`,
                }}
                style={styles.image}
              />
            )}

            {/* CONTENT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>

              {/* STATUS BADGE */}
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(item.status)}
                </Text>
              </View>

              <Text style={styles.date}>
                {new Date(item.createdAt).toDateString()}
              </Text>
            </View>
          </TouchableOpacity>
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
