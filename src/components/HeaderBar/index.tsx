import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';

import {Colors, Fonts} from '../../themes';

const HeaderBar = ({
  isHidden,
  placement,
  leftComponent,
  centerComponent,
  rightComponent,
  noBorder,
  style,
}: any) => {
  const width = Dimensions.get('window').width;
  const height = Fonts.h5;
  if (!isHidden) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          borderBottomColor: Colors.lightGrey,
          ...style,
        }}>
        <View
          style={{
            width: width / 4.3,
            maxHeight: height,
            alignItems: 'flex-start',
          }}>
          {leftComponent}
        </View>
        <View
          style={{width: width / 2.3, maxHeight: height, alignItems: 'center'}}>
          {centerComponent}
        </View>
        <View
          style={{
            width: width / 4.3,
            maxHeight: height,
            alignItems: 'flex-end',
          }}>
          {rightComponent}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export const HeaderBarWithImage = ({
  title,
  image,
  onClick,
}: {
  title: string;
  image: any;
  onClick: () => void;
}) => {
  const isFocused = useIsFocused();
  return (
    <>
      <StatusBar
        translucent
        barStyle={isFocused ? 'light-content' : 'dark-content'}
      />
      <ImageBackground style={ImageStyle.imageContainer} source={image}>
        <CustomIcon
          size={Fonts.h2}
          color={Colors.white}
          style={{marginLeft: 15}}
          name="close"
          iconPack="custom"
          onPress={onClick}
        />
        <Text style={ImageStyle.title}>{title}</Text>
      </ImageBackground>
    </>
  );
};

const ImageStyle = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 190,
    display: 'flex',
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
    marginLeft: 15,
  },
});
export default HeaderBar;
