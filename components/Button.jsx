import { Pressable, StyleSheet, Text, View } from 'react-native';
import Loading from '../components/Loading';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';

const Button = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress = () => {},
  loading = false,
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4, 
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, shadowStyle, { backgroundColor: 'white' }]}>
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous', 
  },
  text: {
    color: 'white',
    fontWeight: '600', 
    fontSize: 20,
  },
});