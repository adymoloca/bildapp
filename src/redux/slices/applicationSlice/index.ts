import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationRequest, IAuthenticationResponse, IChangePassword, IClientRegisterRequest, IForgetPassword, ISupplierRegisterRequest, RoleEnum } from '../../../utils/interfaces';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface ApplicationState {
  role: RoleEnum;
  refreshToken: string;
  accessToken: string;
  deviceID: string;
  isLoading: boolean;
  language: string;
  notification: boolean;
  loginError: string,
  registerError: string,
  registerSuccess: boolean,
}

// Define the initial state using that type
const initialState: ApplicationState = {
  role: RoleEnum.UNLOGGED,
  refreshToken: '',
  accessToken: '',
  deviceID: '',
  isLoading: false,
  language: '',
  notification: true,
  loginError: '',
  registerError: '',
  registerSuccess: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    login: (state, action: PayloadAction<IAuthenticationRequest>) => {
      // TODO
    },
    registerClient: (state, action: PayloadAction<{registerData: IClientRegisterRequest} & { navigation?: NavigationProp<ParamListBase>; }>) => {
      // TODO
    },
    registerSupplier: (state, action: PayloadAction<{registerData: ISupplierRegisterRequest} & { navigation?: NavigationProp<ParamListBase>; }>) => {
      // TODO
    },
    forgetPassword: (state, action: PayloadAction<IForgetPassword & { navigation?: NavigationProp<ParamListBase>; }>) => {
      // TODO
    },
    changePassword: (state, action: PayloadAction<IChangePassword & { navigation?: NavigationProp<ParamListBase>; }>) => {
      // TODO
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRegisterSuccess: (state, action: PayloadAction<boolean>) => {
      state.registerSuccess = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<IAuthenticationResponse & { role: RoleEnum; fullName?: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // state.fullName = action.payload.fullName || '';
      if (action.payload.role === RoleEnum.CLIENT || action.payload.role === RoleEnum.SUPPLIER) {
        state.role = action.payload.role;
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setNotification: (state, action: PayloadAction<boolean>) => {
      state.notification = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceID = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
    },
    setRegisterError: (state, action: PayloadAction<string>) => {
      state.registerError = action.payload;
    },
    logout: (state) => {
      const newInitialState = { ...initialState };
      newInitialState.language = state.language;
      newInitialState.deviceID = state.deviceID; //persist deviceID in async storage for the next login
      return newInitialState;
    }
  },
});

export const { actions, reducer } = applicationSlice;


// Other code such as selectors can use the imported `RootState` type
export const selectIsLoggedIn = (state: RootState) => state.application.accessToken && state.application.refreshToken && state.application.role;
export const selectIsClient = (state: RootState) => state.application.role === RoleEnum.CLIENT;
export const selectIsSupplier = (state: RootState) => state.application.role === RoleEnum.SUPPLIER;
export const selectRole = (state: RootState) => state.application.role;
// export const selectFullName = (state: RootState) => state.application.fullName;
export const selectAccessToken = (state: RootState) => state.application.accessToken;
export const selectRefreshToken = (state: RootState) => state.application.refreshToken;
export const selectDeviceID = (state: RootState) => state.application.deviceID;
export const selectIsLoading = (state: RootState) => state.application.isLoading;
export const selectSession = (state: RootState) => {
  return {
    refreshToken: state.application.refreshToken,
    accessToken: state.application.accessToken,
  };
};

