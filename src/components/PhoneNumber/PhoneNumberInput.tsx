/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { Colors, Fonts, Metrics } from '../../themes';
import { View } from 'react-native';
import { PhoneNumberUtil } from 'google-libphonenumber';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';

const phoneUtil = PhoneNumberUtil.getInstance();
const PhoneNumberInput = ({ label, value, setValue = () => { }, icon, setError = () => { }, handleFocus, handleBlur }: any) => {
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if (value) {
      try {
        const parsedNo = phoneUtil.parse(value, '');
        if (parsedNo.hasNationalNumber()) {
          const nationalNumber = parsedNo
            .getNationalNumberOrDefault()
            .toString();
          const code = parsedNo.getCountryCodeOrDefault();
          const countryCode = phoneUtil.getRegionCodeForCountryCode(code);
          phoneInput.current?.setState({
            countryCode: countryCode as any,
            code: code.toString(),
            number: nationalNumber,
          });
        }
      } catch (e) {
        console.warn(e);
        phoneInput.current?.setState({
          countryCode: 'RO',
        });
      }
    } else {
      phoneInput.current?.setState({
        countryCode: 'RO',
      });
    }
  }, [value]);

  const handleChange = (value: any) => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    if (checkValid) {
      setValue(value);
      setError('');
    } else {
      setError(i18n.t('phone_error'));
    }
  };
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
      }}>
      {!!icon && <CustomIcon
        style={{ marginRight: 15, alignSelf: 'center' }}
        size={Fonts.h5}
        color={Colors.black}
        name={icon}
      />}
      <PhoneInput
        ref={phoneInput}
        withShadow={false}
        // autoFocus
        placeholder={label}
        layout="second"
        disableArrowIcon
        textContainerStyle={{
          backgroundColor: Colors.white,
          paddingHorizontal: 0,
          paddingVertical: 3, paddingBottom: 5
        }}
        countryPickerButtonStyle={{
          width: 'auto'
        }}
        textInputProps={{
          placeholderTextColor: Colors.blackOpacity,
          onFocus: handleFocus,
          onBlur: handleBlur
        }}
        textInputStyle={{
          fontSize: Fonts.regular,
          color: Colors.pureBlack,
        }}
        codeTextStyle={{
          fontSize: Fonts.regular,
          color: Colors.pureBlack
        }}
        onChangeFormattedText={text => {
          handleChange(text);
        }}
      />
    </View>
  );
};

const style = {
  textImagePicker: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: 'white',
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputContainer: {},

  poweredContainer: {},
  listView: {
    pointerEvents: 'auto',
    // width: '80%',
    backgroundColor: 'white',
    zIndex: 10,
  },
  row: {
    zIndex: 10,
    pointerEvents: 'auto',
  },
};

export default PhoneNumberInput;
