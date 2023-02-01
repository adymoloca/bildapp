import { endpointListClient, endpointListSupplier, endpointListCommon } from '../../utils/constants';
import { IAuthenticationRequest, IBidder, IBidRequest, IGetDeviceTokenResponse, IOrder, IClientRegisterRequest, RoleEnum, IChangePasswordRequest, ITimeInterval, IUpdateOrder, ICard, IClientCompany, IRepresentative, ISupplierCompany, ISupplierRegisterRequest, IChangePassword, IForgetPassword } from '../../utils/interfaces';
import axiosInstance from './axiosInstance';


export const loginUser = async (data: IAuthenticationRequest): Promise<any> => {
  return await axiosInstance.post(endpointListClient.login, data);
};
export const loginSupplier = async (data: IAuthenticationRequest): Promise<any> => {
  return await axiosInstance.post(endpointListSupplier.login, data);
};
export const commonLogin = async (data: IAuthenticationRequest): Promise<any> => {
  return await axiosInstance.post(endpointListClient.commonLogin, data);
};

export const changePassword = async (data: IChangePassword, role: RoleEnum): Promise<any> => {
  return await axiosInstance.put(endpointListCommon(role).changePassword, data);
};

export const forgetPassword = async (data: IForgetPassword): Promise<any> => {
  return await axiosInstance.put(endpointListClient.forgotPassword, data);
};

export const registerClient = async (data: IClientRegisterRequest): Promise<any> => {
  return await axiosInstance.post(endpointListClient.registerClient, data);
};

export const registerSupplier = async (data: ISupplierRegisterRequest): Promise<any> => {
  return await axiosInstance.post(endpointListClient.registerSupplier, data);
};

export const getDeviceId = async (): Promise<IGetDeviceTokenResponse> => {
  return await axiosInstance.get(endpointListClient.getDeviceId);
};

export const getSupplierList = async (orderLocation: string): Promise<any> => {
  return await axiosInstance.get(`${endpointListClient.getSupplierList}?orderLocation=${orderLocation}`);
};

export const getUserInfo = async (role: RoleEnum): Promise<any> => {
  return await axiosInstance.get(endpointListCommon(role).userInfo);
};

export const putUserInfo = async (role: RoleEnum, data: any): Promise<any> => {
  return await axiosInstance.put(endpointListCommon(role).userInfo, data);
};

export const getOrderList = async (role: RoleEnum): Promise<any> => {
  return await axiosInstance.get(endpointListCommon(role).getOrderList);
};

export const createOrder = async (data: IOrder, role: RoleEnum): Promise<any> => {
  return await axiosInstance.post(endpointListCommon(role).createOrder, data);
};

export const bidForOrder = async (data: IBidRequest): Promise<any> => {
  return await axiosInstance.put(endpointListSupplier.bidForOrder, data);
};

export const cancelOrder = async (data: { orderId: string }, role: RoleEnum): Promise<any> => {
  return await axiosInstance.put(endpointListCommon(role).cancelOrder, data);
};

export const deleteOrder = async (data: { orderId: string }): Promise<any> => {
  return await axiosInstance.put(endpointListClient.deleteOrder, data);
};

export const cancelOffer = async (data: { orderId: string }, role: RoleEnum): Promise<any> => {
  return await axiosInstance.put(endpointListCommon(role).cancelOffer, data);
};

export const confirmOffer = async (data: IBidder, orderId: string, time: ITimeInterval, paymentMethodId: string): Promise<any> => {
  return await axiosInstance.put(endpointListClient.confirmOffer, { ...data, orderId, time, paymentMethodId });
};

export const startDelivery = async (orderId: string): Promise<any> => {
  return await axiosInstance.post(endpointListSupplier.startDelivery, { orderId, driveLocation: { lat: 0, long: 0 } });//TODO: decide if use this endpoint or another for startDelivery
};

export const finishOrder = async (orderId: string, captureAvailable: boolean): Promise<any> => {
  return await axiosInstance.put(endpointListSupplier.finishOrder, { orderId, captureAvailable });
};

export const createStripeCustomer = async (): Promise<any> => {
  return await axiosInstance.get(endpointListClient.getSetupIntent);
};

export const getPaymentsMethods = async (): Promise<ICard[]> => {
  return await axiosInstance.get(endpointListClient.getPaymentsMethods);
};

export const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<any> => {
  return await axiosInstance.post(endpointListClient.setDefaultPaymentMethod, { paymentMethodId });
};

export const deletePaymentMethod = async (paymentMethodId: string): Promise<any> => {
  return await axiosInstance.put(endpointListClient.deletePaymentMethod, { paymentMethodId });
};

export const updateTimeInterval = async (orderId: string, time: ITimeInterval): Promise<any> => {
  return await axiosInstance.put(endpointListSupplier.timeInterval, { orderId, time });
};

export const updateOrder = async (data: IUpdateOrder, role: RoleEnum): Promise<any> => {
  return await axiosInstance.put(endpointListCommon(role).updateOrder, data);
};
export const updateOrderPaymentMethod = async (orderId: string, paymentMethodId: string): Promise<any> => {
  return await axiosInstance.put(endpointListClient.updateOrderPaymentMethod, {orderId, paymentMethodId});
};
export const updateInvoiceDetails = async (data: ISupplierCompany): Promise<any> => {
  return await axiosInstance.put(endpointListSupplier.invoiceDetails, data);
};

export const getInvoiceDetails = async (): Promise<any> => {
  return await axiosInstance.get(endpointListSupplier.invoiceDetails);
};

export const updateClientCompanyDetails = async (data: IClientCompany): Promise<any> => {
  return await axiosInstance.put(endpointListClient.companyDetails, data);
};

export const getClientCompanyDetails = async (): Promise<any> => {
  return await axiosInstance.get(endpointListClient.companyDetails);
};

export const updateRepresentative = async (data: FormData): Promise<any> => {
  return await axiosInstance.post(endpointListSupplier.representative, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, headers) => {
      // !!! override data to return formData
      // since axios converts that to string
      return data;
    }
  });
};

export const getRepresentative = async (): Promise<any> => {
  return await axiosInstance.get(endpointListSupplier.representative);
};

export const getCanSendCardOffer = async (): Promise<any> => {
  return await axiosInstance.get(endpointListSupplier.checkStipeAccount);
};

export const getPaymentsHistory = async (): Promise<any> => {
  return await axiosInstance.get(endpointListSupplier.paymentsHistory);
};

export const setDefaultCardBySetupIntent = async (setupIntentId: string): Promise<any> => {
  return await axiosInstance.post(endpointListClient.defaultCardBySetupIntent, {setupIntentId});
};

