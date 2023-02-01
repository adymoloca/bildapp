import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomStatusBar from '../../components/CustomStatusBar';
import GeneralField from '../../components/GeneralField';
import HeaderBar from '../../components/HeaderBar';
import {selectIsClient} from '../../redux/slices/applicationSlice';
import {actions} from '../../redux/slices/userSlice';
import {actions as persistedUserActions} from '../../redux/slices/persistedUserSlice';

import {
  selectSupplierDetails,
  selectClientDetails,
} from '../../redux/slices/userSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import {ClientPathList, SupplierPathList} from '../../utils/enums';
import {Address, ISupplierData, IUser} from '../../utils/interfaces';
import {
  selectHasAddress,
  selectHasInvoiceDetails,
  selectHasRepresentativeDetails,
} from '../../redux/slices/persistedUserSlice';
import {formatAddress} from '../../utils/orderUtil';
import {useIsFocused} from '@react-navigation/native';
import PhoneNumberModal from '../../components/PhoneNumber/PhoneNumberModal';

const EditAccountDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const clientDetails: IUser = useSelector(selectClientDetails);
  const supplierDetails: ISupplierData = useSelector(selectSupplierDetails);
  const isClient: boolean = useSelector(selectIsClient);
  const onSetClientDetails = (clientDetails: IUser) =>
    dispatch(actions.setClientDetails(clientDetails));
  const onPutUserDetails = (userDetails: any) =>
    dispatch(actions.putUserDetails(userDetails));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressObject, setAddressObject] = useState(new Address());

  const [isNameFocused, setIsNameFocused] = useState(false);
  const hasAddress = useSelector(selectHasAddress);
  const hasInvoiceDetails = useSelector(selectHasInvoiceDetails);
  const hasRepresentativeDetails = useSelector(selectHasRepresentativeDetails);
  const isFocused = useIsFocused();
  const [isVisiblePhoneNumberModal, setIsVisiblePhoneNumberModal] =
    useState(false);

  useEffect(() => {
    if (isClient) {
      setName(clientDetails.name);
      setEmail(clientDetails.email);
      setPhone(clientDetails.phone);
      // TODO to change with the changes on backend
    }
  }, [clientDetails]);

  useEffect(() => {
    if (!isClient) {
      setName(supplierDetails.company);
      setEmail(supplierDetails.email);
      setPhone(supplierDetails.phone || '');
      setAddress(supplierDetails.address?.formattedAddress || '');
      setAddressObject(supplierDetails.address || new Address());
      // TODO to change with the changes on backend
    }
  }, [supplierDetails]);

  useEffect(() => {
    if (!isClient && isFocused) {
      dispatch(persistedUserActions.getCanSendOfferAttempt());
    }
  }, [isFocused]);

  const onNavigateToChangePassword = () => {
    const path = isClient
      ? ClientPathList.CHANGE_PASSWORD
      : SupplierPathList.CHANGE_PASSWORD;
    navigation.navigate(path);
  };

  const onNavigateToInvoice = () => {
    const path = isClient
      ? ClientPathList.INVOICE_DETAILS
      : SupplierPathList.INVOICE_DETAILS;
    navigation.navigate(path);
  };
  const onNavigateToRepresentative = () => {
    const path = SupplierPathList.REPRESENTATIVE;
    navigation.navigate(path);
  };

  const onCancel = () => {
    if (isClient) {
      setName(clientDetails.name);
    } else {
      setName(supplierDetails.company);
    }
    Keyboard.dismiss();
  };

  const onSave = () => {
    if (isClient) {
      onPutUserDetails({
        ...clientDetails,
        fullName: name,
      });
    } else {
      onPutUserDetails({
        ...supplierDetails,
        company: name,
      });
    }
    Keyboard.dismiss();
  };

  const onSavePhoneNumber = (phoneNumber: string) => {
    setIsVisiblePhoneNumberModal(false);
    if (isClient) {
      onPutUserDetails({
        ...clientDetails,
        phone: phoneNumber,
        fullName: name,
      });
    } else {
      onPutUserDetails({
        ...supplierDetails,
        phone: phoneNumber,
        company: name,
      });
    }
    Keyboard.dismiss();
  };

  const items = [
    {
      icon: isClient ? 'person' : 'briefcase-outline',
      text: name,
      value: name,
      setValue: setName,
      right: null,
      onFocus: () => {
        setIsNameFocused(true);
      },
      onBlur: () => {
        setIsNameFocused(false);
      },
      isEditable: true,
    },
    {
      icon: 'mail',
      text: email,
      value: email,
      setValue: setEmail,
      right: null,
      disabled: true,
      onFocus: () => {},
      isEditable: false,
    },
    {
      icon: 'phone',
      text: phone,
      value: phone,
      setValue: setPhone,
      onFocus: () => {},
      right: {
        icon: 'chevron-forward',
        callback: () => {
          setIsVisiblePhoneNumberModal(true);
        },
      },
      isEditable: false,
    },
    {
      icon: isClient ? 'lock-closed' : 'location',
      text: isClient
        ? i18n.t('change_password')
        : formatAddress(addressObject?.formattedAddress),
      value: isClient ? '' : address,
      setValue: isClient ? () => {} : setAddress,
      right: {
        icon: 'chevron-forward',
        callback: isClient
          ? onNavigateToChangePassword
          : () => {
              navigation.navigate(SupplierPathList.SEARCH_ADDRESS);
            },
      },
      isEditable: false,
      hideOtherFields: false,
      notification: !isClient && !hasAddress,
    },
    {
      icon: 'receipt',
      text: i18n.t('billing_details'),
      value: null,
      setValue: null,
      right: {
        icon: 'chevron-forward',
        callback: onNavigateToInvoice,
      },
      isEditable: false,
      onFocus: () => {},
      notification: !isClient && !hasInvoiceDetails,
    },
  ];
  if (!isClient) {
    items.push({
      icon: 'person',
      text: i18n.t('representative_details'),
      value: null,
      setValue: null,
      right: {
        icon: 'chevron-forward',
        callback: onNavigateToRepresentative,
      },
      onFocus: () => {},
      isEditable: false,
      notification: !isClient && !hasRepresentativeDetails,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CustomStatusBar />
      <HeaderBar
        placement="center"
        noBorder={true}
        leftComponent={
          <CustomIcon
            size={Fonts.h5}
            color={Colors.black}
            iconPack="custom"
            name="arrow-back"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <Text style={{fontSize: Fonts.regular, fontWeight: '500'}}>
            {i18n.t('edit_profile')}
          </Text>
        }
      />
      <View style={[MyAccountScreenStyle.container, {marginTop: 20}]}>
        {items.map(
          (item: any, index: number) =>
            !item.hideOtherFields && (
              <View key={index} style={{marginHorizontal: 15}}>
                <GeneralField
                  icon={item.icon}
                  text={item.text}
                  value={item.value}
                  setValue={item.setValue}
                  right={item.right}
                  onFocus={item.onFocus}
                  onBlur={item.onBlur}
                  isPhoneInput={item.isPhoneInput}
                  keyboardType={item.icon === 'phone' ? 'phone-pad' : 'default'}
                  hideSeparator={index === items.length - 1}
                  customTextInput={item.customTextInput}
                  isEditable={item.isEditable}
                  notification={item.notification}
                />
              </View>
            ),
        )}
        {!isClient && !hasRepresentativeDetails && (
          <Text
            style={{
              color: Colors.redStrong,
              fontSize: Fonts.regular,
              padding: 15,
              paddingTop: 0,
              lineHeight: 30,
            }}>
            {i18n.t('representative_required')}
          </Text>
        )}
      </View>
      {isNameFocused && (
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 50,
              backgroundColor: 'white',
              borderTopWidth: 2,
              borderTopColor: 'rgba(0,0,0,0.1)',
            },
          ]}>
          <TouchableOpacity style={{marginLeft: 30}} onPress={onCancel}>
            <Text
              style={{
                fontSize: Fonts.input,
                color: Colors.green,
                fontWeight: 'bold',
              }}>
              {i18n.t('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 30}} onPress={onSave}>
            <Text
              style={{
                fontSize: Fonts.input,
                color: Colors.green,
                fontWeight: 'bold',
              }}>
              {i18n.t('save')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SafeAreaView />
      {isVisiblePhoneNumberModal && (
        <PhoneNumberModal
          isVisible={isVisiblePhoneNumberModal}
          onClose={() => {
            setIsVisiblePhoneNumberModal(false);
          }}
          phoneNumber={phone}
          onSave={onSavePhoneNumber}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default EditAccountDetailsScreen;
