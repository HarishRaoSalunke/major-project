import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function SupportChatScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi 👋 I’m FindIt+ Support Bot. How can I help you?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef();

  const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("post") && text.includes("lost")) {
      return "To post a lost item:\n1️⃣ Go to Owner Home\n2️⃣ Click 'Post Lost Item'\n3️⃣ Fill details and submit.   ";
    }

    if (text.includes("post") && text.includes("found")) {
      return "To post a found item:\n1️⃣ Go to Finder Home\n2️⃣ Click 'Post Found Item'\n3️⃣ Upload image and submit.  ";
    }

    if (text.includes("match")) {
      return "FindIt+ matches items based on category and status. In future, AI matching will rank items based on description similarity.  ";
    }

    if (text.includes("status")) {
      return "Status meanings:\n🟢 Active = Searching\n🟡 Matched = Someone claimed it\n🔵 Returned = Item handed over\n⚫ Closed = Case finished.  ";
    }

    if (text.includes("profile")) {
      return "You can edit your profile from the Profile tab at the bottom right.  ";
    }

    if (text.includes("delete")) {
      return "Currently, delete option is not enabled. It will be added in upcoming updates.  ";
    }

    if (text.includes("ai")) {
      return "AI matching will compare lost and found descriptions using smart similarity ranking to find best matches automatically.   ";
    }

    return "I'm here to help with anything related to FindIt+. Please ask about posting items, matching, profile, or status.  ";
  };

  const sendMessage = () => {
    console.log("RAW INPUT:", input);
    const trimmedText = input.trim();
    if (!trimmedText) return;

    const userMessage = {
      id: Date.now().toString(),
      text: trimmedText,
      sender: "user",
    };

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: generateBotResponse(trimmedText),
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" && { color: "#fff" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        initialNumToRender={20}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask something about FindIt+..."
          value={input}
          onChangeText={setInput}
          //   onSubmitEditing={sendMessage}
          //   blurOnSubmit={false}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  messageContainer: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: "85%", // slightly more width
    flexShrink: 1, // allow wrapping properly
  },
  userMessage: {
    backgroundColor: "#7C3AED",
    alignSelf: "flex-end",
    borderTopRightRadius: 4,
  },

  botMessage: {
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-start",
    borderTopLeftRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    flexWrap: "wrap", // ensure wrapping
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 15,
  },

  sendButton: {
    backgroundColor: "#7C3AED",
    marginLeft: 8,
    padding: 10,
    borderRadius: 20,
  },
});
