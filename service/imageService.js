import defaultUserImage from '../assets/images/defaultUser.png';

export const getUserImageSrc = imagePath => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return defaultUserImage;
  }
};