import React from 'react';
import { Text, View } from 'react-native';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';

const RenderStatus = ({ type, request }: any) => {
  const status_text: string =
    request.currentBids === null
      ? i18n.t('new_order')
      : request.selectedBidder === null && request.currentBids
        ? i18n.t('offer_sent')
        : request.delivered
          ? i18n.t('offer_finished')
          : i18n.t('offer_scheduled');

  const itemColor: (t: number) => string = (t) => {
    if (t === 1) return Colors.green;
    if (t === 2) return Colors.yellow;
    if (t === 3) return Colors.black;
    return Colors.blackOpacity;
  };

  return (
    <View
      style={{
        backgroundColor: itemColor(type),
        borderRadius: 60,
        marginBottom: 10,
        marginLeft: 15,
        marginTop: 3,
        width: Fonts.small * 10,
        height: Fonts.small * 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.54,
        shadowRadius: 6.77,
        elevation: 5,
      }}>
      <Text
        style={{
          color: type < 3 ? Colors.black : Colors.white,
          fontSize: Fonts.small,
          fontWeight: 'bold',
        }}>
        {status_text.toUpperCase()}
      </Text>
    </View>
  );
};

export default RenderStatus;
