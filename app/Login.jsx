import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { auth } from '../firebaseConfig/firebase';
import { hp, wp } from '../helpers/common';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login', 'Please enter both email and password');
      router.push('Home')
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      console.log('✅ Logged in:', userCredential.user);
      Alert.alert('Login', 'login successful');
      router.push('Home'); 
    } catch (error) {
      console.error('❌ Login Error:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />
        <View>
          <Text style={styles.greetingText}>hey,</Text>
          <Text style={styles.greetingText}>welcome Back</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.subText}>Please Login to continue</Text>

          <Input
            icon={<Fontisto name="email" size={24} color="black" />}
            placeholder="Enter your Email"
            onChangeText={setEmail}
            value={email}
          />
          <Input
            icon={<FontAwesome5 name="lock" size={24} color={theme.colors.text} />}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <Button
            title="Login"
            loading={loading}
            onPress={handleLogin}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an Account?</Text>
          <Pressable onPress={() => router.push('signUp')}>
            <Text style={{
              color: theme.colors.primaryDark,
              fontWeight: theme.fonts.semibold
            }}>
              SignUp
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  greetingText: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  form: {
    gap: 20,
  },
  subText: {
    fontSize: hp(1.5),
    color: theme.colors.text,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});