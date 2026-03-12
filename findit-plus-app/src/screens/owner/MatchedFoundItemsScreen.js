import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { MATCHES_URL } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";
import { getTransaction } from "../../services/transactionApi";
export default function MatchedFoundItemsScreen({ route }) {
  const itemId = route?.params?.itemId;
  const { colors } = useTheme();

  const [matches, setMatches] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!itemId) {
      setLoading(false);
      return;
    }

    fetchMatches();

    // const interval = setInterval(() => {
    //   fetchMatches();
    // }, 5000); // refresh every 5 seconds
    // fetchMatches();
    // return () => clearInterval(interval);
  }, [itemId]);

  const fetchMatches = async () => {
    try {
      const transactionData = await getTransaction(itemId);
      setTransaction(transactionData);

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
      keyExtractor={(item, index) => item.itemId?._id || index.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No AI matches found yet.
        </Text>
      }
      renderItem={({ item }) => {
        const matchItem = item.itemId;
        const scorePercent = Math.round(item.score || 0);

        return (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {matchItem?.image && (
              <Image
                source={{
                  uri: `http://192.168.29.9:5000/uploads/${matchItem.image}`,
                }}
                style={styles.image}
              />
            )}

            <Text style={[styles.title, { color: colors.text }]}>
              {matchItem?.title}
            </Text>

            <Text
              style={[styles.score, { color: getScoreColor(scorePercent) }]}
            >
              Match Score: {scorePercent}%
            </Text>

            <View style={styles.breakdown}>
              <Text>Text: {(item.breakdown?.textScore || 0).toFixed(0)}%</Text>
              <Text>
                Image: {(item.breakdown?.imageScore || 0).toFixed(0)}%
              </Text>
              <Text>
                Location: {(item.breakdown?.locationScore || 0).toFixed(0)}%
              </Text>
              <Text>Time: {(item.breakdown?.timeScore || 0).toFixed(0)}%</Text>
            </View>
            {transaction && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "600", color: colors.text }}>
                  Matched User: {transaction.matchedUserId?.name || "Unknown"}
                </Text>

                <Text style={{ color: colors.text }}>
                  Contact:{" "}
                  {transaction.matchedUserId?.mobile || "Not available"}
                </Text>

                <Text style={{ color: colors.text }}>
                  Return Status: {transaction.returnStatus}
                </Text>
              </View>
            )}
          </View>
        );
      }}
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
