import I18n from 'i18n-js';
import * as React from 'react';
import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import {Colors, Fonts} from '../../themes';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';

import ConfirmationModal from './components/ConfirmationModal';

import {OrderDetails} from './components/OrderDetails';
import {
  ConfirmationTypeEnum,
  convertToUpdateOrder,
  IOffer,
  IOfferData,
  IOfferFieldsError,
  IOrder,
  Offer,
  OfferData,
  OfferTypeEnum,
} from '../../utils/interfaces';
import {
  actions,
  selectError,
  selectIsError,
} from '../../redux/slices/orderSlice';
import {
  actions as persistedUserActions,
  selectHasAddress,
  selectHasInvoiceDetails,
  selectHasRepresentativeDetails,
} from '../../redux/slices/persistedUserSlice';
import {connect, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AvailableHours from './components/AvailableHours';
import OfferPrice from './components/OfferPrice';
import BillingDetails from './components/BillingDetails';
import {Button} from 'react-native-elements';
import i18n from '../../services/i18n';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {FilterItem, getOrderStatus, OrderStatus} from '../../utils/orderUtil';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import _, {isArray} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from '../../modals/SuccessModal.tsx';
import {SupplierPathList} from '../../utils/enums';
import CustomStatusBar from '../../components/CustomStatusBar';
// import LoadingSpinner from '../../modals/LoadingSpinner';
import CustomIcon from '../../atoms/CustomIcon';

interface IButtonData {
  action: () => void;
  confirmAction: () => void;
  isButton: boolean;
  title: string;
  confirmationType?: ConfirmationTypeEnum;
  disabled: boolean;
  style?: any;
}
const OrderDetailsSupplier = (
  props: IStateProps & {
    navigation: NavigationProp<ParamListBase>;
  },
) => {
  const {setOffer, offer, setFillYourDataModal, fillYourDataModal} = props;
  const {navigation, order, role} = props;
  const [keepEditingPrice, setKeepEditingPrice] = useState({
    // this is used for the newItems to still be edited after update
    [OfferTypeEnum.Concrete]: false,
    [OfferTypeEnum.Pumping]: false,
    [OfferTypeEnum.Transport]: false,
  });
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const hasAddress = useSelector(selectHasAddress);
  const hasInvoiceDetails = useSelector(selectHasInvoiceDetails);
  const hasRepresentativeDetails = useSelector(selectHasRepresentativeDetails);

  const [errors, setErrors] = useState<IOfferFieldsError>({
    [OfferTypeEnum.Concrete]: false,
    [OfferTypeEnum.Pumping]: false,
    [OfferTypeEnum.Transport]: false,
    availableHours: false,
  });

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] =
    useState(false);
  const [isFocused, setIsFocused] = useState(false);
  let _unsubscribe: any = null;
  let _unsubscribeBlur: any = null;
  const orderStatus: OrderStatus = getOrderStatus(order);
  const dispatch = useDispatch();

  const inputRefs: {
    [OfferTypeEnum.Concrete]?: TextInput;
    [OfferTypeEnum.Pumping]?: TextInput;
    [OfferTypeEnum.Transport]?: TextInput;
  } = {};

  const setRefs = (type: OfferTypeEnum, node: TextInput) => {
    inputRefs[type] = node;
  };

  const setDefaultValuesOffer = () => {
    if (
      order.selectedBidder?.offer &&
      [OrderStatus.Scheduled, OrderStatus.InDelivery].includes(order.status)
    ) {
      const newOffer = _.clone({
        ...new Offer(),
        ...order.selectedBidder?.offer,
      });
      if (newOffer.concrete) {
        newOffer.concrete = {
          ...newOffer.concrete,
          isNew: order.isDraft || !newOffer.concrete?.price,
        };
      }
      if (newOffer.pumping) {
        newOffer.pumping = {
          ...newOffer.pumping,
          isNew: order.isDraft || !newOffer.pumping?.price,
        };
      }
      if (newOffer.transport) {
        newOffer.transport = {
          ...newOffer.transport,
          isNew: order.isDraft || !newOffer.transport?.price,
        };
      }
      setOffer(newOffer);
    } else if (!order.bidedOffer) {
      const newOffer = {
        ...new Offer(),
        ...offer,
        concrete: {
          ...new Offer().concrete,
          label: i18n.t(`concrete_type_${order.concreteType}`),
          quantity: (order.quantity as number) || 0,
          isNew: true,
        },
        pumping: {
          ...new Offer().pumping,
          isNew: true,
        },
        transport: {
          ...new Offer().transport,
          isNew: true,
        },
      };
      setOffer(newOffer);
    } else {
      setOffer(order.bidedOffer);
    }
  };

  React.useEffect(() => {
    setDefaultValuesOffer();
  }, [order]);
  React.useEffect(() => {
    _unsubscribe = navigation.addListener('focus', () => {
      setIsFocused(true);
    });
    _unsubscribeBlur = navigation.addListener('blur', () => {
      setIsFocused(false);
    });
    return () => {
      if (_unsubscribe) {
        _unsubscribe();
      }
      if (_unsubscribeBlur) {
        _unsubscribeBlur();
      }
      setOffer(new Offer());
    };
  }, []);

  const bidForOrder = () => {
    if (
      order.paymentMethodId === 'cash' &&
      (!hasAddress || !hasInvoiceDetails || !hasRepresentativeDetails)
    ) {
      setFillYourDataModal({...fillYourDataModal, isVisible: true});
      return;
    } else if (
      order.paymentMethodId != 'cash' &&
      (!hasAddress || !hasInvoiceDetails || !hasRepresentativeDetails)
    ) {
      setFillYourDataModal({...fillYourDataModal, isVisible: true});
      return;
    }

    let areValid = validateFields();
    if (areValid) {
      props.bidForOrder({
        orderId: order.orderId as string,
        offer,
        order,
      });
    }
  };

  const cancelOffer = () => {
    props.cancelOffer({
      orderId: order.orderId as string,
      navigation: navigation,
    });
  };

  const startDelivery = () => {
    props.startDelivery({
      orderId: order.orderId as string,
      paymentMethodId: order.paymentMethodId,
      navigation: navigation,
    });
    setIsConfirmationVisible(false);
  };

  const finishOrder = () => {
    props.finishOrder({
      orderId: order.orderId as string,
      captureAvailable: false,
      paymentMethodId: order.paymentMethodId,
      navigation: navigation,
    });
    setIsConfirmationVisible(false);
  };
  const isStartDeliveryDisabled = () => {
    if (offer) {
      let disabled = false;
      Object.keys(offer).forEach((key: string) => {
        //@ts-ignore
        const offerData = offer[key] as OfferData;
        if (offerData.quantity && !offerData.price) {
          disabled = true;
        }
      });
      return disabled;
    }
    return false;
  };
  const validateFields = () => {
    const keys = Object.keys(offer);
    let isValid = true;
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i] as keyof IOffer;
      if (
        isArray(offer[key]) &&
        //@ts-ignore
        offer[key]?.length === 0 &&
        orderStatus === OrderStatus.New
      ) {
        setErrors({
          ...errors,
          [key]: true,
        });
        isValid = false;
      } else {
        //@ts-ignore
        if (offer[key]?.isNew && offer[key]?.quantity && !offer[key]?.price) {
          //@ts-ignore
          inputRefs?.[key]?.focus();
          isValid = false;
          setErrors({
            ...errors,
            [key]: true,
          });
          return;
        }
      }
    }
    return isValid;
  };
  const showConfirmationModal = () => {
    let applyConfirmation = validateFields();
    if (applyConfirmation) {
      setIsConfirmationVisible(true);
    }
  };
  const getButtonData = () => {
    let buttonData: IButtonData = {
      action: showConfirmationModal,
      confirmAction: () => {},
      title: '',
      isButton: true,
      confirmationType: undefined,
      disabled: false,
    };
    if (
      orderStatus === OrderStatus.Completed ||
      orderStatus === OrderStatus.Canceled
    ) {
      return null;
    }
    if (orderStatus === OrderStatus.New && order.bidedOffer) {
      buttonData.confirmAction = cancelOffer;
      buttonData.title = i18n.t('cancel_offer');
      buttonData.confirmationType = ConfirmationTypeEnum.CANCEL_OFFER;
      buttonData.isButton = false;
    } else if (orderStatus === OrderStatus.New) {
      buttonData.action = bidForOrder;
      buttonData.title = i18n.t('send_offer');
    } else if (orderStatus === OrderStatus.Scheduled) {
      buttonData.confirmAction = startDelivery;
      buttonData.title = i18n.t('start_delivery');
      buttonData.style = {position: 'absolute', bottom: 20};
      buttonData.confirmationType = ConfirmationTypeEnum.START_DELIVERY;
    } else if (orderStatus === OrderStatus.InDelivery) {
      buttonData.confirmAction = finishOrder;
      buttonData.title = i18n.t('finish_order');
      buttonData.style = {position: 'absolute', bottom: 20};
      buttonData.confirmationType = ConfirmationTypeEnum.FINISH_ORDER;
    }

    return buttonData;
  };

  const getTopButtonData = () => {
    const {orderId} = order;
    if (!orderId) return null;
    const buttonData = {
      title: I18n.t('cancel'),
      confirmAction: () => {
        props.cancelOrder({orderId, navigation});
        props.setSelectedFilterItem(FilterItem.Canceled);
      },
      action: () => setIsCancelConfirmationVisible(true),
      confirmationType: ConfirmationTypeEnum.CANCEL_ORDER,
    };
    if (
      orderStatus === OrderStatus.New ||
      orderStatus === OrderStatus.Completed ||
      orderStatus === OrderStatus.Canceled
    ) {
      return null;
    } else if (orderStatus === OrderStatus.Scheduled) {
      return buttonData;
    } else if (orderStatus === OrderStatus.InDelivery) {
      return buttonData;
    }
  };
  const buttonData = getButtonData();

  const topButtonData = getTopButtonData();

  let scroll: any = null;

  const isEditable = [OrderStatus.Scheduled, OrderStatus.InDelivery].includes(
    order.status,
  );

  const onUpdateOffer = (type: OfferTypeEnum, offerData: IOfferData) => {
    if (order.selectedBidder) {
      const newOffer: any = _.clone(offer);
      newOffer[type] = offerData;
      const newOrder: IOrder = {
        ...order,
        selectedBidder: {...order.selectedBidder, offer: newOffer},
      };
      props.updateOrder({
        updatedOrder: convertToUpdateOrder(newOrder),
      });
      setKeepEditingPrice({...keepEditingPrice, [type]: true});
    }
  };

  const onPressInvoiceDetails = () => {
    dispatch(
      persistedUserActions.setClientCompanyDetails(order.invoiceDetails),
    );
    navigation.navigate(SupplierPathList.INVOICE_DETAILS_ORDER);
  };
  return (
    <>
      <CustomStatusBar />
      {/* <LoadingSpinner visible={props.isLoading} textContent={''} /> */}
      <View
        style={[RequestListScreenLtrStyle.container, {position: 'relative'}]}>
        <KeyboardAwareScrollView
          innerRef={(ref: any) => {
            scroll = ref;
          }}
          keyboardOpeningTime={0}>
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
                }}
              />
            }
            centerComponent={null}
            rightComponent={
              topButtonData && (
                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={topButtonData.action}>
                  <Text
                    style={{
                      fontSize: Fonts.regular,
                      color: Colors.red,
                      marginRight: 5,
                    }}>
                    {topButtonData.title}
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
              isEditableAvailable={[
                OrderStatus.Scheduled,
                OrderStatus.InDelivery,
              ].includes(order.status)}
              isUserDetailsVisible={true}
              selectedBidder={order.selectedBidder}
            />
            <View
              style={[
                OrderScreenLtrStyle.order_details_container,
                {paddingTop: 30},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={GlobalLtrStyle.pageTitle}>
                  {I18n.t('payment_method')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                {order.paymentMethodId === 'cash' ? (
                  <CustomIcon
                    size={Fonts.h5}
                    color={Colors.black}
                    name="cash"
                    iconPack="custom"
                  />
                ) : (
                  <CustomIcon
                    size={Fonts.h5}
                    color={Colors.black}
                    name="payment"
                    iconPack="custom"
                  />
                )}
                <Text
                  style={[GlobalLtrStyle.regularBlackText, {marginLeft: 20}]}>
                  {order.paymentMethodId === 'cash' ? 'Cash' : 'Card'}
                </Text>
              </View>
            </View>
            {order.invoiceDetails && (
              <BillingDetails
                onPress={onPressInvoiceDetails}
                companyDetails={order.invoiceDetails}
              />
            )}
            {!order?.isDraft && orderStatus === OrderStatus.New && (
              <AvailableHours
                availableHours={
                  order.bidedOffer?.availableHours || offer.availableHours
                }
                errors={errors}
                setErrors={setErrors}
                selectedDate={order.deliveryDate}
                onChange={value => {
                  setOffer({...offer, availableHours: value});
                }}
                isEditable={!order.bidedOffer}
                order={order}
              />
            )}
            <OfferPrice
              navigation={navigation}
              isEditable={
                (!order.bidedOffer && !order.selectedBidder) || isEditable
              }
              keepEditingPrice={keepEditingPrice}
              order={order}
              setRefs={setRefs}
              errors={errors}
              setErrors={setErrors}
              updateOffer={isEditable ? onUpdateOffer : undefined}
              setOffer={setOffer}
              offer={offer}
            />
          </View>
          {!!buttonData &&
            !buttonData.disabled &&
            (orderStatus === OrderStatus.New || !buttonData.isButton) && (
              <BottomButton {...buttonData} />
            )}
          <View
            style={{
              height:
                !buttonData?.isButton || orderStatus === OrderStatus.New
                  ? 50
                  : 120,
            }}
          />
        </KeyboardAwareScrollView>
        {!!buttonData &&
          !buttonData.disabled &&
          buttonData.isButton &&
          orderStatus !== OrderStatus.New && <BottomButton {...buttonData} />}

        {buttonData?.confirmationType && (
          <ConfirmationModal
            isVisible={isConfirmationVisible}
            onClose={() => {
              setIsConfirmationVisible(false);
            }}
            onConfirm={buttonData.confirmAction}
            type={buttonData.confirmationType}
          />
        )}
        {topButtonData && (
          <ConfirmationModal
            isVisible={isCancelConfirmationVisible}
            onClose={() => {
              setIsCancelConfirmationVisible(false);
            }}
            onConfirm={topButtonData.confirmAction}
            type={topButtonData.confirmationType}
          />
        )}
        {isFocused && <SuccessModal />}
      </View>
    </>
  );
};

const BottomButton = (buttonData: IButtonData) => {
  return (
    <>
      {buttonData.isButton ? (
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            paddingHorizontal: 10,
            ...(buttonData.style || {}),
          }}>
          <Button
            title={buttonData.title}
            onPress={buttonData.action}
            disabled={buttonData.disabled}
            buttonStyle={[GlobalLtrStyle.bottomConfirmationButton]}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={buttonData.action}>
          <Text
            style={{
              margin: 15,
              fontSize: Fonts.regular,
              color: Colors.red,
            }}>
            {buttonData.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  order: state.order.orderData,
  role: state.application.role,
  offer: state.order.offer,
  isLoading: state.order.isLoading,
  fillYourDataModal: state.persistedUser.fillYourDataModal,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  bidForOrder: actions.bidForOrder,
  cancelOffer: actions.cancelOffer,
  finishOrder: actions.finishOrder,
  startDelivery: actions.startDelivery,
  cancelOrder: actions.cancelOrder,
  setOrderData: actions.setOrderData,
  updateOrder: actions.updateOrder,
  updateTimeInterval: actions.updateTimeInterval,
  setSelectedFilterItem: actions.setSelectedFilterItem,
  setOffer: actions.setOffer,
  setFillYourDataModal: persistedUserActions.setFillYourDataModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailsSupplier);
