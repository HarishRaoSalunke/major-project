import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
const API = "http://192.168.29.9:5000/api/lost";

export default function PostLostItemScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill required fields");
      return;
    }

    try {
      //   const res = await fetch(`${API}/create`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       title,
      //       category: category === "Other" ? customCategory : category,
      //       description,
      //       location,
      //       address,
      //       pincode,
      //       userId: user._id,
      //     }),
      //   });
      const formData = new FormData();

      formData.append("title", title);
      formData.append(
        "category",
        category === "Other" ? customCategory : category,
      );
      formData.append("description", description);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("pincode", pincode);
      formData.append("userId", user._id);
      formData.append("type", "lost");
      if (image) {
        formData.append("image", {
          uri: image,
          name: "lostitem.jpg",
          type: "image/jpeg",
        });
      }

      const res = await fetch(`${API}/create`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to post");
        return;
      }

      Alert.alert("Success", "Lost item posted successfully");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Server error");
    }
  };
  const CATEGORIES = [
    "Electronics",
    "Wallet",
    "Documents",
    "Clothing",
    "Jewelry",
    "Bags",
    "Keys",
    "Other",
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.label, { color: colors.subText }]}>
          Item Title *
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Type here..."
          placeholderTextColor={colors.subText}
          value={title}
          onChangeText={setTitle}
        />

        {/* <Text style={[styles.label, { color: colors.subText }]}>Category</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          value={category}
          onChangeText={setCategory}
        /> */}
        {/* Category Selector */}
        <Text style={[styles.label, { color: colors.subText }]}>Category</Text>

        <TouchableOpacity
          style={[
            styles.input,
            { backgroundColor: colors.card, justifyContent: "center" },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: category ? colors.text : colors.subText }}>
            {category || "Select Category"}
          </Text>
        </TouchableOpacity>

        {/* Show custom input if Other selected */}
        {category === "Other" && (
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Enter Custom Category"
            placeholderTextColor={colors.subText}
            value={customCategory}
            onChangeText={setCustomCategory}
          />
        )}
        <Text style={[styles.label, { color: colors.subText }]}>
          Description *
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Type here..."
          placeholderTextColor={colors.subText}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={[styles.label, { color: colors.subText }]}>
          Lost Location *
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Type here..."
          placeholderTextColor={colors.subText}
          value={location}
          onChangeText={setLocation}
        />

        <Text style={[styles.label, { color: colors.subText }]}>Address</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Type here..."
          placeholderTextColor={colors.subText}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={[styles.label, { color: colors.subText }]}>Pincode</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Type here..."
          placeholderTextColor={colors.subText}
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
        />
        <Text style={[styles.label, { color: colors.subText }]}>
          Upload Image
        </Text>

        <TouchableOpacity
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={pickImage}
        >
          <Text style={{ color: colors.text }}>
            {image ? "Change Image" : "Select Image"}
          </Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              marginTop: 10,
            }}
          />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              margin: 20,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ paddingVertical: 12 }}
                  onPress={() => {
                    setCategory(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: colors.text, fontSize: 16 }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderRadius: 12,
    padding: 14,
  },
  button: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});
