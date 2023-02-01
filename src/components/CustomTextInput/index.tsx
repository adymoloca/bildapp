import { KeyboardType, TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import { Colors, Fonts } from '../../themes';
import CustomIcon from '../../atoms/CustomIcon';

interface ICustomTextInputProps {
  value: string;
  onChange: (value: string, key?: string) => void;
  inputName?: string;
  label?: string;
  isLabelAbove?: boolean;
  type?: string;
  ref?: any;
  keyboardType?: KeyboardType;
  extraStyle?: object;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
  error?: string;
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  autoCorrect?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onEndEditing?: (value: string, inputName?: string) => void;
  editable?: boolean;
}

const CustomTextInput = React.forwardRef(function CustomTextInput(props: ICustomTextInputProps, ref) {

  const {
    label, isLabelAbove, value, onChange, type, keyboardType, autoFocus, onSubmitEditing, extraStyle, error, inputName, autoCapitalize,
    autoCorrect, onFocus, onBlur, onEndEditing, editable = true,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [icon, setIcon] = useState('eye-off-sharp');
  const [showPassword, setShowPassword] = useState(true);

  const changeState = () => {
    setIcon(prevState => (prevState === 'eye' ? 'eye-off-sharp' : 'eye'));
    setShowPassword(prevState => !prevState);
  };

  const handleFocus = onFocus ? onFocus : () => setIsFocused(true);

  const onLocalEndEditing = () => {
    onEndEditing && onEndEditing(value, inputName);
  };
  const handleBlur = onBlur ? onBlur : () => setIsFocused(false);

  const onValueChange = (value: string) => {
    if (inputName) {
      onChange(value, inputName);
    } else {
      onChange(value);
    }
  };

  const borderBottomColor = error ? Colors.red : isFocused ? Colors.green : Colors.greyOpacity;

  return (
    <View style={{ marginTop: 15 }}>
      {/* {label && isLabelAbove && (
        <Text style={GlobalLtrStyle.formTextPlaceholder}>{label}</Text>
      )} */}
      <View style={{ height: 17 }}>
        {((isFocused && isLabelAbove) || (isLabelAbove && !!value)) && label && (
          <Text style={[GlobalLtrStyle.formTextPlaceholder, { fontSize: 14, paddingLeft: 0 }]}>{label}</Text>
        )}
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: borderBottomColor, borderBottomWidth: 1, marginVertical: 0 }}
        pointerEvents={editable ? 'auto' : 'none'}
      >
        <TextInput
          autoCapitalize={autoCapitalize}
          ref={ref}
          onChangeText={onValueChange}
          style={[GlobalLtrStyle.formTextInput, extraStyle, { flex: 1, paddingVertical: 3, paddingBottom: 5, paddingLeft: 0 }]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          secureTextEntry={type == 'password' ? showPassword : false}
          placeholderTextColor={Colors.blackOpacity}
          // placeholder={!isLabelAbove ? label : undefined}
          placeholder={!(isFocused && isLabelAbove) ? label : ''}
          keyboardType={keyboardType ? keyboardType : 'default'}
          returnKeyLabel={'Done'}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onLocalEndEditing}
          autoFocus={autoFocus}
          autoCorrect={autoCorrect}
          focusable={true}
          returnKeyType={'next'}
        />
        {type == 'password' && (
          <CustomIcon
            size={Fonts.h5}
            color={Colors.blackOpacity2}
            onPress={changeState}
            name={icon}
          />
        )}
      </View>
      <View style={{ paddingTop: 7 }}>
        {!error ? (
          <View style={{ height: 13 }} />
        ) : (
          <Text style={{ color: Colors.red, height: 13, fontSize: 12 }}>{error}</Text>
        )}
      </View>
    </View >
  );
});

export default CustomTextInput;
