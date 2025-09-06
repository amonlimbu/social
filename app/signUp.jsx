import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { auth } from '../firebaseConfig/firebase';
import { hp, wp } from '../helpers/common';

const SignUp = () => {
  const router = useRouter();

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields");
      return;
    }

    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      console.log("User created:", userCredential.user);
      Alert.alert("Sign Up", "Account created successfully!");
      router.push("Login");
    } catch (error) {
      console.error("Sign Up Error:", error);
      Alert.alert("Sign Up", error.message);
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
          <Text style={styles.greetingText}>Let's</Text>
          <Text style={styles.greetingText}>Get started</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.subText}>Please fill the details to create an account</Text>

          <Input
            icon={<FontAwesome5 name="user" size={24} color="black" />}
            placeholder="Enter your Name"
            onChangeText={value => nameRef.current = value}
          />
          <Input
            icon={<Fontisto name="email" size={24} color="black" />}
            placeholder="Enter your Email"
            onChangeText={value => emailRef.current = value}
          />
          <Input
            icon={<FontAwesome5 name="lock" size={24} color={theme.colors.text} />}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <Button
            title="SignUp"
            loading={loading}
            onPress={onSubmit}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an Account?</Text>
          <Pressable onPress={() => router.push('Login')}>
            <Text style={{
              color: theme.colors.primaryDark,
              fontWeight: theme.fonts.semibold
            }}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

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