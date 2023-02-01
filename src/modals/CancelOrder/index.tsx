import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import SupplierOfferScreenStyle from '../../themes/styles/supplierOfferScreen.ltr.style';

const CancelOrder = ({ visible, onClose, cancelOrder }: any): JSX.Element => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          flexDirection: 'column',
          alignContent: 'flex-end',
        }}>
        <TouchableOpacity onPress={onClose} style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            margin: 10,
          }}>
          <View
            style={{
              padding: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.grey,
              alignItems: 'center',
            }}>
            <Text
              style={[
                GlobalLtrStyle.regularBlackText,
                { textAlign: 'center' },
              ]}>
              {i18n.t('cancel_order_msg')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={cancelOrder}
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: Fonts.regular,
                color: Colors.red,
              }}>
              {i18n.t('yes')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            SupplierOfferScreenStyle.actionSheetBottomButton,
            { alignItems: 'center' },
          ]}
          onPress={onClose}>
          <Text style={GlobalLtrStyle.regularBlackText}>
            {i18n.t('cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CancelOrder;
