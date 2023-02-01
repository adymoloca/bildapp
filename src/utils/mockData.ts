import { IOrder, ISupplierPayment, ITransaction } from './interfaces';


export const mockSupplierBidOrders = [
  {
    _id: '1',
    selectedBidder: {},
    quantity: 123,
  },
  {
    _id: '2',
    selectedBidder: undefined,
    quantity: 123,
  },
  {
    _id: '4',
    selectedBidder: {},
    quantity: 123,
  },
];

const getToday = () =>
  `${new Date().getDate()}.${new Date().getMonth() + 1
  }.${new Date().getFullYear()}`;

export const mockSupplierOpenOrders: IOrder[] = [
  {
    _id: '1',
    orderId: 1,
    quantity: 123,
    bidders: [],
    alreadyBid: false,
    driverLocation: undefined,
    selectedBidder: undefined,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '13:00',
    requestPump: true,
    concreteType: 1,
    time: { start: 13, end: 15 },
  },
  {
    _id: '2',
    orderId: 2,
    quantity: 123,
    bidders: [
      {
        price: 1000,
        advancePrice: 100,
        reviewAverage: 4.75,
        reviewCount: 126,
        company: 'S.C. GILTRANS S.R.L.',
      },
      {
        price: 1500,
        advancePrice: 150,
        reviewAverage: 3.25,
        reviewCount: 234,
        company: 'Beton Ionut si Asociatii Import Export S.R.L.',
      },
    ],
    selectedBidder: { id: 1 },
    alreadyBid: true,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '8:00',
    requestPump: false,
    concreteType: 1,
    time: { start: 13, end: 14 },
  },
  {
    _id: '3',
    orderId: 3,
    quantity: 123,
    bidders: [],
    alreadyBid: false,
    driverLocation: { lat: 20, lng: 20 },
    selectedBidder: { id: 1 },
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '14:00',
    requestPump: true,
    concreteType: 1,
    time: { start: 17, end: 22 },
  },
  {
    _id: '4',
    orderId: 4,
    quantity: 123,
    bidders: [],
    selectedBidder: undefined,
    driverLocation: undefined,
    alreadyBid: false,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '13:00',
    delivered: true,
    requestPump: true,
    concreteType: 1,
    time: { start: 10, end: 13 },
  },
  {
    _id: '5',
    orderId: 5,
    quantity: 123,
    bidders: [],
    selectedBidder: { id: 1 },
    driverLocation: undefined,
    alreadyBid: false,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '16:00',
    delivered: true,
    requestPump: true,
    concreteType: 1,
    time: { start: 11, end: 12 },
  },
  {
    _id: '9',
    orderId: 9,
    quantity: 123,
    bidders: [],
    selectedBidder: { id: 1 },
    driverLocation: undefined,
    alreadyBid: false,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '16:00',
    delivered: true,
    requestPump: true,
    concreteType: 3,
    time: { start: 8, end: 15 },
  },
  {
    _id: '6',
    orderId: 6,
    quantity: 123,
    bidders: [
      {
        price: 1000,
        advancePrice: 100,
        reviewAverage: 4.75,
        reviewCount: 126,
        company: 'S.C. GILTRANS S.R.L.',
      },
      {
        price: 1500,
        advancePrice: 150,
        reviewAverage: 3.25,
        reviewCount: 234,
        company: 'Beton Ionut si Asociatii Import Export S.R.L.',
      },
    ],
    selectedBidder: undefined,
    alreadyBid: true,
    name: 'Georgescu Mihai',
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: getToday(),
    deliveryTime: '16:00',
    requestPump: true,
    concreteType: 1,
    time: { start: 20, end: 21 },
  },
];


export const mockSupplierList = [
  {
    _id: '1',
    company: 'S.C. GILTRANS S.R.L.',
    location: 'Str. Gorjului 62H, Bucuresti, Romania',
    reviewAverage: 4.75,
    reviewsSum: 126,
    email: '',
    numberOfReviews: 10,
    deliveryRange: 50,
  },
  {
    _id: '2',
    company: 'Beton Ionut si Asociatii Import Export S.R.L.',
    location: 'Calea Plevnei 145B, Bucuresti, Romania',
    reviewAverage: 3.25,
    reviewsSum: 234,
    email: '',
    numberOfReviews: 10,
    deliveryRange: 50,
  },
  {
    _id: '3',
    company: 'S.C. Beton Production S.R.L.',
    location: 'Calea Plevnei 145B, Bucuresti, Romania',
    reviewAverage: 4.89,
    reviewsSum: 8,
    email: '',
    numberOfReviews: 10,
    deliveryRange: 50,
  },
];

export const mockSupplierOngoingOrders = mockSupplierOpenOrders.map(
  (order) => ({
    ...order,
    selectedBidder:
      order.orderId === 6 || order.orderId === 2
        ? undefined
        : {
          id: '1',
          dateTime: `16.8.2021,${order.deliveryTime}`,
          currentBids: [],
        },
  }),
);

export const mockClientOrders = [
  {
    orderId: 1,
    company: undefined,
    selectedBidder: undefined,
    driverLocation: undefined,
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: '12.5.2021',
    deliveryTime: '13:00',
    quantity: 1000,
    concreteType: 1,
    bidders: [],
  },
  {
    orderId: 1,
    company: undefined,
    selectedBidder: undefined,
    driverLocation: undefined,
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: '12.5.2021',
    deliveryTime: '13:00',

    quantity: 1000,
    concreteType: 1,
    bidders: [
      {
        price: 1000,
        advancePrice: 100,
        reviewAverage: 4.75,
        reviewCount: 126,
        company: 'S.C. GILTRANS S.R.L.',
      },
      {
        price: 1500,
        advancePrice: 150,
        reviewAverage: 3.25,
        reviewCount: 234,
        company: 'Beton Ionut si Asociatii Import Export S.R.L.',
      },
    ],
  },
  {
    orderId: 2,
    company: 'S.C. GILTRANS S.R.L.',
    selectedBidder: { dateTime: ', 12:00 AM' },
    driverLocation: undefined,
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: '12.5.2021',
    deliveryTime: '13:00',

    quantity: 1000,
    concreteType: 1,
    bidders: [],
  },
  {
    orderId: 2,
    company: 'S.C. GILTRANS S.R.L.',
    selectedBidder: { dateTime: ', 12:00 AM' },
    driverLocation: { lat: 20, lng: 20 },
    address: 'Str. Gorjului 62H, Bucuresti 063335, Romania',
    deliveryDate: '12.5.2021',
    deliveryTime: '13:00',

    quantity: 1000,
    concreteType: 1,
    bidders: [],
  },
];

export const mockRecentSearches = [
  {
    address: 'Piața Unirii',
    city: 'București',
    latitude: 44.42713,
    longitude: 26.1024375,
  },
  {
    address: 'Calea Plevnei 145B',
    city: 'București',
    latitude: 44.4438879,
    longitude: 26.0660572,
  },
];

export const paymentList: { title: string; data: ITransaction[] }[] = [
  {
    title: '22 February 2022',
    data: [
      {
        id: '0',
        name: 'Alexandru',
        transactionDate: new Date('2022-02-22 10:34:23'),
        ammount: 350.01,
        currency: 'RON',
        storno: false,
        cardType: 'visa',
      },
      {
        id: '1',
        name: 'Alexandru',
        transactionDate: new Date('2022-02-22 14:34:23'),
        ammount: 1604.99,
        currency: 'RON',
        storno: false,
        cardType: 'visa',
      },
    ],
  },
  {
    title: '17 February 2022',
    data: [
      {
        id: '3',
        name: 'Alexandru',
        transactionDate: new Date('2022-02-17 16:34:23'),
        ammount: 50.13,
        currency: 'RON',
        storno: false,
        cardType: 'visa',
      },
    ],
  },
  {
    title: '09 February 2022',
    data: [
      {
        id: '4',
        name: 'Alexandru',
        transactionDate: new Date('2022-02-09 01:34:23'),
        ammount: 350.01,
        currency: 'RON',
        storno: false,
        cardType: 'visa',
      },
      {
        id: '5',
        name: 'Alexandru',
        transactionDate: new Date('2022-02-09 22:34:23'),
        ammount: 270.55,
        currency: 'RON',
        storno: false,
        cardType: 'visa',
      },
    ],
  },
];


export const supplierPaymentList: ISupplierPayment[] = [
  {
    id: 'txn_3L8VxGRENVG2Tm4p14W7Wyaf',
    amount: 4000,
    created: 1655013205376,
    currency: 'ron',
    fee: 216,
    name: 'Andrei'
  },
  {
    id: 'txn_3L8FxGRENVG2Tm4p14W7Wyaf',
    amount: 2000,
    created: 1655013205376,
    currency: 'ron',
    fee: 333,
    name: 'Andrei Georgescu'
  },
  {
    id: 'txn_3L8VwbRENVG2Tm4p13IuHsH1',
    amount: 100000,
    created: 1654813205376,
    currency: 'ron',
    fee: 13000,
    name: 'Cristi Popescu'
  },
  {
    id: 'txn_3L8VwbRENVG2Tm4p13IuHsF2',
    amount: 9900,
    created: 1644363263000,
    currency: 'ron',
    fee: 7000,
    name: 'Alexandru'
  },
  {
    id: 'txn_3L8VwbRENVG2Tm4p13IujhF2',
    amount: 1000,
    created: 1644595264003,
    currency: 'ron',
    fee: 30,
    name: 'Alexandru Andrei Popa'
  },
  {
    id: 'txn_3L8VwbRENVG4Tm4p13IujhF2',
    amount: 900,
    created: 1644596264003,
    currency: 'ron',
    fee: 10,
    name: 'George Popa'
  }
];

export const supplierPaymentListResponse = {
  data: {
    success: true,
    error: {},
    data: [...supplierPaymentList]
  }
};
