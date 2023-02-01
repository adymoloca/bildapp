// @ts-ignore
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {AgendaItemStyle} from './styles';
import {HOUR_HEIGHT, ITEM_WIDTH, START_HOUR} from './AgendaOverlay';
import {request} from 'react-native-permissions';
import {Colors} from '../../../themes';
import I18n from 'i18n-js';
import {ICalendarOrder} from '../../../utils/interfaces';
import {OrderStatus} from '../../../utils/orderUtil';

const AgendaItem: React.FC<AgendaItemProps> = ({
  setDraggedItem,
  navigate,
  item,
  left,
  draggedItem,
}) => {
  const itemHeight = (item.time.end - item.time.start) * HOUR_HEIGHT - 5;
  const itemWidth = ITEM_WIDTH;
  const itemTop =
    ((draggedItem ? draggedItem.currentHour : item.time.start) - START_HOUR) *
      HOUR_HEIGHT +
    20;

  let itemStatus = item.status;

  const itemStyles: {[data: string]: any} = {
    [OrderStatus.InDelivery]: {
      backgroundColor: Colors.greenPale,
      color: Colors.greenStrong,
      text: I18n.t('in_delivery'),
    },
    [OrderStatus.Scheduled]: {
      backgroundColor: Colors.orangePale,
      color: Colors.orangeStrong,
      text: I18n.t('offer_scheduled'),
    },
    [OrderStatus.Completed]: {
      backgroundColor: Colors.greyPale,
      color: Colors.greyStrong,
      text: I18n.t('offer_finished'),
    },
    [OrderStatus.Canceled]: {
      backgroundColor: Colors.redPale,
      color: Colors.redStrong,
      text: I18n.t('canceled'),
    },
  };

  const openOrder = () => {
    navigate(item);
  };

  const pressIn = () => {
    setDraggedItem({...item, currentHour: item.time.start});
  };

  const pressOut = () => {
    //console.log('press out');
    //setDraggedItem(undefined);
  };

  const getFullName = () => {
    const fullName = item.fullName;
    if (fullName && fullName.length > 12 && itemHeight < HOUR_HEIGHT) {
      return fullName.substring(0, 9) + '...';
    } else {
      return fullName;
    }
  };

  const touchDistance: number = Dimensions.get('screen').height;

  return (
    <TouchableOpacity
      style={[
        AgendaItemStyle.root,
        {top: itemTop, left: left, height: itemHeight, width: itemWidth},
        {backgroundColor: itemStyles[itemStatus].backgroundColor},
        {
          padding: 5,
          borderLeftColor: itemStyles[itemStatus].color,
          borderLeftWidth: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          zIndex: draggedItem ? 100 : 1,
        },
      ]}
      onPress={openOrder}
      onLongPress={pressIn}
      onPressOut={pressOut}
      disabled={[OrderStatus.Completed, OrderStatus.Canceled].includes(
        item.status,
      )}
      pressRetentionOffset={{
        bottom: touchDistance,
        left: touchDistance,
        top: touchDistance,
        right: touchDistance,
      }}>
      <View>
        <Text
          style={[
            AgendaItemStyle.title,
            {
              color: itemStyles[itemStatus].color,
            },
          ]}>
          {getFullName()}
        </Text>
        <Text
          style={[
            AgendaItemStyle.title,
            {
              color: Colors.greyStrong,
            },
          ]}>
          {`${I18n.t('concrete_type_' + item.concreteType)} ${
            item.quantity
          } m³`}
        </Text>
      </View>

      <Text
        style={[
          AgendaItemStyle.description,
          {color: itemStyles[itemStatus].color},
        ]}>
        {itemStyles[itemStatus].text}
      </Text>
    </TouchableOpacity>
  );
};

export default AgendaItem;

interface AgendaItemProps {
  setDraggedItem: (item: ICalendarOrder) => void;
  navigate: any;
  item: ICalendarOrder;
  left: number;
  draggedItem?: ICalendarOrder;
}
