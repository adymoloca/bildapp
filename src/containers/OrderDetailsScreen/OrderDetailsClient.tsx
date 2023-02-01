import I18n from 'i18n-js';
import * as React from 'react';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import {Colors, Fonts} from '../../themes';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';

import ConfirmationModal from './components/ConfirmationModal';
import {PaymentMethod} from './components/PaymentMethod';
import {OrderOffer} from './components/OrderOffer';
import {OrderDetails} from './components/OrderDetails';
import {
  ConfirmationTypeEnum,
  IBidder,
  ICard,
  ITimeInterval,
  Order,
} from '../../utils/interfaces';
import {actions} from '../../redux/slices/orderSlice';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import {getOrderStatus, OrderStatus} from '../../utils/orderUtil';
import SuccessModal from '../../modals/SuccessModal.tsx';
import {
  selectClientCompanyDetails,
  selectSelectedCard,
} from '../../redux/slices/persistedUserSlice';
import CustomStatusBar from '../../components/CustomStatusBar';
// import LoadingSpinner from '../../modals/LoadingSpinner';
import BillingDetails from './components/BillingDetails';
import {ClientPathList} from '../../utils/enums';
import CustomIcon from '../../atoms/CustomIcon';

const OrderDetailsClient = (
  props: PropsFromRedux & {
    navigation: NavigationProp<ParamListBase>;
  },
) => {
  const {navigation, order, role, setOrderData} = props;
  const defaultPaymentMethod = useSelector(selectSelectedCard);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<ICard>(defaultPaymentMethod);
  const isFocused = useIsFocused();
  const clientCompanyDetails = useSelector(selectClientCompanyDetails);

  const changePaymentMethod = (card: ICard) => {
    setSelectedPaymentMethod(card);
    if (order.orderId && card.id) {
      props.updateOrderPaymentMethod({
        orderId: order.orderId,
        paymentMethodId: card.id,
      });
    }
  };

  const confirmOffer = (bidder: IBidder, timeInterval?: ITimeInterval) => {
    props.confirmOffer({
      bidder,
      time: timeInterval ? timeInterval : order.time,
      orderId: order.orderId || '',
      paymentMethodId: selectedPaymentMethod?.id || 'cash',
    });
  };

  const cancelOffer = (bidder: IBidder) => {
    props.cancelOffer({
      orderId: order.orderId || '',
      supplierEmail: bidder.email,
    });
  };
  const cancelOrder = () => {
    const {orderId} = order;
    if (!orderId) return null;
    setConfirmationVisible(false);
    props.cancelOrder({orderId, navigation});
    setOrderData(new Order());
  };

  const deleteOrder = () => {
    const {orderId} = order;
    if (!orderId) return null;
    setConfirmationVisible(false);
    props.deleteOrder({orderId, navigation});
    setOrderData(new Order());
  };

  const onPressInvoiceDetails = () => {
    navigation.navigate(ClientPathList.INVOICE_DETAILS);
  };

  const getActionData = () => {
    const buttonData = {
      title: I18n.t('cancel'),
      confirmAction: cancelOrder,
      action: () => setConfirmationVisible(true),
      type: ConfirmationTypeEnum.CANCEL_ORDER,
    };
    const orderStatus: OrderStatus = getOrderStatus(order);

    if (
      orderStatus === OrderStatus.InDelivery ||
      orderStatus === OrderStatus.Completed ||
      orderStatus === OrderStatus.Canceled
    ) {
      return null;
    } else if (orderStatus === OrderStatus.Scheduled) {
      return buttonData;
    } else {
      return {
        title: I18n.t('delete'),
        confirmAction: deleteOrder,
        action: () => setConfirmationVisible(true),
        type: ConfirmationTypeEnum.DELETE_ORDER,
      };
    }
  };
  const actionData = getActionData();
  return (
    <View style={RequestListScreenLtrStyle.container}>
      <CustomStatusBar />
      {/* <LoadingSpinner visible={props.isLoading} textContent={''} />  */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar
          placement="center"
          leftComponent={
            <CustomIcon
              size={Fonts.h5}
              color={Colors.black}
              name="arrow-back"
              iconPack="custom"
              onPress={() => {
                navigation.goBack();
                setOrderData(new Order());
              }}
            />
          }
          centerComponent={null}
          rightComponent={
            actionData && (
              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                onPress={actionData.action}>
                <Text
                  style={{
                    fontSize: Fonts.regular,
                    color: Colors.red,
                    marginRight: 5,
                  }}>
                  {actionData.title}
                </Text>
              </TouchableOpacity>
            )
          }
          noBorder={true}
        />
        <View>
          <OrderDetails
            navigation={navigation}
            order={order}
            role={role}
            isEditableAvailable={false}
            isUserDetailsVisible={!!order.selectedBidder}
            selectedBidder={order.selectedBidder}
          />
          {clientCompanyDetails && (
            <BillingDetails
              onPress={onPressInvoiceDetails}
              companyDetails={clientCompanyDetails}
            />
          )}
          <PaymentMethod
            selectedBidder={order.selectedBidder}
            paymentMethodId={order.paymentMethodId}
            onChange={changePaymentMethod}
          />
          <OrderOffer
            selectedBidder={order.selectedBidder}
            onAccept={confirmOffer}
            onRefuse={cancelOffer}
            offerList={order.bidders || []}
          />
        </View>
      </ScrollView>
      {actionData && (
        <ConfirmationModal
          isVisible={confirmationVisible}
          onClose={() => {
            setConfirmationVisible(false);
          }}
          onConfirm={() => {
            actionData.confirmAction();
          }}
          type={actionData.type}
        />
      )}
      <SuccessModal />
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  order: state.order.orderData,
  role: state.application.role,
  isLoading: state.order.isLoading,
});

const mapDispatchToProps = {
  confirmOffer: actions.confirmOffer,
  cancelOrder: actions.cancelOrder,
  deleteOrder: actions.deleteOrder,
  cancelOffer: actions.cancelOffer,
  setOrderData: actions.setOrderData,
  updateOrderPaymentMethod: actions.updateOrderPaymentMethod,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(OrderDetailsClient);
