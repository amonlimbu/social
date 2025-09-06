import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import { theme } from '../constants/theme';
import { auth, firestore } from '../firebaseConfig/firebase';
import { hp } from '../helpers/common';

const ProfilePhotoChanger = () => {
  const [imageUri, setImageUri] = useState(null);
  const router = useRouter();
  const uid = auth.currentUser?.uid || 'guest';

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.photoBase64) {
          setImageUri(`data:image/jpeg;base64,${data.photoBase64}`);
        }
      }
    };
    fetchProfilePhoto();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      const uri = `data:image/jpeg;base64,${base64Image}`;
      setImageUri(uri);
      await saveToFirestore(base64Image);
    }
  };

  const saveToFirestore = async (base64Image) => {
    try {
      await setDoc(doc(firestore, 'users', uid), { photoBase64: base64Image }, { merge: true });
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Save Error', 'Could not save image to Firestore.');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton router={router} />
      <Text style={styles.label}>Your Profile Photo</Text>
      <Pressable onPress={pickImage}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../assets/images/defaultUser.png')}
          style={styles.avatar}
        />
        <Text style={styles.changeText}>Tap to change</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePhotoChanger;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: hp(4),
  },
  label: {
    fontSize: hp(2.5),
    fontWeight: '600',
    marginBottom: hp(1),
    color: theme.colors.textDark,
  },
  avatar: {
    width: hp(12),
    height: hp(12),
    borderRadius: hp(6),
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  changeText: {
    marginTop: hp(1),
    fontSize: hp(2),
    color: theme.colors.primary,
  },
});