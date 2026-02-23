import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../context/ThemeContext";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
const CATEGORY_OPTIONS = [
  "Electronics",
  "Wallet",
  "Documents",
  "Clothing",
  "Jewelry",
  "Bags",
  "Keys",
  "Other",
];

export default function PostFoundItemScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [foundLocation, setFoundLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleCategorySelect = (item) => {
    setCategory(item);
    setCategoryModalVisible(false);
    if (item !== "Other") {
      setCustomCategory("");
    }
  };

  //   const handleSubmit = () => {
  //     const finalCategory = category === "Other" ? customCategory : category;

  //     if (!title || !description || !foundLocation) {
  //       Alert.alert("Error", "Please fill all required fields");
  //       return;
  //     }

  //     if (!finalCategory) {
  //       Alert.alert("Error", "Please select category");
  //       return;
  //     }

  //     Alert.alert("Success", "Found item submitted successfully!");
  //     navigation.goBack();
  //   };
  const handleSubmit = async () => {
    const finalCategory = category === "Other" ? customCategory : category;

    if (!title || !description || !foundLocation) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (!finalCategory) {
      Alert.alert("Error", "Please select category");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", finalCategory);
      formData.append("description", description);
      formData.append("location", foundLocation);
      formData.append("address", address);
      formData.append("pincode", pincode);
      formData.append("type", "found"); //
      formData.append("userId", user._id);

      if (image) {
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }

      const response = await axios.post(`${BASE_URL}/lost/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Found item saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Item Title */}
        <Text style={styles.label}>Item Title *</Text>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="#000"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        {/* Category */}
        <Text style={styles.label}>Category *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={{ color: category ? "#000" : "#000" }}>
            {category || "Select Category"}
          </Text>
        </TouchableOpacity>
        {/* Custom Category Input */}
        {category === "Other" && (
          <>
            <Text style={styles.label}>Enter Category *</Text>
            <TextInput
              placeholder="Type category..."
              placeholderTextColor="#000"
              style={styles.input}
              value={customCategory}
              onChangeText={setCustomCategory}
            />
          </>
        )}

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="#000"
          style={[styles.input, { height: 100 }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Found Location */}
        <Text style={styles.label}>Found Location *</Text>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="#000"
          style={styles.input}
          value={foundLocation}
          onChangeText={setFoundLocation}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="#000"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        {/* Pincode */}
        <Text style={styles.label}>Pincode</Text>
        <TextInput
          placeholder="Type here..."
          placeholderTextColor="#000"
          style={styles.input}
          keyboardType="numeric"
          value={pincode}
          onChangeText={setPincode}
        />

        {/* Upload Image */}
        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          <Text style={styles.uploadText}>
            {image ? "Change Image" : "Select"}
          </Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* CATEGORY MODAL */}
      <Modal visible={categoryModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {CATEGORY_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => handleCategorySelect(item)}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 14,
    color: "#374151",
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 16,
    fontSize: 14,
  },
  uploadBox: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },
  uploadText: {
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 30,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 20,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
