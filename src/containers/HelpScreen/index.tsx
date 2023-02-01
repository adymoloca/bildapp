import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderBar from '../../components/HeaderBar';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import CustomStatusBar from '../../components/CustomStatusBar';

const HelpScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomStatusBar />
      <HeaderBar
        isHidden={false}
        leftComponent={
          <CustomIcon
            iconPack="custom"
            name="arrow-back"
            size={Fonts.h5}
            color={Colors.black}
            onPress={navigation.goBack}
          />
        }
        noBorder={true}
      />
      <Text> </Text>
    </View>
  );
};

export default HelpScreen;
