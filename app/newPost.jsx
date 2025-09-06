import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const TweetBox = () => {
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTweet = async () => {
    if (!tweet.trim()) {
      Alert.alert('Empty Tweet', 'Please write something before tweeting.');
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('tweets').add({
        content: tweet,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: 'Anonymous', 
      });
      setTweet('');
      Alert.alert('Success', 'Your tweet has been posted!');
    } catch (error) {
      console.error('Tweet failed:', error);
      Alert.alert('Error', 'Something went wrong while posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's happening?"
        multiline
        value={tweet}
        onChangeText={setTweet}
      />
      <Button title={loading ? 'Tweeting...' : 'Tweet'} onPress={handleTweet} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default TweetBox;

