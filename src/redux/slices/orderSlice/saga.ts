import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { actions } from './index';

import { selectRole } from '../applicationSlice';
import { bidForOrder, cancelOffer, cancelOrder, createOrder, getOrderList, getSupplierList, confirmOffer, startDelivery, finishOrder, deleteOrder, updateTimeInterval, updateOrder, updateOrderPaymentMethod } from '../../../services/api';
import { InfoModalActionTypeEnum, InfoModalData, InfoModalEnum, IOrder, IServerResponse, ISupplier, RoleEnum } from '../../../utils/interfaces';
import { addStatusToList, FilterItem, getOrderStatus } from '../../../utils/orderUtil';
import i18n from '../../../services/i18n';
import { ClientPathList, SupplierPathList } from '../../../utils/enums';
import { prettyDate } from '../../../utils/dateUtils';

export function* getOrderListAttempt(action: ActionType<typeof actions.getOrderList>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<IOrder[]>> = yield call(getOrderList, role);
    yield put(actions.setOrderList(addStatusToList(response.data.data || [])));
    yield put(actions.setIsLoading(false));
  } catch (e) {
    yield put(actions.setIsLoading(false));
    console.error(e);
  }
}
export function* getSupplierListAttempt(action: ActionType<typeof actions.getSupplierList>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<ISupplier[]>> = yield call(getSupplierList, action.payload.orderLocation);
    yield put(actions.setSupplierList(response.data.data));
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* createOrderAttempt(action: ActionType<typeof actions.createOrder>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<any>> = yield call(createOrder, action.payload.order, role);
    yield put(actions.resetOrderData());
    yield put(actions.setIsLoading(false));
    if (action.payload.goToOrderList && action.payload.navigation) {
      // @ts-ignore
      action.payload.navigation.popToTop();
      action.payload.navigation.navigate(ClientPathList.ORDER_LIST);
    } else if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
  } catch (e) {
    yield put(actions.setIsLoading(false));
    console.error(e);
  }
}

export function* bidForOrderAttempt(action: ActionType<typeof actions.bidForOrder>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(bidForOrder, action.payload);
    yield put(actions.setIsLoading(false));
    yield put(actions.setInfoModalData({
      ...new InfoModalData(),
      isVisible: true,
      type: InfoModalEnum.BASIC,
      actionType: InfoModalActionTypeEnum.GO_BACK,
      subtitle: `${i18n.t('sent_offer_to')} ${action.payload.order.fullName}`,
      title: `${i18n.t('offer_sent')}`,
    }));
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
  } catch (e) {
    yield put(actions.setIsLoading(false));
    console.error(e);
  }
}

export function* cancelOfferAttempt(action: ActionType<typeof actions.cancelOffer>) {
  try {
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<any>> = yield call(cancelOffer, action.payload, role);
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    } else {
      yield put(actions.setOrderData(response.data.data));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* confirmOfferAttempt(action: ActionType<typeof actions.confirmOffer>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(confirmOffer, action.payload.bidder, action.payload.orderId, action.payload.time, action.payload.paymentMethodId);
    const order: IOrder = response.data.data;
    yield put(actions.setIsLoading(false));
    yield put(actions.setInfoModalData({
      ...new InfoModalData(),
      isVisible: true,
      subtitle: `${i18n.t('order_is_scheduled_for')} ${prettyDate(
        order.deliveryDate as string,
      )}`,
      title: `${i18n.t('order_received')}`,
    }));
    yield put(actions.setOrderData(order));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* cancelOrderAttempt(action: ActionType<typeof actions.cancelOrder>) {
  try {
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<any>> = yield call(cancelOrder, { orderId: action.payload.orderId }, role);

    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
  } catch (e) {
    console.error(e);
  }
}

export function* deleteOrderAttempt(action: ActionType<typeof actions.deleteOrder>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(deleteOrder, { orderId: action.payload.orderId });
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
  } catch (e) {
    console.error(e);
  }
}

export function* startDeliveryAttempt(action: ActionType<typeof actions.startDelivery>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(startDelivery, action.payload.orderId);
    if (response.data.success == false) {
      if (response.data.error.code === 'insufficient_funds') {
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.INSUFFICIENT_FOUNDS,
          subtitle: `${i18n.t('insufficient_founds_msg')}`,
          title: `${i18n.t('insufficient_founds')}`,
        }));
      } else {
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.PAYMENT_FAILED,
          subtitle: `${i18n.t('payment_failed_msg')}`,
          title: `${i18n.t('payment_failed')}`,
        }));
      }

    } else if (action.payload.navigation) {
      yield put(actions.setSelectedFilterItem(FilterItem.InDelivery))
      if (action.payload.paymentMethodId === 'cash') {
        action.payload.navigation.goBack();
      } else {
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.PAYMENT_CONFIRMED,
          actionType: InfoModalActionTypeEnum.GO_BACK,
          subtitle: `${i18n.t('payment_confirmed_msg')}`,
          title: `${i18n.t('payment_confirmed')}`,
        }));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function* updateTimeIntervalAttempt(action: ActionType<typeof actions.updateTimeInterval>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(updateTimeInterval, action.payload.orderId, action.payload.time);
  } catch (e) {
    yield put(actions.getOrderList());
    console.error(e);
  }
}

export function* updateOrderAttempt(action: ActionType<typeof actions.updateOrder>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<IOrder>> = yield call(updateOrder, action.payload.updatedOrder, role);
    yield put(actions.getOrderList());
    const order = response.data.data;
    yield put(actions.setOrderData({ ...order, status: getOrderStatus(order) }));
    yield put(actions.setIsLoading(false));
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
  } catch (e) {
    yield put(actions.setIsLoading(false));
    yield put(actions.getOrderList());
    console.error(e);
  }
}

export function* updateOrderPaymentMethodAttempt(action: ActionType<typeof actions.updateOrderPaymentMethod>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(updateOrderPaymentMethod, action.payload.orderId, action.payload.paymentMethodId);
  } catch (e) {
    console.error(e);
  }
}

export function* finishOrderAttempt(action: ActionType<typeof actions.finishOrder>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(finishOrder, action.payload.orderId, action.payload.captureAvailable);
    if (response.data.success == false) {
      if (response.data.error.type === 'payment_difference_failed') {
        const message = JSON.parse(response.data.error.messages);
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          subtitle: `${i18n.t('insufficient_founds_msg2').replace('{sum}', message.fullAmmount).replace('{sum2}', message.capturableAmmount).replace('{currency}', message.currency).replace('{currency}', message.currency)}`,
          title: `${i18n.t('insufficient_founds')}`,
          buttonText: `${i18n.t('collect')} ${message.capturableAmmount} ${message.currency}`,
          buttonTextSecondary: `${i18n.t('back_to_order')}`,
          actionType: InfoModalActionTypeEnum.COLLECT_MONEY,
          actionInput: { orderId: action.payload.orderId, paymentMethodId: action.payload.paymentMethodId },
        }));
      } else {
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.PAYMENT_FAILED,
          subtitle: `${i18n.t('payment_failed_msg')}`,
          title: `${i18n.t('payment_failed')}`,
        }));
      }

    } else if (action.payload.navigation) {
      yield put(actions.setSelectedFilterItem(FilterItem.Completed))
      if (action.payload.paymentMethodId === 'cash') {
        action.payload.navigation.goBack();
      } else {
        yield put(actions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.BASIC,
          actionType: InfoModalActionTypeEnum.GO_BACK,
          subtitle: `${i18n.t('finished_order_msg')}`,
          title: `${i18n.t('finished_order')}`, 
        }));
      }
    }

  } catch (e) {
    console.error(e);
  }
}

export function* orderSaga() {
  yield takeLatest(actions.getSupplierList.type, getSupplierListAttempt);
  yield takeLatest(actions.updateOrder.type, updateOrderAttempt);
  yield takeLatest(actions.getOrderList.type, getOrderListAttempt);
  yield takeLatest(actions.createOrder.type, createOrderAttempt);
  yield takeLatest(actions.bidForOrder.type, bidForOrderAttempt);
  yield takeLatest(actions.cancelOrder.type, cancelOrderAttempt);
  yield takeLatest(actions.cancelOffer.type, cancelOfferAttempt);
  yield takeLatest(actions.confirmOffer.type, confirmOfferAttempt);
  yield takeLatest(actions.startDelivery.type, startDeliveryAttempt);
  yield takeLatest(actions.finishOrder.type, finishOrderAttempt);
  yield takeLatest(actions.deleteOrder.type, deleteOrderAttempt);
  yield takeLatest(actions.updateTimeInterval.type, updateTimeIntervalAttempt);
  yield takeLatest(actions.updateOrderPaymentMethod.type, updateOrderPaymentMethodAttempt);

}
