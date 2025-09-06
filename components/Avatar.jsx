import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import { getUserImageSrc } from '../service/imageService'

const Avatar = ({
    uri,
    size=hp(4.5),
    rounded = theme.radius.md,
    style ={}
}) => {
  return (
    <Image
        source={getUserImageSrc(uri)} 
        transition={100}
        style={[styles.Avatar,{height: size, width: size, borderRadius: rounded},style ]}
    />
  )
}

export default Avatar;

const styles = StyleSheet.create({
    Avatar: {
        borderCurve: 'continuous',
        borderColor: theme.colors.darklight,
        borderWidth: 1,
    }
})