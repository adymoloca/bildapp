import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import PaymentScreenLtrStyle from '../../themes/styles/paymentScreen.ltr.style';
import SupplierOfferScreenStyle from '../../themes/styles/supplierOfferScreen.ltr.style';

const EditPayment = ({
  visible,
  onClose,
  items,
  selectItem,
  selectedItem,
  addNewCard,
}: any): JSX.Element => {
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
              style={[GlobalLtrStyle.regularBlackText, { fontWeight: 'bold' }]}>
              {i18n.t('choose_payment_method')}
            </Text>
          </View>
          {items.length > 0 &&
            items.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => {
                    selectItem(index);
                    onClose();
                  }}
                  style={{
                    padding: 20,
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors.grey,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={MyAccountScreenStyle.generalFieldView}>
                    {item.brand === 'visa' ? (
                      <Image
                        style={{ width: Fonts.h4, height: Fonts.h4 }}
                        source={require('../../assets/images/visa_icon.png')}
                      />
                    ) : item.brand === 'mastercard' ? (
                      <Image
                        style={{ width: Fonts.h4, height: Fonts.h4 }}
                        source={require('../../assets/images/mastercard_icon.png')}
                      />
                    ) : (
                      <CustomIcon
                        size={Fonts.h5}
                        color={Colors.black}
                        name="wallet"
                      />
                    )}
                    <Text style={PaymentScreenLtrStyle.cardText}>
                      {item.brand === 'cash'
                        ? 'Cash'
                        : item.last4}
                    </Text>
                  </View>
                  {item.id === selectedItem.id && (
                    <CustomIcon
                      size={Fonts.h5}
                      color={Colors.green}
                      name={'checkmark'}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
        </View>
        <TouchableOpacity
          style={[SupplierOfferScreenStyle.actionSheetBottomButton, {marginBottom: 30}]}
          onPress={addNewCard}>
          <View style={MyAccountScreenStyle.generalFieldView}>
            <CustomIcon size={Fonts.h5} color={Colors.black} name="add" />
            <Text
              style={[PaymentScreenLtrStyle.cardText, { fontWeight: 'bold' }]}>
              {i18n.t('add_new_card')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditPayment;
