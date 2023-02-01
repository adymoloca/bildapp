import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { actions } from './index';

import { selectRole } from '../applicationSlice';
import { bidForOrder, cancelOffer, cancelOrder, createOrder, getOrderList, getSupplierList, confirmOffer, startDelivery, finishOrder, deleteOrder, getPaymentsMethods, setDefaultPaymentMethod, deletePaymentMethod, updateInvoiceDetails, getInvoiceDetails, updateRepresentative, getRepresentative, getCanSendCardOffer, updateClientCompanyDetails, getClientCompanyDetails, setDefaultCardBySetupIntent } from '../../../services/api';
import { ICard, InfoModalActionTypeEnum, InfoModalData, InfoModalEnum, IOrder, IRepresentative, IServerResponse, ISupplier, RoleEnum } from "../../../utils/interfaces";
import { addStatusToList } from "../../../utils/orderUtil";
import { getSupplierListAttempt } from "../orderSlice/saga";
import { actions as orderActions } from "../orderSlice/index"
import { Platform } from "react-native";
import { isArray } from "lodash";
import i18n from "../../../services/i18n";

export function* getCardListAttempt(action: ActionType<typeof actions.getCardList>) {
  try {
    const response: AxiosResponse<IServerResponse<ICard[]>> = yield call(getPaymentsMethods);
    yield put(actions.setCardList((isArray(response.data.data) ? response.data.data : [])));
  } catch (e) {
    console.error(e);
  }
}

export function* setDefaultCardAttempt(action: ActionType<typeof actions.setDefaultCardAttempt>) {
  try {
    const paymentMethodId: string = action.payload.id
    yield put(actions.setDefaultCard((paymentMethodId)));
    const response: AxiosResponse<IServerResponse<any>> = yield call(setDefaultPaymentMethod, paymentMethodId);
  } catch (e) {
    console.error(e);
  }
}

export function* removeCardAttempt(action: ActionType<typeof actions.removeCardFromListAttempt>) {
  try {
    const paymentMethodId: string = action.payload.id
    yield put(actions.removeCardFromList((paymentMethodId)));
    const response: AxiosResponse<IServerResponse<any>> = yield call(deletePaymentMethod, paymentMethodId);
  } catch (e) {
    console.error(e);
  }
}

export function* updateSupplierCompanyDetailsAttempt(action: ActionType<typeof actions.updateSupplierCompanyDetailsAttempt>) {
  try {
    yield put(actions.setIsLoading(true));

    const response: AxiosResponse<IServerResponse<any>> = yield call(updateInvoiceDetails, action.payload);
    if (response.data.success == false) {
      if (response.data.error.code === 'bank_account_unusable' || response.data.error.code === 'account_number_invalid') {
        yield put(actions.stripeError(response.data.error));
      } else {
        yield put(orderActions.setInfoModalData({
          ...new InfoModalData(),
          isVisible: true,
          type: InfoModalEnum.BASIC,
          actionType: InfoModalActionTypeEnum.BASIC,
          subtitle: response.data.error?.messages?.join(' '),
          title: `${i18n.t('error')}`,
        }));
      }
    } else {
      yield put(actions.setSupplierCompanyDetails((response.data.data)));
      yield put(orderActions.setInfoModalData({
        ...new InfoModalData(),
        isVisible: true,
        type: InfoModalEnum.BASIC,
        actionType: InfoModalActionTypeEnum.GO_BACK,
        subtitle: '',
        title: `${i18n.t('success')}`,
      }));
    }
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* getSupplierCompanyDetailsAttempt(action: ActionType<typeof actions.getSupplierCompanyDetailsAttempt>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(getInvoiceDetails);
    if (response.data.success === true) {
      yield put(actions.setSupplierCompanyDetails((response.data.data)));
      yield put(actions.setIsLoading(false));
    }
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* updateClientCompanyDetailsAttempt(action: ActionType<typeof actions.updateClientCompanyDetailsAttempt>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(updateClientCompanyDetails, action.payload);
    if (response.data.success == true) {
      yield put(actions.setClientCompanyDetails((action.payload)));
    }
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* getClientCompanyDetailsAttempt(action: ActionType<typeof actions.getClientCompanyDetailsAttempt>) {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(getClientCompanyDetails);
    if (response.data.success === true) {
      yield put(actions.setClientCompanyDetails((response.data.data)));
      yield put(actions.setIsLoading(false));
    }
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* updateRepresentativeAttempt(action: ActionType<typeof actions.updateRepresentativeAttempt>) {
  try {
    yield put(actions.setIsLoading(true));
    const representative: IRepresentative = action.payload
    const data = new FormData();

    if (representative.idFront && representative.idFront.uri) {
      data.append('idFront', {
        name: representative.idFront.fileName,
        type: representative.idFront.type,
        uri: Platform.OS === 'ios' ? representative.idFront.uri.replace('file://', '') : representative.idFront.uri,
      });
    }

    Object.keys(representative).forEach((key) => {
      if (key !== 'idFront' && key !== 'proofOfAddress') {
        if (key === 'address') {
          data.append(key, JSON.stringify(representative[key]));
        } else {
          data.append(key, representative[key]);
        }
      }
    });

    const response: AxiosResponse<IServerResponse<any>> = yield call(updateRepresentative, data);
    if (response.data.success == false) {
      yield put(orderActions.setInfoModalData({
        ...new InfoModalData(),
        isVisible: true,
        type: InfoModalEnum.BASIC,
        actionType: InfoModalActionTypeEnum.BASIC,
        subtitle: response.data.error?.messages?.join(' '),
        title: `${i18n.t('error')}`,
      }));
    } else {
      yield put(actions.setRepresentative((response.data.data)));
      yield put(orderActions.setInfoModalData({
        ...new InfoModalData(),
        isVisible: true,
        type: InfoModalEnum.BASIC,
        actionType: InfoModalActionTypeEnum.GO_BACK,
        subtitle: '',
        title: `${i18n.t('success')}`,
      }));
    }
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* getRepresentativeAttempt(action: ActionType<typeof actions.getRepresentativeAttempt>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(getRepresentative);
    if (response.data.success === true) {
      yield put(actions.setRepresentative((response.data.data)));
    }
  } catch (e) {
    console.error(e);
  }
}
export function* getCanSendOfferAttempt(action: ActionType<typeof actions.getCanSendOfferAttempt>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(getCanSendCardOffer);
    if (response.data.success === true) {
      yield put(actions.setCanSendCardOffer((response.data.data)));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* setDefaultCardBySetupIntentAttempt(action: ActionType<typeof actions.setDefaultCardBySetupIntentAttempt>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(setDefaultCardBySetupIntent, action.payload);
    if (response.data.success === true) {
      yield put(actions.getCardList());
    }
  } catch (e) {
    console.error(e);
  }
}


export function* persistedUserSaga() {
  yield takeLatest(actions.getCardList.type, getCardListAttempt);
  yield takeLatest(actions.setDefaultCardAttempt, setDefaultCardAttempt)
  yield takeLatest(actions.removeCardFromListAttempt, removeCardAttempt)
  yield takeLatest(actions.updateSupplierCompanyDetailsAttempt, updateSupplierCompanyDetailsAttempt)
  yield takeLatest(actions.getSupplierCompanyDetailsAttempt, getSupplierCompanyDetailsAttempt)
  yield takeLatest(actions.updateClientCompanyDetailsAttempt, updateClientCompanyDetailsAttempt)
  yield takeLatest(actions.getClientCompanyDetailsAttempt, getClientCompanyDetailsAttempt)
  yield takeLatest(actions.updateRepresentativeAttempt, updateRepresentativeAttempt)
  yield takeLatest(actions.getRepresentativeAttempt, getRepresentativeAttempt)
  yield takeLatest(actions.getCanSendOfferAttempt, getCanSendOfferAttempt)
  yield takeLatest(actions.setDefaultCardBySetupIntentAttempt, setDefaultCardBySetupIntentAttempt)

  

}