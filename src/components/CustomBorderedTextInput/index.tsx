import React, { useState } from 'react';
import { KeyboardType, TextInput, View, Text } from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import { Colors, Fonts } from '../../themes';
import PaymentScreenLtrStyle from '../../themes/styles/paymentScreen.ltr.style';

interface ICustomBorderedTextInputProps {
  label?: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardType;
  extraStyle?: object;
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  error?: string;
}

const CustomBorderedTextInput = (props: ICustomBorderedTextInputProps, ref: any) => {
  const {
    label,
    value,
    onChange,
    type,
    keyboardType,
    onSubmitEditing,
    onFocus,
    extraStyle,
    error,
  } = props;
  const [showPassword, setShowPassword] = useState(true);
  // const changeState = () => {
  //   setShowPassword(prevState => !prevState);
  // };

  const [icon, setIcon] = useState('eye-off-sharp');
  const changeState = () => {
    setIcon(prevState => (prevState === 'eye' ? 'eye-off-sharp' : 'eye'));
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <Text style={PaymentScreenLtrStyle.cardIndicator}>{label}</Text>
      <View style={[PaymentScreenLtrStyle.card_inputs, { flexDirection: 'row', alignItems: 'center'}]}>
        <TextInput
          editable
          // ref={ref}
          style={{flex: 1}}
          placeholder=""
          onChangeText={text => onChange(text)}
          value={value}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={!showPassword}
          onFocus={onFocus}
        />
        {type == 'password' && (
          <CustomIcon
            name={icon}
            color={Colors.blackOpacity2}
            size={Fonts.h5}
            onPress={changeState}
          />
        )}
        {/* {error && (
        <View>
          <Text style={{ padding: 10, color: Colors.red }}>{error}</Text>
        </View>
      )} */}
      </View>
    </>
  );
};

export default CustomBorderedTextInput;
