import Colors from './Colors';
import Fonts from './Fonts';
import Images from './Images';
import Metrics from './Metrics';

import { StyleSheet, Platform, StatusBar } from "react-native";

export const AndroidStyle =  StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export { Colors, Fonts, Images, Metrics };
