import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import styles, {pickerStyle} from '../AppointmentScreen/styles';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {CurrencyEnum} from '../../utils/interfaces';

export const CurrencyPicker = ({
  value,
  onChange,
  label,
  isLabelAbove,
  error,
}: {
  label: string;
  isLabelAbove: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) => {
  const [curencyList, setCurencyList] = React.useState<Item[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const result = Object.keys(CurrencyEnum).map(key => ({
      value: CurrencyEnum[key],
      label: key,
    }));
    setCurencyList(result);
  }, []);

  const onValueChange = (value: string) => {
    if (value) {
      onChange(value);
    } else if (curencyList[0]) {
      onChange(curencyList[0].value);
    }
  };

  const borderBottomColor = error
    ? Colors.red
    : isFocused
    ? Colors.green
    : Colors.greyOpacity;

  return (
    <>
      <View
        style={{
          borderBottomWidth: 1,
          marginBottom: 15,
          marginTop: 10,
          borderBottomColor: Colors.greyOpacity,
        }}>
        {label && isLabelAbove && (
          <Text
            style={[
              GlobalLtrStyle.formTextPlaceholder,
              {fontSize: 14, paddingLeft: 0},
            ]}>
            {label}
          </Text>
        )}
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          value={value}
          onValueChange={onValueChange}
          items={curencyList}
          style={pickerStyle}>
          <View style={styles.inputItem}>
            <View
              style={[
                {
                  marginLeft: 0,
                  paddingVertical: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  // justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={[GlobalLtrStyle.regularBlackText, {fontWeight: '500'}]}>
                {value}
              </Text>
              <CustomIcon
                style={{marginLeft: 10}}
                size={Fonts.input}
                color={Colors.black}
                name="chevron-down"
              />
            </View>
          </View>
        </RNPickerSelect>
      </View>
    </>
  );
};
