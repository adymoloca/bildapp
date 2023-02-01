import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import HeaderBar from '../../components/HeaderBar';
import { actions } from '../../redux/slices/applicationSlice';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import loginPageStyle from '../../themes/styles/auth.ltr.style';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import PaymentScreenLtrStyle from '../../themes/styles/paymentScreen.ltr.style';
import { ICard, IServerResponse } from '../../utils/interfaces';
import { CardForm, CardFormView, useStripe } from '@stripe/stripe-react-native'; 
import { Screen } from 'react-native-screens';
import { call, put, select, takeLatest } from "redux-saga/effects";

import {createStripeCustomer} from '../../services/api'
import { AxiosResponse } from 'axios';

const AddCardScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // const fetchStripeCustomer = async () => {
  //   return await createStripeCustomer().then(res => {
  //     return res.data.data;
  //   }).catch(error => {
  //     console.log(error)
  //   });
  // }
  
  // const fetchPaymentSheetParams = async () => {
  //   const res = await fetchStripeCustomer()
  //   console.log(res)
  //   return {
  //     setupIntent: res.setupIntent,
  //     ephemeralKey: res.ephemeralKey,
  //     customer: res.customer,
  //   };
  // };

  // const initializePaymentSheet = async () => {
  //   console.log("INIT PAYMENT SHEET")
  //   const {
  //     setupIntent,
  //     ephemeralKey,
  //     customer,
  //   } = await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     setupIntentClientSecret: setupIntent,
  //     // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
  //     //methods that complete payment after a delay, like SEPA Debit and Sofort.
  //     allowsDelayedPaymentMethods: true,
  //   });
  //   if (!error) {
  //     console.log(error)
  //     setLoading(true);
  //   }
  // };

  const fetchPaymentSheetParams = async () => {
    let res=  await createStripeCustomer().then(res => {
      return res.data.data;
    }).catch(error => {
      console.log(error)
    });

    return {
      setupIntent: res.setupIntent,
      ephemeralKey: res.ephemeralKey,
      customer: res.customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      setupIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    let { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      console.log(error)
    }
    await presentPaymentSheet();
    return {error};
  };

  const openPaymentSheet = async () => {
    const {error} = await initializePaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <Screen>
      <Button
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </Screen>
  );
}

export default AddCardScreen;

