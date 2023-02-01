import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import styles from './styles';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import CustomIcon from '../../atoms/CustomIcon';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { actions } from '../../redux/slices/orderSlice';
import { IOrder, ITimeInterval } from '../../utils/interfaces';
import { AppointmentDatePicker } from './components/AppointmentDatePicker';
import { Location } from './components/Location';
import { AppointmentTimePicker } from './components/AppointmentTimePicker';
import { ConcreteType } from './components/ConcreteType';
import { Quantity } from './components/Quantity';
import { PumpingService } from './components/PumpingService';
import { Notes } from './components/Notes';
import { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../../components/CustomStatusBar';
import LoadingSpinner from '../../modals/LoadingSpinner';
import { SupplierPathList } from '../../utils/enums';

const AppointmentDraftScreen = ({
  navigation,
  ...props
}: IStateProps & { navigation: any }) => {
  const [order, setOrder] = useState<IOrder>(props.order);
  const {
    address,
    deliveryDate,
    time,
    requestPump,
    notes,
    concreteType,
    fullName,
    phone,
    quantity,
  } = order;
  const dispatch = useDispatch();
  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  const updateOrder = (orderUpdated: any) => {
    setOrder({ ...order, ...orderUpdated });
  };

  let scroll: any = null;
  const content = (
    <KeyboardAwareScrollView
      keyboardOpeningTime={0}
      extraScrollHeight={100}
      innerRef={(ref: any) => {
        scroll = ref;
      }}>
      <View style={{ paddingVertical: 15, paddingLeft: 15 }}>
        <View style={styles.inputItem}>
          <View style={styles.inputItemLeft}>
            <CustomIcon
              size={Fonts.h5}
              color={Colors.black}
              name={'person-outline'}
            />
          </View>
          <View style={styles.inputItemRight}>
            <TextInput
              style={[
                GlobalLtrStyle.regularBlackText,
                { width: '100%', padding: 0 },
              ]}
              placeholder={i18n.t('name')}
              placeholderTextColor={Colors.greyIrina}
              value={fullName}
              keyboardType={'default'}
              returnKeyType={'done'}
              onChangeText={text => updateOrder({ fullName: text })}
            />
          </View>
        </View>

        <View style={styles.inputItem}>
          <View style={styles.inputItemLeft}>
            <CustomIcon
              // style={{ marginRight: 15 }}
              size={Fonts.h5}
              color={Colors.black}
              name={'call-outline'}
            />
          </View>
          <View style={styles.inputItemRight}>
            <TextInput
              style={[
                GlobalLtrStyle.regularBlackText,
                { width: '100%', padding: 0 },
              ]}
              placeholder={i18n.t('phone_number')}
              placeholderTextColor={Colors.greyIrina}
              value={phone}
              keyboardType={'phone-pad'}
              returnKeyType={'done'}
              onChangeText={text => updateOrder({ phone: text })}
            />
          </View>
        </View>

        <Location
          disabled={false}
          placeholder={i18n.t('location')}
          onPress={() => {
            dispatch(actions.setOrderData(order));
            navigation.navigate(SupplierPathList.SEARCH_ADDRESS);
          }}
          value={address}
        />

        <AppointmentDatePicker
          value={new Date(deliveryDate || '')}
          onChange={date => {
            updateOrder({ deliveryDate: date });
          }}
        />
        <AppointmentTimePicker
          value={time}
          selectedDate={deliveryDate}
          disableAllDay={true}
          onChange={(value: ITimeInterval) => {
            updateOrder({ time: value });
          }}
        />
        <ConcreteType
          extraTextStyle={{ color: Colors.greyIrina }}
          value={`${concreteType}` || ''}
          onChange={concreteT => {
            updateOrder({ concreteType: concreteT });
          }}
        />
        <Quantity
          value={quantity as string}
          onChange={quantityV => {
            updateOrder({
              quantity: quantityV,
            });
          }}
        />
        <PumpingService
          value={!!requestPump}
          onChange={v => {
            updateOrder({ requestPump: v });
          }}
        />
        <Notes
          value={notes || ''}
          onChange={(text: string) => {
            updateOrder({ notes: text });
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );

  return (
    <>
      <CustomStatusBar backgroundColor="black" barStyle="light-content" />
      <LoadingSpinner visible={props.isLoading} textContent={''} />
      <HeaderBar
        placement="center"
        leftComponent={
          <CustomIcon
            size={Fonts.h2}
            color={Colors.black}
            name="close"
            iconPack="custom"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <Text style={[OrderScreenLtrStyle.title_text]}>
            {i18n.t('delivery_details')}
          </Text>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              props.createOrder({ order, navigation });
            }}>
            <Text
              style={[OrderScreenLtrStyle.title_text, { color: Colors.green }]}>
              {i18n.t('save')}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1 }}>{content}</View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  order: state.order.orderData,
  isLoading: state.order.isLoading,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  setOrderData: actions.setOrderData,
  setOffer: actions.setOffer,
  createOrder: actions.createOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentDraftScreen);
