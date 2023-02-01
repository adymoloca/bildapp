import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import HeaderBar from '../../components/HeaderBar';
import {
  actions,
  selectCardList,
  selectSelectedCard,
} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import PaymentScreenLtrStyle from '../../themes/styles/paymentScreen.ltr.style';
import {ICard} from '../../utils/interfaces';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {createStripeCustomer} from '../../services/api';
import CustomStatusBar from '../../components/CustomStatusBar';
import { Swipeable } from 'react-native-gesture-handler';
import { RightActions } from './RightActions';

const MyCardsScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [publishableKey, setPublishableKey] = useState('');
  const [setupIntentId, setSetupIntentId] = useState('');

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const cardList: ICard[] = useSelector(selectCardList);

  let row: Array<any> = [];

  const onRemoveCard = (index: number) =>
    dispatch(actions.removeCardFromListAttempt(cardList[index]));

  const onSelectCard = (index: number) => {
    dispatch(actions.setDefaultCardAttempt(cardList[index]));
  };

  const removeCard = (index: number) => {
    let removedCard = cardList[index];
    if(removedCard.isDefault === true) {
      let newDefaultCard = cardList.find(x => x.id === "cash")
      dispatch(actions.setDefaultCardAttempt(newDefaultCard))
    }
    onRemoveCard(index);
  };

  useEffect(() => {
    dispatch(actions.getCardList());
    initializePaymentSheet();
  }, []);

  const fetchPaymentSheetParams = async () => {
    let res = await createStripeCustomer()
      .then(res => {
        return res.data.data;
      })
      .catch(error => {
        console.error(error);
      });
    setPublishableKey(res.publishableKey);
    setSetupIntentId(res.setupIntentId)
    return {
      setupIntent: res.setupIntent,
      ephemeralKey: res.ephemeralKey,
      customer: res.customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {setupIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    let {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if(error){
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
    return {error};
  };

  const openPaymentSheet = async () => {
    const {error, paymentOption} = await presentPaymentSheet();
    if (error) {
      initializePaymentSheet()
    } else {
      dispatch(actions.setDefaultCardBySetupIntentAttempt(setupIntentId))
    }
  };
  
  return (
    <>
      <CustomStatusBar />
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{backgroundColor: Colors.white}}>
          <HeaderBar
            placement="center"
            leftComponent={
              <CustomIcon
                size={Fonts.h5}
                color={Colors.black}
                name="arrow-back"
                iconPack="custom"
                onPress={navigation.goBack}
              />
            }
            centerComponent={null}
            rightComponent={null}
            noBorder={true}
          />
          <View style={{margin: 15}}>
            <View
              style={{
                alignContent: 'flex-start',
                marginBottom: 15,
                marginTop: 15,
              }}>
              <Text style={GlobalLtrStyle.pageTitle}>
                {i18n.t('payment_method')}
              </Text>
            </View>
            {cardList.length > 0 &&
              cardList.map((card: any, index: number) => {
                return (
                  <Swipeable
                    key={index + 1}
                    ref={ref => row[index] = ref}
                    friction={2}
                    leftThreshold={30}
                    rightThreshold={40}
                    renderRightActions={(progress, dragX) => (
                        card.brand !== 'cash' &&
                        <RightActions progress={progress} dragX={dragX} onPress={() => {
                          removeCard(index)
                        }}/>
                      )}
                    containerStyle={{backgroundColor: Colors.white}}
                  >
                  <TouchableOpacity
                    style={[
                      MyAccountScreenStyle.generalFieldContainer,
                      {paddingHorizontal: 0, backgroundColor: Colors.white},
                    ]}
                    key={index + 1}
                    onPress={() => onSelectCard(index)}>
                    <View
                      style={[
                        MyAccountScreenStyle.generalFieldView,
                        {marginLeft: 0},
                      ]}>
                      {card.brand === 'visa' ? (
                        <Image
                          style={{width: Fonts.h4, height: Fonts.h4}}
                          source={require('../../assets/images/visa_icon.png')}
                        />
                      ) : card.brand === 'mastercard' ? (
                        <Image
                          style={{width: Fonts.h4, height: Fonts.h4}}
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
                        {card.brand === 'cash'
                          ? 'Cash'
                          : '**** **** **** ' +
                            card.last4 +
                            '   ' +
                            card.exp_month +
                            '/' +
                            card.exp_year}
                      </Text>
                    </View>
                    {card.isDefault === true && (
                      <CustomIcon
                        size={Fonts.h5}
                        color={Colors.green}
                        name={'checkmark'}
                      />
                    )}
                  </TouchableOpacity>
                  </Swipeable>
                );
              })}
            <TouchableOpacity
              style={PaymentScreenLtrStyle.addCard}
              onPress={openPaymentSheet}>
              <CustomIcon size={Fonts.h5} color={Colors.black} name="add" />
              <Text
                style={[
                  PaymentScreenLtrStyle.cardText,
                  {fontSize: Fonts.medium, fontWeight: 'bold'},
                ]}>
                {i18n.t('add_card')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </StripeProvider>
    </>
  );
};

export default MyCardsScreen;

