import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { actions, selectDeviceID, selectRole } from './index';

import { actions as orderActions } from '../orderSlice/index';
import { actions as persistedUserSliceAction } from '../persistedUserSlice/index';
import { actions as userSliceAction } from '../userSlice/index';
import { ActionType } from 'typesafe-actions';
import { getDeviceId, commonLogin, registerClient, registerSupplier, changePassword, forgetPassword } from '../../../services/api';
import { AxiosResponse } from 'axios';
import { IAuthenticationResponse, IGetDeviceTokenResponse, IServerResponse, RoleEnum } from '../../../utils/interfaces';
import jwtDecode from 'jwt-decode';
import { AuthPathList } from '../../../utils/enums';
import i18n from '../../../services/i18n';

export function* loginAttempt(action: ActionType<typeof actions.login>) {
  try {
    const authData = { ...action.payload };
    if (!action.payload.deviceID) {
      yield call(generateDeviceId);
      const newDeviceID: string = yield select(selectDeviceID);
      authData.deviceID = newDeviceID;
    }
    const response: AxiosResponse<IServerResponse<IAuthenticationResponse>> = yield call(commonLogin, authData);
    const decodedJwt: any = jwtDecode(response.data.data.accessToken);
    if (response.data.success) {
      yield put(actions.loginSuccess({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
        role: decodedJwt.role,
      }));
      yield put(actions.setLoginError(''));
    } else {
      yield put(actions.setLoginError(`${i18n.t('email_password_incorrect')}`));
    }

  } catch (e) {
    yield put(actions.setLoginError(`${i18n.t('email_password_incorrect')}`));
  }
}

export function* registerClientAttempt(action: ActionType<typeof actions.registerClient>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(registerClient, action.payload.registerData);
    if (response.data.success) {
      yield put(actions.setRegisterError(''));
      yield put(actions.setRegisterSuccess(true));
    } else {
      yield put(actions.setRegisterError(response.data.error?.messages?.[0]?.user ? `${i18n.t('email_already_exists')}` : 'Something went wrong'));
    }
  } catch (e) {
    yield put(actions.setRegisterError('Something went wrong'));
  }
}

export function* registerSupplierAttempt(action: ActionType<typeof actions.registerSupplier>) {
  try {
    const response: AxiosResponse<IServerResponse<any>> = yield call(registerSupplier, action.payload.registerData);
    if (response.data.success) {
      yield put(actions.setRegisterError(''));
      yield put(actions.setRegisterSuccess(true));
    } else {
      yield put(actions.setRegisterError(response.data.error?.messages?.[0]?.user ? `${i18n.t('email_already_exists')}` : 'Something went wrong'));
    }
  } catch (e) {
    yield put(actions.setRegisterError('Something went wrong'));
  }
}


export function* forgetPasswordAttempt(action: ActionType<typeof actions.forgetPassword>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    console.warn('role', role);
    const response: AxiosResponse<IServerResponse<any>> = yield call(forgetPassword, { email: action.payload.email });
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}


export function* changePasswordAttempt(action: ActionType<typeof actions.changePassword>) {
  try {
    yield put(actions.setIsLoading(true));
    const role: RoleEnum = yield select(selectRole);
    const response: AxiosResponse<IServerResponse<any>> = yield call(changePassword, { newPassword: action.payload.newPassword }, role);
    if (action.payload.navigation) {
      action.payload.navigation.goBack();
    }
    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.error(e);
    yield put(actions.setIsLoading(false));
  }
}

export function* generateDeviceId() {
  try {
    const response: AxiosResponse<IGetDeviceTokenResponse> = yield call(getDeviceId);
    yield put(actions.setDeviceId(response.data.uuid));
  } catch (e) {
    console.error(e);
  }
}

export function* logoutAttempt() {
  yield put(orderActions.logout());
  yield put(persistedUserSliceAction.logout());
  yield put(userSliceAction.logout());
}

export function* applicationSaga() {
  yield takeLatest(actions.login.type, loginAttempt);
  yield takeLatest(actions.registerClient.type, registerClientAttempt);
  yield takeLatest(actions.registerSupplier.type, registerSupplierAttempt);
  yield takeLatest(actions.logout.type, logoutAttempt);
  yield takeLatest(actions.forgetPassword.type, forgetPasswordAttempt);
  yield takeLatest(actions.changePassword.type, changePasswordAttempt);
}
