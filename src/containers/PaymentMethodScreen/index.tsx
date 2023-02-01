import {View, Text} from 'react-native';
import React from 'react';
import CustomIcon from '../../atoms/CustomIcon';
import HeaderBar from '../../components/HeaderBar';
import {Colors, Fonts} from '../../themes';
import {useNavigation} from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar';

const PaymentMethodScreen = () => {
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
      <Text>PaymentMethodScreen</Text>
    </View>
  );
};

export default PaymentMethodScreen;
