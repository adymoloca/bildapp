import React, {useEffect, useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {Colors, Fonts, Metrics} from '../../themes';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {PhoneNumberUtil} from 'google-libphonenumber';
import {AnyAsyncThunk} from '@reduxjs/toolkit/dist/matchers';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';
import CustomStatusBar from '../CustomStatusBar';
import HeaderBar from '../HeaderBar';
import {SafeAreaView} from 'react-native-safe-area-context';

const phoneUtil = PhoneNumberUtil.getInstance();
const PhoneNumberInput = ({
  phoneNumber,
  isVisible,
  onClose,
  onSave,
}: {
  phoneNumber: string;
  isVisible: boolean;
  onClose: () => void;
  onSave: (phoneNumber: string) => void;
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(phoneNumber);
  }, [phoneNumber]);

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
    <Modal visible={isVisible}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {Platform.OS === 'ios' ? <CustomStatusBar /> : <SafeAreaView />}

        <HeaderBar
          placement="center"
          noBorder={true}
          leftComponent={
            <CustomIcon
              size={Fonts.h5}
              color={Colors.black}
              name="arrow-back"
              iconPack="custom"
              onPress={onClose}
            />
          }
          centerComponent={
            <Text style={{fontSize: Fonts.regular, fontWeight: '500'}}>
              {i18n.t('phone_number')}
            </Text>
          }
        />
        <View
          style={{
            display: 'flex',
            padding: 15,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: Fonts.regular,
              paddingTop: 20,
              paddingBottom: 40,
              width: 300,
              color: Colors.black,
            }}>
            {i18n.t('please_enter_phone_number')}
          </Text>
          <PhoneInput
            ref={phoneInput}
            withShadow={false}
            autoFocus
            disableArrowIcon
            textContainerStyle={{
              backgroundColor: Colors.white,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
            countryPickerButtonStyle={{
              width: 'auto',
            }}
            textInputStyle={{
              fontSize: Fonts.regular,
              color: Colors.black,
            }}
            codeTextStyle={{
              fontSize: Fonts.regular,
              color: Colors.black,
            }}
            onChangeFormattedText={text => {
              handleChange(text);
            }}
          />

          <Text
            style={{
              color: Colors.redStrong,
              fontSize: Fonts.medium,
              paddingTop: 0,
            }}>
            {error}
          </Text>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: Colors.lightGrey3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              onSave(value);
            }}
            disabled={!value || error !== ''}>
            <Text
              style={{
                color:
                  !value || error !== '' ? Colors.greyBackground : Colors.green,
                fontSize: Fonts.bigger,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
