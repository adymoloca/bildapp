import React from "react";
import { Animated, I18nManager, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import CustomIcon from "../../atoms/CustomIcon";
import { Colors, Fonts } from "../../themes";

export const RightActions = (props: any) => {
    const {onPress, dragX, progress} = props;
    const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [48, 0],
      });
      return (
        <View style={{ width: 48, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row', zIndex: -100, }}>
            <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
            <RectButton
                style={[styles.rightAction, { backgroundColor: '#dd2c00' }]}
                onPress={onPress}>
                 <CustomIcon
                    size={Fonts.h5}
                    color={Colors.white}
                    name={'trash'}
                />
            </RectButton>
            </Animated.View>
        </View>
      );
};

const styles = StyleSheet.create({
    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    actionText: {
      color: 'white',
      fontSize: 16,
      backgroundColor: 'transparent',
      padding: 10,
    },
    rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });