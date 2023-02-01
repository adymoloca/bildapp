import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard, IClientCompany, IRepresentative, IUser, IError, Error, ISupplierCompany, IAddressSearch, IFillYourDataModal } from '../../../utils/interfaces';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface PersistedUserState {
  userDetails: IUser;
  cardList: ICard[];
  selectedCard: ICard ;
  supplierCompanyDetails: ISupplierCompany | undefined;
  clientCompanyDetails: IClientCompany | undefined;
  representative: IRepresentative | undefined;
  isError: boolean;
  error:IError;
  hasAddress: boolean;
  hasInvoiceDetails: boolean;
  hasRepresentativeDetails: boolean;
  searchList: IAddressSearch[];
  fillYourDataModal: IFillYourDataModal;
  isLoading: boolean;
  selectedSupplierIdsP: string[];
}

// Define the initial state using that type
const initialState: PersistedUserState = {
  userDetails: {
    name: '',
    email: '',
    phone: ''
  },
  cardList: [],
  selectedCard: {id: 'cash', brand: "cash", isDefault: true},
  clientCompanyDetails: undefined,
  supplierCompanyDetails: undefined,
  representative: undefined,
  isError: false,
  error: new Error(),
  hasAddress: false,
  hasInvoiceDetails: false,
  hasRepresentativeDetails: false,
  fillYourDataModal: {
    isVisible: false,
    lastShownDate: undefined,
    daysToBeShown: 7,
  },
  searchList: [],
  selectedSupplierIdsP: [],
  isLoading: false

};

export const persistedUserSlice = createSlice({
  name: 'persistedUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setClientDetails: (state, action: PayloadAction<IUser>) => {
      state.userDetails = action.payload;
    },
    setDefaultCardAttempt: (state, action: PayloadAction<ICard>) => {
      state.selectedCard = action.payload;
    },
    setDefaultCard:(state, action: PayloadAction<string>) => {
      state.cardList.forEach(x => {
        if(x.id == action.payload){
          x.isDefault = true
        } else {
          x.isDefault = false;
        }
        
      })
    },
    setFillYourDataModal: (state, action: PayloadAction<IFillYourDataModal>) => {
      state.fillYourDataModal = action.payload;
    },
    getCardList: (state, action: PayloadAction) => {
    },
    setCardList: (state, action: PayloadAction<ICard[]>) => {
      let defaultPayment = action.payload.filter(x => {
        return x.isDefault === true;
      })[0]
      state.cardList = [{id: 'cash', brand: 'cash', isDefault: defaultPayment ? false : true}];
      state.cardList = state.cardList.concat(action.payload);

      state.selectedCard = state.cardList.filter(x => {
        return x.isDefault === true;
      })?.[0];

    },
    addCardToList: (state, action: PayloadAction<ICard>) => {
      state.cardList = [...state.cardList, action.payload];
    },
    removeCardFromListAttempt: (state, action: PayloadAction<ICard>) => {
    },
    removeCardFromList: (state, action: PayloadAction<string>) => {
      state.cardList = state.cardList.filter(x => {
        return x.id != action.payload;
      })
    },
    updateClientCompanyDetailsAttempt: (state, action: PayloadAction<IClientCompany>) => {
    },
    getClientCompanyDetailsAttempt: (state, action: PayloadAction) => {
    },
    setClientCompanyDetails: (state, action: PayloadAction<IClientCompany | undefined>) => {
      state.clientCompanyDetails = action.payload;
    },
    updateSupplierCompanyDetailsAttempt: (state, action: PayloadAction<ISupplierCompany>) => {
    },
    getSupplierCompanyDetailsAttempt: (state, action: PayloadAction) => {
    },
    setSupplierCompanyDetails: (state, action: PayloadAction<ISupplierCompany | undefined>) => {
      state.supplierCompanyDetails = action.payload;
    },
    updateRepresentativeAttempt: (state, action: PayloadAction<IRepresentative>) => {
    },
    getRepresentativeAttempt: (state, action: PayloadAction) => {
    },
    setSelectedSupplierIdsP: (state, action: PayloadAction<string[]>) => {
      state.selectedSupplierIdsP = action.payload;
    },
    setRepresentative: (state, action: PayloadAction<IRepresentative>) => {
      state.representative = action.payload;
    },
    stripeError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload;
      state.isError = true;
    },
    clearError: (state, action: PayloadAction) => {
      state.error = new Error();
      state.isError = false;
    },
    setSearchList: (state, action: PayloadAction<IAddressSearch[]>) => {
      state.searchList = action.payload;
    },
    getCanSendOfferAttempt: (state, action: PayloadAction) => {
    },
    setCanSendCardOffer: (state, action: PayloadAction<{hasAddress: boolean, hasInvoiceDetails:boolean, hasRepresentativeDetails:boolean}>) => {
      state.hasAddress = action.payload.hasAddress;
      state.hasInvoiceDetails = action.payload.hasInvoiceDetails;
      state.hasRepresentativeDetails = action.payload.hasRepresentativeDetails;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => initialState,
    setDefaultCardBySetupIntentAttempt: (state, action: PayloadAction<string>) => {
    },
  },
});

export const { actions, reducer } = persistedUserSlice;
// export const {selectSelectedCard} = persistedUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPersistedUserDetails = (state: RootState) => state.persistedUser.userDetails;
export const selectCardList = (state: RootState) => state.persistedUser.cardList;
export const selectSelectedCard = (state: RootState) => state.persistedUser.selectedCard;
export const selectClientCompanyDetails = (state: RootState) => state.persistedUser.clientCompanyDetails;
export const selectSupplierCompanyDetails = (state: RootState) => state.persistedUser.supplierCompanyDetails;
export const selectRepresenative = (state: RootState) => state.persistedUser.representative;
export const selectIsError = (state: RootState) => state.persistedUser.isError;
export const selectError = (state: RootState) => state.persistedUser.error;
export const selectHasAddress = (state: RootState) => state.persistedUser.hasAddress;
export const selectHasInvoiceDetails = (state: RootState) => state.persistedUser.hasInvoiceDetails;
export const selectHasRepresentativeDetails = (state: RootState) => state.persistedUser.hasRepresentativeDetails;
export const selectFillYourDataModal = (state: RootState) => state.persistedUser.fillYourDataModal;
export const selectIsLoading = (state: RootState) => state.persistedUser.isLoading;

export const selectNotificationNumber = (state: RootState) => {
  const { hasInvoiceDetails, hasAddress, hasRepresentativeDetails } = state.persistedUser;
  const list = [hasInvoiceDetails, hasAddress, hasRepresentativeDetails];
  return list.filter(x => !x).length;
};