import {useIsFocused} from '@react-navigation/native';
import I18n from 'i18n-js';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomIcon from '../../../atoms/CustomIcon';
import EditPayment from '../../../modals/EditPayment';
import {selectCardList} from '../../../redux/slices/persistedUserSlice';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {ICard} from '../../../utils/interfaces';

export const PaymentMethod = (props: any) => {
  const {selectedBidder, paymentMethodId, onChange} = props;
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<ICard>({
    id: 'cash',
    brand: 'cash',
  });
  const cards: ICard[] = useSelector(selectCardList);
  const selectCard = (index: number) => {
    setSelectedPaymentMethod(cards[index]);
    onChange(cards[index]);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let card = cards.filter(x => {
        if (paymentMethodId) {
          return x.id === paymentMethodId;
        }
        return x.isDefault === true;
      })[0];
      if (
        card == undefined &&
        paymentMethodId &&
        paymentMethodId.startsWith('pm_')
      ) {
        card = {
          id: paymentMethodId,
          brand: 'card(deleted)',
        };
      } else if (card == undefined) {
        card = {
          id: 'cash',
          brand: 'cash',
        };
      }
      setSelectedPaymentMethod(card);
    }
  }, [isFocused]);

  return (
    <>
      <View
        style={[OrderScreenLtrStyle.order_details_container, {paddingTop: 30}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalLtrStyle.pageTitle}>
            {I18n.t('payment_method')}
          </Text>
          {selectedBidder === null && (
            <CustomIcon
              onPress={() => {
                setPaymentVisible(true);
              }}
              size={Fonts.h5}
              color={Colors.green}
              name="edit"
              iconPack="custom"
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            alignItems: 'center',
          }}>
          {selectedPaymentMethod.brand === 'visa' ? (
            <Image
              style={{width: Fonts.h4, height: Fonts.h4}}
              source={require('../../../assets/images/visa_icon.png')}
            />
          ) : selectedPaymentMethod.brand === 'mastercard' ? (
            <Image
              style={{width: Fonts.h4, height: Fonts.h4}}
              source={require('../../../assets/images/mastercard_icon.png')}
            />
          ) : (
            <CustomIcon
              iconPack="custom"
              size={Fonts.h5}
              color={Colors.black}
              name="cash"
            />
          )}
          <Text style={[GlobalLtrStyle.regularBlackText, {marginLeft: 20}]}>
            {selectedPaymentMethod.brand === 'cash'
              ? 'Cash'
              : selectedPaymentMethod.brand === 'card(deleted)'
              ? 'Card'
              : '**** **** **** ' +
                selectedPaymentMethod.last4 +
                '   ' +
                selectedPaymentMethod.exp_month +
                '/' +
                selectedPaymentMethod.exp_year}
          </Text>
        </View>
      </View>
      <EditPayment
        visible={paymentVisible}
        onClose={() => {
          setPaymentVisible(false);
        }}
        items={cards}
        selectItem={selectCard}
        selectedItem={selectedPaymentMethod}
        addNewCard={() => {
          setPaymentVisible(false);
          // navigation.navigate('AddCardScreen');
        }}
      />
    </>
  );
};
