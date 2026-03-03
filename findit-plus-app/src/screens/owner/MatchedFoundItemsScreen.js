import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { MATCHES_URL } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

export default function MatchedFoundItemsScreen({ route }) {
  const { itemId } = route.params;
  const { colors } = useTheme();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${MATCHES_URL}/${itemId}`);
      setMatches(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#16A34A";
    if (score >= 60) return "#F59E0B";
    return "#DC2626";
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No matches found yet.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {item.itemId?.image && (
            <Image
              source={{
                uri: `http://192.168.29.9:5000/uploads/${item.itemId.image}`,
              }}
              style={styles.image}
            />
          )}

          <Text style={[styles.title, { color: colors.text }]}>
            {item.itemId?.title}
          </Text>

          <Text style={[styles.score, { color: getScoreColor(item.score) }]}>
            Match Score: {item.score}%
          </Text>

          <View style={styles.breakdown}>
            <Text>Text: {item.breakdown.textScore?.toFixed(0)}%</Text>
            <Text>Image: {item.breakdown.imageScore?.toFixed(0)}%</Text>
            <Text>Location: {item.breakdown.locationScore?.toFixed(0)}%</Text>
            <Text>Time: {item.breakdown.timeScore?.toFixed(0)}%</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  score: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  breakdown: {
    marginTop: 6,
    gap: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
