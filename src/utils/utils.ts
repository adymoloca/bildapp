import { authRouteList, clientRouteList, supplierRouteList } from '../containers/routes';
import { IAuthRoute, IClientRoute, ISupplierRoute } from './interfaces';

export const getCurrentRoutes = (isLoggedIn: boolean, isClient: boolean): IAuthRoute[] | IClientRoute[] | ISupplierRoute[] => {
  if (isLoggedIn) {
    return authRouteList;
  }
  if (isClient) {
    return clientRouteList;
  } else {
    return supplierRouteList;
  }
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateName = (name: string) => {
  const re = /^[a-zA-Z ]+$/;
  return re.test(name);
};

export const validatePhone = (phone: string) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
};

export const validatePassword = (password: string) => {
  const re = /^.{6,}$/;
  return re.test(password);
};

export const validateBankAccount = (bankAccount: string) => {
  const re = /^([a-zA-Z0-9]{9,24})$/;
  return re.test(bankAccount);
};

export const validateNoRegCom = (noRegCom: string) => {
  const re = /^([a-zA-Z0-9]{7,10})$/;
  return re.test(noRegCom);
};
export const validateCif = (cif: string) => {
  const re = /^([\/a-zA-Z0-9]{7,15})$/;
  return re.test(cif);
};
