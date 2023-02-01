import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import {Colors, Fonts} from '../../../themes';
import CustomIcon from '../../../atoms/CustomIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {formatAddress} from '../../../utils/orderUtil';

export const Location = ({
  value,
  disabled = true,
  onPress = () => {},
  placeholder,
}: {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  placeholder?: string;
}) => {
  const address = formatAddress(value || '');
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={styles.inputItem}>
        <View style={[styles.inputItemLeft, {marginLeft: 5}]}>
          <CustomIcon
            size={Fonts.h3}
            color={Colors.black}
            iconPack="custom"
            name="location"
          />
        </View>

        <View style={styles.inputItemRight}>
          <Text
            style={
              placeholder
                ? GlobalLtrStyle.regularDarkGreyText
                : GlobalLtrStyle.regularBlackText
            }>
            {placeholder
              ? placeholder
              : address?.length > 30
              ? address?.substr(0, 30) + '...'
              : address}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
