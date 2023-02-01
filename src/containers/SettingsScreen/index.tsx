import {View, Text, TouchableOpacity, Switch, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../components/HeaderBar';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import {useNavigation} from '@react-navigation/native';
import SettingsScreenStyle from '../../themes/styles/settingsScreen.ltr.style';
import appointmentScreenLtrStyle from '../../themes/styles/appointmentScreen.ltr.style';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import i18n from '../../services/i18n';
import {useAppSelector} from '../../redux/hooks';
import {
  selectIsClient,
  actions as appActions,
} from '../../redux/slices/applicationSlice';
import SelectLanguage from '../../modals/SelectLanguage';
import {actions} from '../../redux/slices/persistedUserSlice';
import {actions as acUserSlice} from '../../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusBar from '../../components/CustomStatusBar';
import {RootState} from '../../redux/store';
import LoadingSpinner from '../../modals/LoadingSpinner';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isClient = useAppSelector(selectIsClient);

  const supplierDetails = useAppSelector(
    (state: RootState) => state.user.supplierDetails,
  );

  const notification: boolean = useSelector(
    (state: RootState) => state.application.notification,
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.isLoading,
  );

  const [deliveryRange, setDeliveryRange] = useState<number>(
    supplierDetails.deliveryRange,
  );

  const [selectLanguagesVisible, setSelectLanguagesVisible] = useState(false);

  useEffect(() => {
    setDeliveryRange(supplierDetails.deliveryRange);
  }, [supplierDetails.deliveryRange]);

  const onSetDeliveryRange = (value: string) => {
    if (/^[0-9]+$/.test(value)) {
      let newValue = parseInt(value, 10);
      if (newValue > 150) {
        newValue = 150;
      }
      setDeliveryRange(newValue);
    }
    if (!value) {
      setDeliveryRange(0);
    }
  };

  const onUpdateDateRange = (value: number) => {
    dispatch(
      acUserSlice.putUserDetails({...supplierDetails, deliveryRange: value}),
    );
  };

  return (
    <>
      <CustomStatusBar />
      <LoadingSpinner visible={isLoading} />
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
        centerComponent={
          <Text style={{fontSize: Fonts.regular, fontWeight: '500'}}>
            {i18n.t('settings')}
          </Text>
        }
        noBorder={true}
      />
      <View style={SettingsScreenStyle.container}>
        <View style={{paddingVertical: 15}}>
          <View style={appointmentScreenLtrStyle.inputItem}>
            <View
              style={[
                appointmentScreenLtrStyle.inputItemRight,
                {marginRight: 15, paddingRight: 0},
              ]}>
              <Text style={GlobalLtrStyle.regularBlackText}>
                {i18n.t('language')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectLanguagesVisible(true);
                }}>
                <Text style={GlobalLtrStyle.regularDarkGreyText}>
                  {i18n.locale === 'ro' ? 'Română' : 'English'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={appointmentScreenLtrStyle.inputItem}>
            <View
              style={[
                appointmentScreenLtrStyle.inputItemRightNoSeparator,
                {marginRight: 15, paddingRight: 0},
              ]}>
              <Text style={GlobalLtrStyle.regularBlackText}>
                {isClient ? i18n.t('notifications') : i18n.t('order_range')}
              </Text>
              {isClient ? (
                <Switch
                  trackColor={{false: Colors.grey, true: Colors.green}}
                  thumbColor={Colors.white}
                  value={notification}
                  onValueChange={() => {
                    dispatch(appActions.setNotification(!notification));
                  }}
                />
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={GlobalLtrStyle.regularDarkGreyText}
                    onChangeText={onSetDeliveryRange}
                    value={`${deliveryRange}`}
                    onSubmitEditing={() => {
                      onUpdateDateRange(deliveryRange);
                    }}
                    onBlur={() => {
                      setDeliveryRange(supplierDetails.deliveryRange);
                    }}
                    keyboardType="numeric"
                    returnKeyType={'done'}
                  />
                  <Text style={GlobalLtrStyle.regularDarkGreyText}> km</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <SelectLanguage
          visible={selectLanguagesVisible}
          onClose={() => {
            setSelectLanguagesVisible(false);
          }}
        />
      </View>
    </>
  );
};

export default SettingsScreen;
