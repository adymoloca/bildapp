import { call, takeLatest, put, select } from 'redux-saga/effects';
import { actions } from './index';

import { AxiosResponse } from 'axios';
import { IServerResponse, RoleEnum } from '../../../utils/interfaces';
import { selectIsClient, selectIsLoggedIn, selectRole } from '../applicationSlice';
import { getPaymentsHistory, getUserInfo, putUserInfo } from '../../../services/api';
import { ActionType } from 'typesafe-actions';

export function* putUserDetailsAttempt(action: ActionType<typeof actions.putUserDetails>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<any>> = yield call(putUserInfo, role, action.payload);
    yield put(actions.getUserDetails());
  } catch (e) {
    console.error(e);
  }
  yield put(actions.setIsLoading(false));
}

export function* getSupplierDetailsAttempt() {
  try {
    // console.warn('getSupplierDetailsAttempt');
    const response: AxiosResponse<IServerResponse<any>> = yield call(getUserInfo, RoleEnum.SUPPLIER);
    console.warn(response);
    if (response?.data?.data[0]) {
      yield put(actions.setSupplierDetails(
        {
          email: response?.data?.data[0].email,
          phone: response?.data?.data[0].phone,
          location: response?.data?.data[0].location,
          company: response?.data?.data[0].company,
          numberOfReviews: response?.data?.data[0].numberOfReviews || 0,
          reviewsSum: response?.data?.data[0].reviewsSum || 0,
          deliveryRange: response?.data?.data[0].deliveryRange || 0,
          reviewAverage: response?.data?.data[0].reviewAverage || 0,
          address: response?.data?.data[0].address,
        }
      ));
    } else {
      console.warn('[getSupplierDetailsAttempt] Missing supplier data');
    }
  } catch (e) {
    console.error(e);
  }
}

export function* getClientDetailsAttempt() {
  try {
    // console.warn('getClientDetailsAttempt');
    const response: AxiosResponse<IServerResponse<any>> = yield call(getUserInfo, RoleEnum.CLIENT);
    console.warn(response);
    if (response?.data?.data[0]) {
      yield put(actions.setClientDetails(
        {
          name: response.data.data[0].fullName,
          phone: response.data.data[0].phone,
          email: response.data.data[0].email,
        }
      ));
    } else {
      console.warn('[getClientDetailsAttempt] Missing client data');
    }
  } catch (e) {
    console.error(e);
  }
}

export function* getUserDetailsAttempt() {
  try {
    // console.warn('getUserDetailsAttempt');
    const isLoggedIn: boolean = yield select(selectIsLoggedIn);
    const isClient: boolean = yield select(selectIsClient);
    if (isLoggedIn) {
      if (isClient) {
        yield call(getClientDetailsAttempt);
      } else {
        yield call(getSupplierDetailsAttempt);
      }
    } else {
      console.warn('[getUserDetailsAttempt] User not logged in');
    }
  } catch (e) {
    console.error(e);
  }
}

export function* getSupplierPaymentListAttempt() {
  try {
    yield put(actions.setIsLoading(true));
    const response: AxiosResponse<IServerResponse<any>> = yield call(getPaymentsHistory);
    // const response: { data: { success: boolean; error: object; data: ISupplierPayment[] } } = supplierPaymentListResponse;
    if (response.data.success === true) {
      yield put(actions.setIsLoading(false));
      yield put(actions.setSupplierPaymentList(response.data.data));
    } else {
      yield put(actions.setIsLoading(false));
    }
  } catch (e) {
    yield put(actions.setIsLoading(false));
    console.error(e);
  }
}

export function* userSaga() {
  yield takeLatest(actions.getClientDetails.type, getClientDetailsAttempt);
  yield takeLatest(actions.getSupplierDetails.type, getSupplierDetailsAttempt);
  yield takeLatest(actions.getUserDetails.type, getUserDetailsAttempt);
  yield takeLatest(actions.putUserDetails.type, putUserDetailsAttempt);
  yield takeLatest(actions.getSupplierPaymentList.type, getSupplierPaymentListAttempt);
}
