import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import { Colors, Fonts } from '../../themes';
import CustomIcon from '../../atoms/CustomIcon';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import i18n from '../../services/i18n';
import { connect } from 'react-redux';
import { actions } from '../../redux/slices/orderSlice';
import { RootState } from '../../redux/store';
import _ from 'lodash';
import { Location } from '../AppointmentScreen/components/Location';
import { AppointmentDatePicker } from '../AppointmentScreen/components/AppointmentDatePicker';
import { AppointmentTimePicker } from '../AppointmentScreen/components/AppointmentTimePicker';
import {
  convertToUpdateOrder,
  IOrder,
  ITimeInterval,
  OfferData,
  OfferTypeEnum,
} from '../../utils/interfaces';
import { Quantity } from '../AppointmentScreen/components/Quantity';
import { Notes } from '../AppointmentScreen/components/Notes';
import { PumpingService } from '../AppointmentScreen/components/PumpingService';
import { ConcreteType } from '../AppointmentScreen/components/ConcreteType';

import { OrderStatus } from '../../utils/orderUtil';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../../components/CustomStatusBar';
import { SupplierPathList } from '../../utils/enums';

const EditQuantitiesScreen = ({
  navigation,
  ...props
}: IStateProps & { navigation: any }) => {
  const [order, setOrder] = useState<IOrder>(props.order);
  const {
    address,
    deliveryDate,
    time,
    selectedBidder,
    requestPump,
    notes,
    concreteType,
    quantity,
  } = order;

  const updateOrder = (orderUpdated: any) => {
    setOrder({ ...order, ...orderUpdated });
  };

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  let scroll: any = null;
  const content = (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        extraScrollHeight={100}
        innerRef={(ref: any) => {
          scroll = ref;
        }}>
        <View style={{ paddingVertical: 15, paddingLeft: 15 }}>
          <Location
            onPress={() => {
              //TODO add a way to persist modification and don't use orderData
              navigation.navigate(SupplierPathList.SEARCH_ADDRESS);
            }}
            placeholder={i18n.t('location')}
            disabled={!order.isDraft}
            value={address}
          />

          <AppointmentDatePicker
            value={new Date(deliveryDate || '')}
            onChange={date => {
              updateOrder({ deliveryDate: date });
            }}
            disabled={!order.isDraft && order.status === OrderStatus.InDelivery}
          />
          <AppointmentTimePicker
            value={time}
            disableAllDay={true}
            selectedDate={deliveryDate}
            disabled={!order.isDraft && order.status === OrderStatus.InDelivery}
            onChange={(value: ITimeInterval) => {
              updateOrder({ time: value });
            }}
          />
          <ConcreteType
            extraTextStyle={{ color: Colors.greyIrina }}
            value={`${concreteType || ''}`}
            onChange={concreteT => {
              updateOrder({
                concreteType: concreteT,
                selectedBidder: selectedBidder && {
                  ...selectedBidder,
                  offer: {
                    ...(selectedBidder.offer || {}),
                    [OfferTypeEnum.Concrete]: {
                      ...new OfferData(),
                      ...(selectedBidder.offer?.concrete || {}),
                      label: i18n.t(`concrete_type_${concreteType}`),
                    },
                  },
                },
              });
            }}
          />
          <Quantity
            value={`${quantity}`}
            onChange={quantityV => {
              updateOrder({
                quantity: quantityV,
                selectedBidder: selectedBidder && {
                  ...selectedBidder,
                  offer: {
                    ...(selectedBidder.offer || {}),
                    [OfferTypeEnum.Concrete]: {
                      ...new OfferData(),
                      ...(selectedBidder.offer?.concrete || {}),
                      quantity: quantityV,
                    },
                  },
                },
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
            disabled={!order.isDraft}
            value={notes || ''}
            onChange={(text: string) => {
              updateOrder({ notes: text });
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
  return (
    <>
      <CustomStatusBar backgroundColor="black" barStyle="light-content" />
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
              props.updateOrder({
                updatedOrder: convertToUpdateOrder(order),
                navigation,
              });
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
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  setOrderData: actions.setOrderData,
  setOffer: actions.setOffer,
  updateOrder: actions.updateOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuantitiesScreen);
