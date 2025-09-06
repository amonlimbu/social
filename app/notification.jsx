
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase"; 

export default function HomeScreen() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetsData);
    });

    return unsubscribe;
  }, []);

  const handlePostTweet = async () => {
    if (tweet.trim() === "") {
      Alert.alert("Empty Tweet", "Write something before posting!");
      return;
    }

    try {
      await addDoc(collection(db, "tweets"), {
        content: tweet,
        username: "You",
        createdAt: serverTimestamp(),
      });

      setTweet("");

      Alert.alert("Tweet Posted ✅", "Your tweet has been shared.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const renderTweet = ({ item }) => (
    <View style={styles.tweetCard}>
      <Text style={styles.username}>@{item.username}</Text>
      <Text style={styles.tweetText}>{item.content}</Text>
      <Text style={styles.timestamp}>
        {item.createdAt?.toDate
          ? item.createdAt.toDate().toLocaleString()
          : "Just now"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's happening?"
        value={tweet}
        onChangeText={setTweet}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handlePostTweet}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        ListEmptyComponent={
          <Text style={styles.noTweets}>No tweets yet. Post one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    minHeight: 50,
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  tweetCard: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  tweetText: {
    fontSize: 16,
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  feed: {
    paddingBottom: 100,
  },
  noTweets: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
