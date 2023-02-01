import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBidder, IBidRequest, ICalendarOrder, IOffer, IOrder, ISupplier, ITimeInterval, IUpdateOrder, Offer, Order, IError, Error, InfoModalData } from '../../../utils/interfaces';
import { FilterItem, OrderStatus } from '../../../utils/orderUtil';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface OrderState {
  orderData: IOrder;
  orderList: IOrder[];
  supplierList: ISupplier[];
  isError: boolean;
  error:IError;
  offer: IOffer;
  isLoading: boolean;
  infoModalData: InfoModalData;
  selectedFilterItem: FilterItem;
}

// Define the initial state using that type
const initialState: OrderState = {
  orderData: new Order(),
  offer: new Offer(),
  orderList: [],
  supplierList: [],
  infoModalData: new InfoModalData(),
  isError: false,
  isLoading: false,
  error: new Error(),
  selectedFilterItem: FilterItem.All,
};

export const orderSlice = createSlice({
  name: 'order',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<IOrder>) => {
      state.orderData = action.payload;
    },
    setOrderList: (state, action: PayloadAction<IOrder[]>) => {
      state.orderList = action.payload;
    },
    setSupplierList: (state, action: PayloadAction<ISupplier[]>) => {
      state.supplierList = action.payload;
    },
    getSupplierList: (state, action: PayloadAction<{ orderLocation: string }>) => {
    },
    createOrder: (state, action: PayloadAction<{order: IOrder, goToOrderList?: boolean} & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    bidForOrder: (state, action: PayloadAction<IBidRequest & {order: IOrder} & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    getOrderList: (state, action: PayloadAction) => {
    },
    updateTimeInterval: (state, action: PayloadAction<{time: ITimeInterval, orderId: string}>) => {
    },
    setInfoModalData: (state, action: PayloadAction<InfoModalData>) => {
      state.infoModalData = action.payload;
    },
    cancelOffer: (state, action: PayloadAction<{ orderId: string, supplierEmail?: string } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    cancelOrder: (state, action: PayloadAction<{ orderId: string } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    updateOrder: (state, action: PayloadAction<{ updatedOrder: IUpdateOrder, triggerModal?: boolean } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    deleteOrder: (state, action: PayloadAction<{ orderId: string } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    confirmOffer: (state, action: PayloadAction<{ bidder: IBidder, orderId: string, time: ITimeInterval, paymentMethodId: string} & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    startDelivery: (state, action: PayloadAction<{ orderId: string, paymentMethodId: string } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    paymentError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload;
      state.isError = true;
    },
    setSelectedFilterItem: (state, action: PayloadAction<FilterItem>) => {
      state.selectedFilterItem = action.payload;
    },
    clearError: (state, action: PayloadAction) => {
      state.error = new Error();
      state.isError = false;
    },
    finishOrder: (state, action: PayloadAction<{ orderId: string, captureAvailable: boolean, paymentMethodId: string  } & { navigation?: NavigationProp<ParamListBase>; }>) => {
    },
    setOffer: (state, action: PayloadAction<IOffer>) => {
      state.offer = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => initialState,
    resetState: (state) => initialState,
    resetOrderData: (state) => {
      state.orderData = new Order();
    },
    updateOrderPaymentMethod: (state, action: PayloadAction<{ orderId: string, paymentMethodId: string}>) => {
    }
  },
});

export const { actions, reducer } = orderSlice;

export const { setOrderData, setOrderList, getOrderList } = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrderData = (state: RootState) => state.order.orderData;
export const selectIsLoading = (state: RootState) => state.order.isLoading;
export const selectSupplierList = (state: RootState) => state.order.supplierList;
export const selectOrderList = (state: RootState) => state.order.orderList;
export const selectIsError = (state: RootState) => state.order.isError;
export const selectError = (state: RootState) => state.order.error;
const filterByStatus = [OrderStatus.InDelivery, OrderStatus.Scheduled, OrderStatus.Completed, OrderStatus.Canceled]
export const selectCalendarOrderList = (state: RootState): ICalendarOrder[] => state.order.orderList.map((item: IOrder) => ({...item, columnIdx: 0, currentHour: item.time.start})). filter(item => filterByStatus.includes(item.status));

export default orderSlice.reducer;
