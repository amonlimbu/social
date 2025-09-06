import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const BackButton = ({size=30, router}) => {
  return (
    <Pressable onPress={()=>router.back()} style={styles.button}>
      <AntDesign name="arrowleft" size={size} color={theme.colors.primary} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.darklight
    }
})