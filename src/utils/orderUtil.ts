import { IOrder } from './interfaces';

export enum OrderStatus {
  InDelivery = 'InDelivery',
  New = 'New',
  Scheduled = 'Scheduled',
  Canceled = 'Canceled',
  Completed = 'Completed',
}

export const getOrderStatus = (order: IOrder): OrderStatus => {
  if (order.canceledByCustomer || order.canceledBySupplier) {
    return OrderStatus.Canceled;
  } if (order.delivered) {
    return OrderStatus.Completed;
  } if (order.selectedBidder && order.driverLocation) {
    return OrderStatus.InDelivery;
  } else if (order.selectedBidder) {
    return OrderStatus.Scheduled;
  } else {
    return OrderStatus.New;
  }
}

export enum FilterItem {
  All = 'all',
  Auction = 'auction',
  Ongoing = 'ongoing',
  InDelivery = 'inDelivery',
  Completed = 'completed',
  Canceled = 'canceled',
}

export const formatAddress = (address: string): string => {
  if (address) {
    return address.split(',')?.[0] || address;
  } else {
    return '';
  }
};

export const filterItems = [
  FilterItem.All, FilterItem.Auction, FilterItem.Ongoing, FilterItem.InDelivery, FilterItem.Completed, FilterItem.Canceled
];

export const addStatusToList = (list: IOrder[]): IOrder[] => {
  return list.map(order => ({ ...order, status: getOrderStatus(order) }));
};

export const getFilteredItems = (value: FilterItem, orderList: IOrder[], searchText: string) => {
  let filteredOrders: IOrder[] = [];

  switch (value) {
    case FilterItem.All:
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText)
      );
      break;
    case FilterItem.Auction: // new
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText, OrderStatus.New)
      );
      break;
    case FilterItem.Ongoing: // scheduled
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText, OrderStatus.Scheduled)
      );
      break;
    case FilterItem.InDelivery:
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText, OrderStatus.InDelivery)
      );
      break;
    case FilterItem.Completed:
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText, OrderStatus.Completed)
      );
      break;
    case FilterItem.Canceled:
      filteredOrders = orderList.filter(
        (order: IOrder) => validateOrderByFilter(order, searchText, OrderStatus.Canceled)
      );
      break;
    default:
      break;
  }

  return filteredOrders;
};

const validateOrderByFilter = (order: IOrder, searchText?: string, orderStatus?: OrderStatus): boolean => {
  const text = `${order.address?.toLowerCase() || ''} ${(order.fullName?.toLowerCase() || '')} ${(order.phone?.toLowerCase() || '')}`;
  if (searchText && orderStatus) {
    return text.includes(searchText.toLowerCase()) && order.status === orderStatus;
  }
  if (searchText) {
    return text.includes(searchText.toLowerCase());
  }
  if (orderStatus) {
    return order.status === orderStatus;
  }
  return true;
};
