import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISupplierData, ISupplierPayment, IUser } from '../../../utils/interfaces';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface UserState {
  clientDetails: IUser;
  supplierDetails: ISupplierData;
  supplierPaymentList: ISupplierPayment[];
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  clientDetails: {
    name: '',
    email: '',
    phone: ''
  },
  supplierDetails: {
    company: '',
    email: '',
    location: '',
    numberOfReviews: 0,
    reviewsSum: 0,
    reviewAverage: 0,
    deliveryRange: 50
  },
  supplierPaymentList: [],
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setClientDetails: (state, action: PayloadAction<IUser>) => {
      state.clientDetails = action.payload;
    },
    setSupplierDetails: (state, action: PayloadAction<ISupplierData>) => {
      state.supplierDetails = action.payload;
    },
    setSupplierPaymentList: (state, action: PayloadAction<ISupplierPayment[]>) => {
      state.supplierPaymentList = action.payload;
    },
    getClientDetails: (state, action: PayloadAction) => {
      // TODO
    },
    getSupplierDetails: (state, action: PayloadAction) => {
      // TODO
    },
    getUserDetails: (state, action: PayloadAction) => {
      // TODO
    },
    putUserDetails: (state, action: PayloadAction<ISupplierData | IUser>) => {
      // TODO
    },
    getSupplierPaymentList: (state, action: PayloadAction) => {
      // TODO
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => initialState,
  },
});

export const { actions, reducer } = userSlice;

// Other code such as selectors can use the imported `RootState` type
export const selectClientDetails = (state: RootState) => state.user.clientDetails;
export const selectSupplierDetails = (state: RootState) => state.user.supplierDetails;
export const selectSupplierPaymentList = (state: RootState) => state.user.supplierPaymentList;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
