import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { auth } from '../firebaseConfig/firebase';
import { hp, wp } from '../helpers/common';

const Home = () => {
  const router = useRouter();
  const user = auth.currentUser; // ✅ define user properly

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logout', 'Logout successful');
      router.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>SocialApp!</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push('notification')}>
              <AntDesign name="heart" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => router.push('newPost')}>
              <AntDesign name="plussquare" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => router.push('profile')}>
              <Avatar
                uri={user?.photoURL} // ✅ use photoURL from Firebase
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <Button title="Logout" onPress={logout} />
    </ScreenWrapper>
  );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex:1 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold
    },
    avatarImage: {
        height: hp(4.2),
        width: hp(4.3),
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray,
        borderWidth: 3
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    listStyle: {
        paddingTop: 20,
        paddingHorizontal: wp(4)
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text
    },
    pill: {
        position: 'absolute',
        right: -10,
        top: -4,
        height: hp(2.2),
        width: hp(2.2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.roseLight
    },
    pillText: {
    color: 'white',
    fontsize: hp(1.2),
    fontWeight: theme.fonts.bold
    }
})