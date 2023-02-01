import {NavigationProp, ParamListBase} from '@react-navigation/native';
import I18n from 'i18n-js';
import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {prettyDate} from '../../../utils/dateUtils';
import {IBidder, IOrder} from '../../../utils/interfaces';
import UserDetails from './UserDetails';
import {SupplierPathList} from '../../../utils/enums';
import MapView from 'react-native-maps';
import CustomIcon from '../../../atoms/CustomIcon';
import {GOOGLE_MAPS_API_KEY} from '../../../utils/config';
const GoogleStaticMap = require('react-native-google-static-map/GoogleStaticMap');

const {height, width} = Dimensions.get('window');
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
let _mapView: MapView | null = null;
export const OrderDetails = (props: {
  order: IOrder;
  navigation: NavigationProp<ParamListBase>;
  selectedBidder?: IBidder;
  role: string;
  isUserDetailsVisible: boolean;
  isEditableAvailable: boolean;
}) => {
  const {
    navigation,
    isUserDetailsVisible,
    isEditableAvailable,
    order: {
      address,
      deliveryDate,
      concreteType,
      quantity,
      time,
      requestPump,
      coordinates,
      notes,
    },
  } = props;

  const staticMapUrl = () => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=16&size=360x125&format=png&key=${GOOGLE_MAPS_API_KEY}`;
  };
  const staticUrl = staticMapUrl();
  return (
    <View style={OrderScreenLtrStyle.order_details_container}>
      {isUserDetailsVisible && (
        <UserDetails order={props.order} goBack={navigation.goBack} />
      )}
      <View
        style={{
          marginBottom: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={GlobalLtrStyle.pageTitle}>{I18n.t('order_details')}</Text>
        {isEditableAvailable && (
          <CustomIcon
            onPress={() => {
              navigation.navigate(SupplierPathList.EDIT_ORDER);
            }}
            size={Fonts.h5}
            color={Colors.green}
            name="edit"
            iconPack="custom"
          />
        )}
      </View>
      <View
        pointerEvents="none"
        style={{
          height: 125,
          width: '100%',
          marginBottom: 20,
          overflow: 'hidden',
        }}>
        <Image style={{width: '100%', height: 125}} source={{uri: staticUrl}} />
      </View>
      <View style={OrderScreenLtrStyle.order_details_list}>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <CustomIcon
            iconPack="custom"
            size={Fonts.h5}
            color={Colors.black}
            name="location"
          />
          {!!address && (
            <Text style={[GlobalLtrStyle.regularBlackText, {paddingLeft: 10}]}>
              {address.length > 30 ? address.substr(0, 30) + '...' : address}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <CustomIcon
            iconPack="custom"
            size={Fonts.h5}
            color={Colors.black}
            name="calendar"
          />
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={GlobalLtrStyle.regularBlackText}>
              {prettyDate((deliveryDate as string) || '')}
            </Text>
            <Text style={GlobalLtrStyle.regularDarkGreyText}>
              {`${time.start}:00-${time.end}:00`}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <CustomIcon
            iconPack="custom"
            size={Fonts.h5}
            color={Colors.black}
            name="quantity"
          />
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={GlobalLtrStyle.regularBlackText}>
              {I18n.t('concrete_type_' + concreteType)}
            </Text>
            <Text style={GlobalLtrStyle.regularDarkGreyText}>
              {quantity + ' m³'}
            </Text>
          </View>
        </View>
        {!!notes && (
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomIcon
              size={Fonts.h4}
              color={Colors.black}
              iconPack="custom"
              name="notes"
            />
            <Text style={[GlobalLtrStyle.regularBlackText, {paddingLeft: 10}]}>
              {notes}
            </Text>
          </View>
        )}
        <View style={{paddingVertical: 10}}>
          <Text
            style={[GlobalLtrStyle.regularBlackText, {color: Colors.green}]}>
            {requestPump ? I18n.t('with_pump') : I18n.t('without_pump')}
          </Text>
        </View>
      </View>
    </View>
  );
};
