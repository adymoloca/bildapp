import { RoleEnum } from './interfaces';

const generateEndpoint = (userType: RoleEnum) => {
  return {
    login: `${userType}/user/login`,
    commonLogin: '/common/login',
    registerClient: `${userType}/user/account`,
    // registerSupplier: `${userType}/company/account`,
    registerSupplier: '/admin/company/account',
    activate: '/activate/:id',
    forgotPassword: `/common/forgotPassword`,
    changePassword: `${userType}/user/password`,
    refresh: `${userType}/user/tokens`,
    getDeviceId: '/uuid',
    getSupplierList: `${userType}/order/suppliers`,
    getOrderList: `${userType}/order/list`,
    createOrder: `${userType}/order`,
    bidForOrder: `${userType}/order/bid`,
    cancelOrder: `${userType}/order/cancel`,
    deleteOrder: `${userType}/order/delete`,
    cancelOffer: `${userType}/order/cancel/offer`,
    confirmOffer: `${userType}/order/confirm`,
    startDelivery: `${userType}/order/driver/location`,
    finishOrder: `${userType}/order/delivered`,
    getSetupIntent: `${userType}/user/setupIntent`,
    getPaymentsMethods: `${userType}/user/paymentsMethods/list`,
    setDefaultPaymentMethod: `${userType}/user/paymentsMethods/default`,
    deletePaymentMethod: `${userType}/user/paymentsMethods/delete`,    
    timeInterval: `${userType}/order/time/interval`,
    updateOrder: `${userType}/order`,
    userInfo: `${userType}/user/info`,
    invoiceDetails: `${userType}/user/invoice-details`,
    representative: `${userType}/user/representative`,
    checkStipeAccount: `${userType}/user/check-stipe-account`,
    companyDetails: `${userType}/user/company-details`,
    paymentsHistory: `${userType}/order/list/payments`,
    updateOrderPaymentMethod: `${userType}/order/update/payment-method`,
    defaultCardBySetupIntent: `${userType}/user/paymentsMethods/default/setupIntent`,
  };
};

export const endpointListClient = generateEndpoint(RoleEnum.CLIENT);
export const endpointListSupplier = generateEndpoint(RoleEnum.SUPPLIER);

export const endpointListCommon = (userType: RoleEnum) => generateEndpoint(userType);
