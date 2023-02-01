import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {supplierRouteList} from '../../containers/routes';
import {Colors, Fonts} from '../../themes';
import {ISupplierRoute} from '../../utils/interfaces';
import {
  actions as persistedUserActions,
  selectNotificationNumber,
} from '../../redux/slices/persistedUserSlice';

import i18n from '../../services/i18n';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';

export default function BottomTabNavigator({
  testID,
  routeName,
}: {
  testID?: string;
  routeName: string;
}) {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const notificationNumber = useSelector(selectNotificationNumber);
  let _unsubscribe: any = null;
  useEffect(() => {
    _unsubscribe = navigation.addListener('focus', () => {
      dispatch(persistedUserActions.getCanSendOfferAttempt());
    });
    return () => {
      if (_unsubscribe) {
        _unsubscribe();
      }
    };
  }, []);

  const onNavigate = (item: ISupplierRoute, index: number) => {
    navigation.navigate(item.name);
  };

  const filteredRouteList = supplierRouteList.filter(
    (item: ISupplierRoute) => item.isInBottomBar,
  );

  return (
    <>
      <View
        testID={testID}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 35 : 10,
        }}>
        {filteredRouteList
          .filter(
            (unfilteredItem: ISupplierRoute) =>
              typeof unfilteredItem.icon === 'string',
          )
          .map((item: ISupplierRoute, index: number) => {
            const selected = routeName === item.name;
            return (
              <View
                style={{alignItems: 'center', position: 'relative'}}
                key={item.index}>
                {item.notification && notificationNumber > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      top: -15,
                      right: 0,
                      backgroundColor: Colors.redStrong,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      {notificationNumber}
                    </Text>
                  </View>
                )}
                <CustomIcon
                  color={selected ? Colors.green : Colors.greyBottomBar}
                  name={item.icon || ''}
                  size={Fonts.h5}
                  onPress={() => onNavigate(item, index)}
                  iconPack="custom"
                />
                <Text
                  style={{
                    color: selected ? Colors.green : Colors.greyBottomBar,
                    marginTop: 5,
                  }}>
                  {i18n.t(item?.identifier || '')}
                </Text>
              </View>
            );
          })}
      </View>
    </>
  );
}
