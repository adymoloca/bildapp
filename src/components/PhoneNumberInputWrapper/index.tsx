import { KeyboardType, TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import { Colors, Fonts } from '../../themes';
import CustomIcon from '../../atoms/CustomIcon';
import PhoneNumberInput from '../PhoneNumber/PhoneNumberInput';

interface IPhoneNumberInputWrapper {
  value: string;
  onChange: (value: string, key?: string) => void;
  label?: string;
  isLabelAbove?: boolean;
  ref?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  inputName?: string;
  error?: string;
  setError?: (value: string) => void;
}

const PhoneNumberInputWrapper = ((props: IPhoneNumberInputWrapper) => {

  const {
    label, isLabelAbove, value, onChange, onFocus, inputName,
    error, setError, onBlur,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  
  const handleFocus = onFocus ? onFocus : () => setIsFocused(true);
  const handleBlur = onBlur ? onBlur : () => setIsFocused(false);

  const borderBottomColor = error ? Colors.red : isFocused ? Colors.green : Colors.greyOpacity;

  const onValueChange = (value: string) => {
    if (inputName) {
      onChange(value, inputName);
    } else {
      onChange(value);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ height: 15 }}>
        {isLabelAbove && label && (
          <Text style={[GlobalLtrStyle.formTextPlaceholder, { fontSize: 14, paddingLeft: 0 }]}>{label}</Text>
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: borderBottomColor, borderBottomWidth: 1 }}>
        <PhoneNumberInput value={value} handleFocus={handleFocus} handleBlur={handleBlur} setValue={onValueChange} setError={setError} label={isLabelAbove ? ' ' : label} />
      </View>
      <View style={{ paddingTop: 10 }}>
        {!error ? (
          <View style={{ height: 13 }} />
        ) : (
          <Text style={{ color: Colors.red, height: 13, fontSize: 12 }}>{error}</Text>
        )}
      </View>
    </View>
  );
});
export default PhoneNumberInputWrapper;
