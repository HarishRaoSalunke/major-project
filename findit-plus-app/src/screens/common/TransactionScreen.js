import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import {
  getTransaction,
  startReturn,
  confirmReturn,
} from "../../services/transactionApi";

export default function TransactionScreen({ route }) {
  const { itemId } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getTransaction(itemId);
    setData(res);
  };

  if (!data) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Owner: {data.userId?.name}</Text>

      <Text>Finder: {data.matchedUserId?.name}</Text>

      <Text>Status: {data.returnStatus}</Text>

      <Button title="Start Return" onPress={() => startReturn(itemId)} />

      <Button title="Confirm Returned" onPress={() => confirmReturn(itemId)} />
    </View>
  );
}
