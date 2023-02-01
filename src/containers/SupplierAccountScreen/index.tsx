import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {SectionList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import CustomStatusBar from '../../components/CustomStatusBar';
import HeaderBar from '../../components/HeaderBar';
import {actions} from '../../redux/slices/applicationSlice';
import {selectNotificationNumber, actions as persistedUserActions} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import {SupplierPathList} from '../../utils/enums';
import {ISupplierSettingsOptions} from '../../utils/interfaces';
import SupplierAccountListItem from './SupplierAccountListItem';
import SupplierNameRating from './SupplierNameRating';
import {selectIsClient} from '../../redux/slices/applicationSlice';
import {actions as userAction} from '../../redux/slices/userSlice';
import {RootState} from '../../redux/store';

const SupplierAccountScreen = () => {
  const navigation: any = useNavigation();

  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.logout());
  // const { token, isSupplier } = state;
  const isClient: boolean = useSelector(selectIsClient);
  const notification: boolean = useSelector(
    (state: RootState) => state.application.notification,
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isClient && isFocused) {
      dispatch(userAction.getSupplierDetails());
      dispatch(persistedUserActions.getCanSendOfferAttempt());
    }
  }, [isFocused]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const language = useSelector(
    (state: RootState) => state.application.language,
  ); //don't remove this -> it is for rerender purpose
  const notificationNumber = useSelector(selectNotificationNumber);
  const settingsItem: {title: string; data: ISupplierSettingsOptions[]}[] = [
    {
      title: i18n.t('edit_account'),
      data: [
        {
          id: 0,
          title: i18n.t('edit_profile'),
          icon: 'person',
          notificationNumber,
          callback: () => navigation.navigate(SupplierPathList.EDIT_ACCOUNT),
        },
        {
          id: 1,
          title: i18n.t('change_password'),
          icon: 'lock-closed',
          callback: () => navigation.navigate(SupplierPathList.CHANGE_PASSWORD),
        },
        {
          id: 2,
          title: i18n.t('notifications'),
          icon: 'notification',
          callback: () => {
            dispatch(actions.setNotification(!notification));
          },
          hasSwitch: true,
          disabled: notification,
        },
      ],
    },
    {
      title: i18n.t('general'),
      data: [
        {
          id: 0,
          title: i18n.t('settings'),
          icon: 'settings',
          callback: () => navigation.navigate(SupplierPathList.SETTINGS),
        },
        {
          id: 1,
          title: i18n.t('help'),
          icon: 'help',
          callback: () => navigation.navigate(SupplierPathList.HELP),
        },
      ],
    },
    {
      title: ' ',
      data: [
        {
          id: 0,
          title: i18n.t('logout_button'),
          icon: '',
          callback: onLogout,
          isCentered: true,
        },
      ],
    },
  ];

  const items = [
    {
      icon: 'person',
      text: name,
      value: name,
      setValue: setName,
      right: null,
    },
    {
      icon: 'mail',
      text: email,
      value: email,
      setValue: setEmail,
      right: null,
    },
    {
      icon: 'phone',
      text: phone,
      value: phone,
      setValue: setPhone,
      right: null,
    },
    {
      icon: 'lock',
      text: i18n.t('change_password'),
      value: null,
      setValue: null,
      right: {
        icon: 'chevron_forward',
        callback: () => {
          console.log('something?');
          // navigation.navigate('NewPasswordScreen');
        },
      },
    },
    {
      icon: 'receipt',
      text: i18n.t('billing_details'),
      value: null,
      setValue: null,
      right: {
        icon: 'chevron_forward',
        callback: () => {
          // navigation.navigate('BillingDetailsScreen');
        },
      },
    },
  ];

  return (
    <>
      <CustomStatusBar />
      <View style={MyAccountScreenStyle.container}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'flex-start',
            marginLeft: 15,
            marginBottom: 20,
            marginTop: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 15,
              backgroundColor: '#F0F2F5',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomIcon
              style={{marginLeft: 2}}
              size={Fonts.h6}
              color={Colors.black}
              name="briefcase"
              iconPack='custom'
            />
          </View>
          <SupplierNameRating />
        </View>
        <SectionList
          style={{backgroundColor: Colors.defaultBackground}}
          sections={settingsItem}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => <SupplierAccountListItem data={item} />}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{padding: 12, backgroundColor: Colors.defaultBackground}}>
              <Text style={{color: '#73788B'}}>{title}</Text>
            </View>
          )}
        />
      </View>
      <BottomTabNavigator routeName={SupplierPathList.SUPPLIER_ACCOUNT} />
    </>
  );
};

export default SupplierAccountScreen;
