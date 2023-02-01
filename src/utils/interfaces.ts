import { FilterItem, OrderStatus } from './orderUtil';

export interface IClientRoute extends IAuthRoute {
  isDisplayedInDrawer: boolean;
  // isInBottomBar: boolean;
  // isBottomBarShown: boolean;
  isHeaderShown: boolean;
  // icon?: string;
  initialParams?: any;
  callback?: any;
  subList?: IClientRoute[];
}

export interface ISupplierRoute extends IAuthRoute {
  // isDisplayedInDrawer: boolean;
  isInBottomBar: boolean;
  isBottomBarShown: boolean;
  isHeaderShown: boolean;
  icon?: string;
  initialParams?: any;
  callback?: any;
  subList?: ISupplierRoute[];
  identifier?: string;
  notification?: boolean;
}

export interface IAuthRoute {
  index: number;
  name: string;
  component: any;
  options?: object;
  testID?: string;
}

export interface ISupplierData {
  email: string,
  location: string,
  company: string,
  numberOfReviews: number,
  reviewsSum: number,
  deliveryRange: number,
  reviewAverage: number,
  phone?: string,
  registered?: string,
  address?: IAddress,
}

export interface ISupplier extends ISupplierData {
  _id: string;
}

export interface IBidRequest {
  offer: IOffer;
  orderId: string;
}

export interface IBidder {
  email: string,
  offer: IOffer,
  company: string,
  supplierId: string,
  reviewAverage: number,
  phone: string,
}

export interface IOrder {
  _id?: string;
  orderId?: string;
  date?: string;
  alreadyBid?: boolean;
  delivered?: boolean;
  company?: string,
  name?: string;
  bidedOffer?: IOffer;
  selectedBidder?: IBidder,
  driverLocation?: { lat?: number; lng?: number; },
  quantity?: string | number;
  deliveryDate?: string | Date;
  concreteType?: string | number;
  address: string;
  coordinates: { lat: number; lng: number; },
  requestPump?: boolean;
  notes?: string;
  bidders?: any[];
  supplierList?: any[];
  fullName?: string;
  phone?: string;
  time: ITimeInterval
  canceledByCustomer: boolean;
  canceledBySupplier: boolean;
  status: OrderStatus;
  paymentId: string;
  paymentMethodId: string;
  isDraft?: boolean;
  invoiceDetails?: IClientCompany;
}

export interface IAddressSearch {
  address: string;
  coordinates: { lat: number; lng: number; }, 
  city: string;
}

export interface IFillYourDataModal {
  isVisible: boolean,
  lastShownDate?: Date,
  daysToBeShown: number,
}

export interface ICalendarOrder extends IOrder {
  columnIdx: number;
  currentHour: number;
}

export const defaultTime = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return { start: 12, end: 15 };
  } else {
    return { start: currentHour + 1, end: currentHour + 4 };
  }

};

export class Order implements IOrder {
  deliveryDate = new Date();
  quantity = '';
  concreteType = '';
  address = '';
  coordinates = { lat: 0, lng: 0 };
  requestPump = false;
  notes = ''
  time = defaultTime();
  canceledByCustomer = false;
  canceledBySupplier = false;
  status = OrderStatus.New;
  paymentId = '';
  paymentMethodId = '';
}


export interface ITimeInterval {
  start: number;
  end: number;
}

export interface ITransaction {
  id: string;
  name: string;
  transactionDate: Date;
  ammount: number;
  currency: string;
  storno: boolean;
  cardType: string;
  fee?: number;
}


export interface IAuthenticationRequest {
  email: string;
  password: string;
  deviceID: string;
}

export interface ICard {
  id?: string;
  brand?: string;
  last4?: string;
  exp_month?: string;
  exp_year?: string;
  isDefault?: boolean;
  primary?: boolean;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface IClientData {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface ISupplierSettingsOptions {
  id: number;
  title: string;
  icon: string;
  callback?: () => void;
  isCentered?: boolean;
  hasSwitch?: boolean;
  disabled?: boolean;
  notificationNumber?: number;
}
export interface IClientCompany {
  companyName: string;
  registrationNumber: string;
  cif: string;
  companyAddress: string;
}

export interface ISupplierCompany {
  companyName: string;
  cif: string;
  companyAddress: Address;
  bankAccount: string;
  currency: string;
}

export class SupplierCompany  implements ISupplierCompany {
  companyName: string = '';
  cif: string = '';
  companyAddress: Address = new Address();
  bankAccount: string = '';
  currency: string = '';
}

export class ClientCompany  implements IClientCompany {
  registrationNumber: string = '';
  companyName: string = '';
  cif: string = '';
  companyAddress: Address = new Address();
}

export interface IRepresentative {
  firstName: string;
  lastName: string;
  // email: string;
  // phone: string;
  // address: Address;
  birthday: string;
  idFront: any;
}

export interface ISupplierPayment {
  id: string;
  amount: number;
  created: number;
  currency: string;
  fee: number;
  name: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthenticationResponse {
  refreshToken: string;
  accessToken: string;
  fullName?: string;
}

export interface IClientRegisterRequest {
  email: string;
  phone: string;
  fullName: string;
  password: string;
}

export interface ISupplierRegisterRequest {
  email: string;
  phone: string;
  company: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}
export interface IChangePassword {
  newPassword: string;
}


export enum RoleEnum {
  CLIENT = 'client',
  SUPPLIER = 'supplier',
  UNLOGGED = '',
}

export interface IServerResponse<T> {
  data: T,
  success: boolean,
  error: any,
}

export interface IGetDeviceTokenResponse {
  uuid: string;
}

export interface IOfferFieldsError {
  [OfferTypeEnum.Concrete]: false,
  [OfferTypeEnum.Pumping]: false,
  [OfferTypeEnum.Transport]: false,
  availableHours: false,
}

export interface IOfferData {
  quantity: number;
  price: string;
  label: string;
  isNew: boolean;
}
export interface IOffer {
  concrete: IOfferData;
  pumping: IOfferData;
  transport: IOfferData;
  availableHours: string[];
}

export interface IUpdateOrder {
  deliveryDate: Date,
  orderId: string,
  time: ITimeInterval,
  address: string,
  concreteType: number,
  requestPump: boolean,
  coordinates: { lat: number; lng: number; },
  notes: string,
  selectedBidder?: IBidder,
  quantity: number
}

export const convertToUpdateOrder = (order: IOrder): IUpdateOrder => {
  return {
    deliveryDate: new Date(order.deliveryDate || ''),
    time: order.time,
    orderId: order.orderId || '',
    address: order.address,
    concreteType: order.concreteType as number,
    requestPump: order.requestPump as boolean,
    coordinates: order.coordinates,
    notes: order.notes || '',
    quantity: order.quantity as number,
    selectedBidder: order.selectedBidder,
  };
};

export class Offer implements IOffer {
  concrete: IOfferData = {
    label: 'C 16/20',
    price: '',
    quantity: 0,
    isNew: false, // this value is used just in in scheduled or in delivery
  };
  pumping: IOfferData = {
    label: 'Pumping service',
    price: '',
    quantity: 0,
    isNew: false,
  };
  transport: IOfferData = {
    label: 'Transport',
    price: '',
    quantity: 0,
    isNew: false,
  };
  availableHours = [];
}

export class OfferData implements IOfferData {
  label: string = '';
  price: string = '';
  quantity: number = 0;
  isNew: boolean = false;
}

export enum OfferTypeEnum {
  Concrete = 'concrete',
  Pumping = 'pumping',
  Transport = 'transport',
}

export enum ConfirmationTypeEnum {
  DELETE_ORDER = 'DELETE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  CANCEL_OFFER = 'CANCEL_OFFER',
  FINISH_ORDER = 'FINISH_ORDER',
  START_DELIVERY = 'START_DELIVERY',
}

export interface IError {
  type?: string;
  code?: string;
  messages?: string[];
}

export class Error implements IError {
  type = '';
  code = '';
  messages = [];
}


export interface IAddress {
  city: string;
  state: string;
  country: string;
  postalCode: string;
  formattedAddress: string;
  countryShort: string;
  url: string;
  location: object;
}

export class Address implements IAddress {
  city = '';
  state = '';
  country = '';
  postalCode = '';
  formattedAddress = '';
  countryShort = '';
  url = '';
  location = {};
}

export enum CurrencyEnum {
  RON = 'RON',
  EUR = 'EUR',
  USD = 'USD',
  SEK = 'SEK',
  NOK = 'NOK',
  DKK = 'DKK',
  CHF = 'CHF',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  NZD = 'NZD',
  HKD = 'HKD',
  SGD = 'SGD',
  ZAR = 'ZAR',
  HUF = 'HUF',
  CZK = 'CZK',
}

export enum InfoModalEnum {
  BASIC = 'basic',
  PAYMENT_FAILED = 'payment_failed',
  INSUFFICIENT_FOUNDS = 'insufficient_founds',
  PAYMENT_CONFIRMED = 'payment_confirmed',
}

export enum InfoModalActionTypeEnum {
  BASIC = 'basic',
  GO_BACK = 'go_back',
  COLLECT_MONEY = 'collect_money',
}

export class InfoModalData {
  type: InfoModalEnum = InfoModalEnum.BASIC;
  title: string = '';
  subtitle: string = '';
  buttonText: string = 'OK';
  buttonTextSecondary: string = '';
  isVisible: boolean = false;
  actionInput: any = null;
  actionType: InfoModalActionTypeEnum = InfoModalActionTypeEnum.BASIC;
  actionTypeSecondary: InfoModalActionTypeEnum = InfoModalActionTypeEnum.BASIC;
  filterForOrderList?: FilterItem = undefined;
  filterForOrderListSecondary?: FilterItem = undefined;
}
