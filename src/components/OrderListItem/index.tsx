import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';
import {SupplierPathList} from '../../utils/enums';
import CustomIcon from '../../atoms/CustomIcon';
import {setOrderData} from '../../redux/slices/orderSlice';
import {useDispatch} from 'react-redux';
import {IOrder} from '../../utils/interfaces';
import {getOrderStatus, OrderStatus} from '../../utils/orderUtil';
import {prettyDate} from '../../utils/dateUtils';

const OrderListItem = ({order, navigate}: {order: IOrder; navigate: any}) => {
  const dispatch = useDispatch();
  const onSetOrderDetails = (data: IOrder) => dispatch(setOrderData(data));

  const onNavigate = () => {
    // const path = SupplierPathList.ORDER_LIST;
    // navigation.navigate(, { request });
    // console.warn(request);
    // const dispatch = useAppDispatch();
    // const openNavModal = () => dispatch();
    onSetOrderDetails(order);
    navigate();
  };

  const getRequestStatus = () => {
    const status = order.status;

    if (status === OrderStatus.Canceled) {
      return {
        color: Colors.red,
        text: order.canceledByCustomer
          ? i18n.t('canceled_client')
          : i18n.t('canceled_supplier'),
        iconName: 'canceled',
        iconPack: 'custom',
      };
    } else if (status === OrderStatus.New) {
      return {
        color: Colors.green,
        text: i18n.t('being_auctioned'),
        iconName: 'reload',
        iconPack: 'custom',
      };
    } else if (status === OrderStatus.Completed) {
      return {
        color: Colors.blackOpacity2,
        text: i18n.t('completed'),
        iconName: 'completed',
        iconPack: 'custom',
      };
    } else if (status === OrderStatus.InDelivery) {
      return {
        color: Colors.blue,
        text: i18n.t('in_delivery'),
        iconName: 'navigation-outline',
        iconPack: 'custom',
      };
    } else if (status === OrderStatus.Scheduled) {
      return {
        color: Colors.lightOrange2,
        text: i18n.t('being_prepared'),
        iconName: 'calendar-outline',
        iconPack: 'custom',
      };
    } else {
      return {
        color: Colors.green,
        text: i18n.t('being_auctioned'),
        iconName: 'reload',
        iconPack: 'custom',
      };
    }
  };

  const requestStatus = getRequestStatus();

  return (
    <TouchableOpacity
      style={RequestListScreenLtrStyle.list_item}
      onPress={onNavigate}>
      <View style={{flex: 1}}>
        <Text style={RequestListScreenLtrStyle.list_item_date_time}>
          {order.address?.length > 34
            ? order.address?.substr(0, 34) + '...'
            : order.address}
        </Text>
        <View style={RequestListScreenLtrStyle.list_item_details}>
          <View style={RequestListScreenLtrStyle.list_item_address}>
            <Text style={RequestListScreenLtrStyle.list_item_address_value}>
              {`${prettyDate(order.deliveryDate as string)}, ${
                order.quantity
              } m³`}
            </Text>
          </View>
        </View>
        <View style={RequestListScreenLtrStyle.title_contents}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomIcon
              size={Fonts.h6}
              color={requestStatus.color}
              iconPack={requestStatus.iconPack}
              name={requestStatus.iconName}
            />

            <Text style={[{marginLeft: 5}, GlobalLtrStyle.regularBlackText]}>
              {requestStatus.text}
            </Text>
          </View>
          {order.selectedBidder === null &&
            order.bidders &&
            order.bidders?.length > 0 && (
              <View style={RequestListScreenLtrStyle.offers_count}>
                <Text style={{color: Colors.white, fontSize: Fonts.medium}}>
                  {order.bidders?.length + ' ' + i18n.t('offers')}
                </Text>
              </View>
            )}

          {!!order.bidedOffer && order.selectedBidder === null && (
            <View style={RequestListScreenLtrStyle.offers_count}>
              <Text style={{color: Colors.white, fontSize: Fonts.medium}}>
                {i18n.t('offer_sent')}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
        <CustomIcon
          size={Fonts.iconMap}
          iconPack={'custom'}
          name={'chevron-right'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrderListItem;
