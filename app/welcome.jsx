import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';


const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          source={require('../assets/images/welcome.png')}
        />
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>SocialApp!</Text>
          <Text style={styles.punchline}>
            where everyone finds a home and every image tells a story.
          </Text>
        </View>
        <View style={styles.footer}>
            <Button 
              title= "Getting Started"
              buttonStyle={{marginHorizontal: wp(3)}}
              onPress={()=>{router.push('signUp')}}
            />
            <View style={styles.bottomTextContainer}>
              <Text>Already have an Account?</Text>
              <Pressable onPress={()=>router.push('Login')}>
                <Text style={styles.LoginText}>Login</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: wp(5),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(70),
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    color: theme.colors.text,
    fontWeight: theme.fonts.extrabold,
    textAlign: 'center',
  },
  punchline: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.text,
    paddingHorizontal: wp(10),
  },
  footer: {
    gap: 30,
    width: '100%'
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  LoginText: {
    textAlign: 'center',
    color: theme.colors.primaryDark,
    fontSize: hp(1.6),
    fontWeight: theme.fonts.bold
  }

});