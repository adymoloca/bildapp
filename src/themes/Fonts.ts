import { Dimensions, PixelRatio, Platform } from 'react-native';

const responsiveFont = (size: number) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale;
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const size = {
  h1: responsiveFont(30),
  h2: responsiveFont(28),
  h3: responsiveFont(26),
  h4: responsiveFont(24),
  h5: responsiveFont(22),
  h6: responsiveFont(20),
  input: responsiveFont(18),
  bigger: responsiveFont(17),
  regular: responsiveFont(16),
  medium: responsiveFont(14),
  small: responsiveFont(12),
  smallTiny: responsiveFont(11),
  tiny: responsiveFont(10),
  iconMap: responsiveFont(23),
};

export default size;
