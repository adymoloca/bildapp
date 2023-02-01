import { SupplierPathList, AuthPathList, ClientPathList } from '../utils/enums';

import { IAuthRoute, IClientRoute, ISupplierRoute } from '../utils/interfaces';

import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen/ForgotPasswordScreen';

import OrderListScreen from './OrderListScreen/OrderListScreen';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import PaymentListScreen from './PaymentListScreen/PaymentListScreen';
import MapScreen from './MapScreen/MapScreen';
import EditAccountDetailsScreen from './EditAccountDetailsScreen';
import AppointmentScreen from './AppointmentScreen/AppointmentScreen';
import SupplierListScreen from './SupplierListScreen/SupplierListScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import InvoiceDetailsScreen from './InvoiceDetailsScreen';
import InvoiceDetailsClientScreen from './InvoiceDetailsClientScreen';
import RepresentativeDetailsScreen from './RepresentativeDetailsScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import SettingsScreen from './SettingsScreen';
import HelpScreen from './HelpScreen';
import MyCardsScreen from './ClientPayment/MyCardsScreen';
import AddCardScreen from './ClientPayment/AddCardScreen';
import SupplierAccountScreen from './SupplierAccountScreen';
import EditOrderScreen from './EditOrderScreen/EditOrderScreen';
import EditQuantitiesScreen from './EditOrderScreen/EditQuantitiesScreen';
import AppointmentDraftScreen from './AppointmentScreen/AppointmentDraftScreen';
import AccountTypeScreen from './AccountTypeScreen';
import ProductsScreen from './ProductsScreen';
import SearchScreen from './SearchScreen';
import InvoiceDetailsOrderScreen from './InvoiceDetailsOrderScreen';

const authRouteList: IAuthRoute[] = [
  {
    index: 0,
    name: AuthPathList.LOGIN,
    component: LoginScreen,
    options: {
      unmountOnBlur: true,
    },
  },
  {
    index: 1,
    name: AuthPathList.REGISTER,
    component: RegisterScreen,
    options: {
      unmountOnBlur: true,
    },
  },
  {
    index: 2,
    name: AuthPathList.ACCOUNT_TYPE,
    component: AccountTypeScreen,
    options: {
      unmountOnBlur: true,
    },
  },
  {
    index: 3,
    name: AuthPathList.FORGOT_PASSWORD,
    component: ForgotPasswordScreen,
    options: {
      unmountOnBlur: true,
    },
  },
];

const clientRouteList: IClientRoute[] = [
  {
    index: 0,
    name: ClientPathList.APPOINTMENT_STACK,
    component: undefined,
    options: {
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
    subList: [
      {
        index: 0,
        name: ClientPathList.PRODUCT_LIST,
        component: ProductsScreen,
        options: {
        },
        isDisplayedInDrawer: false,
        isHeaderShown: false,
        initialParams: {},

      },
      {
        index: 1,
        name: ClientPathList.MAP,
        component: MapScreen,
        options: {
        },
        isDisplayedInDrawer: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 2,
        name: ClientPathList.APPOINTMENT,
        component: AppointmentScreen,
        options: {
        },
        isDisplayedInDrawer: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 3,
        name: ClientPathList.SUPPLIER_LIST,
        component: SupplierListScreen,
        options: {
        },
        isDisplayedInDrawer: false,
        isHeaderShown: false,
        initialParams: {},
      },
    ]
  },

  {
    index: 1,
    name: ClientPathList.ORDER_LIST,
    component: OrderListScreen,
    options: {
    },
    isDisplayedInDrawer: true,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 2,
    name: ClientPathList.PAYMENT_METHOD,
    component: MyCardsScreen,
    options: {
    },
    isDisplayedInDrawer: true,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 3,
    name: ClientPathList.ADD_CARD,
    component: AddCardScreen,
    options: {
      unmountOnBlur: true
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 4,
    name: ClientPathList.SETTINGS,
    component: SettingsScreen,
    options: {
    },
    isDisplayedInDrawer: true,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 5,
    name: ClientPathList.HELP,
    component: HelpScreen,
    options: {
    },
    isDisplayedInDrawer: true,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 6,
    name: ClientPathList.ORDER_DETAILS,
    component: OrderDetailsScreen,
    options: {
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 7,
    name: ClientPathList.EDIT_ACCOUNT,
    component: EditAccountDetailsScreen,
    options: {
      unmountOnBlur: true
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 8,
    name: ClientPathList.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
    options: {
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 9,
    name: ClientPathList.INVOICE_DETAILS,
    component: InvoiceDetailsClientScreen,
    options: {
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 10,
    name: ClientPathList.SEARCH_ADDRESS,
    component: SearchScreen,
    options: {
    },
    isDisplayedInDrawer: false,
    isHeaderShown: false,
    initialParams: {
    },
  },
];

const supplierRouteList: ISupplierRoute[] = [
  {
    index: 0,
    name: SupplierPathList.ORDER_LIST,
    component: OrderListScreen,
    options: {
    },
    isInBottomBar: true,
    isBottomBarShown: true,
    isHeaderShown: false,
    initialParams: {},
    icon: 'home',
    identifier: 'orders'
  },
  {
    index: 1,
    name: SupplierPathList.CALENDAR_STACK,
    component: CalendarScreen,
    options: {
    },
    isInBottomBar: true,
    isBottomBarShown: true,
    isHeaderShown: false,
    initialParams: {},
    icon: 'calendar',
    identifier: 'calendar',
    subList: [
      {
        index: 0,
        name: SupplierPathList.CALENDAR,
        component: CalendarScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 1,
        name: SupplierPathList.APPOINTMENT_DRAFT,
        component: AppointmentDraftScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 3,
        name: SupplierPathList.SEARCH_ADDRESS,
        component: SearchScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
    ]
  },
  {
    index: 2,
    name: SupplierPathList.PAYMENT_LIST,
    component: PaymentListScreen,
    options: {
    },
    isInBottomBar: true,
    isBottomBarShown: true,
    isHeaderShown: false,
    initialParams: {},
    icon: 'wallet',
    identifier: 'payments'
  },
  {
    index: 3,
    name: SupplierPathList.SUPPLIER_ACCOUNT,
    component: SupplierAccountScreen,
    options: {
    },
    isInBottomBar: true,
    isBottomBarShown: true,
    isHeaderShown: false,
    initialParams: {},
    icon: 'person',
    identifier: 'account',
    notification: true,
  },
  {
    index: 4,
    name: SupplierPathList.ORDER_STACK,
    component: undefined,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
    subList: [
      {
        index: 0,
        name: SupplierPathList.ORDER_DETAILS,
        component: OrderDetailsScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 1,
        name: SupplierPathList.EDIT_ORDER,
        component: EditOrderScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 2,
        name: SupplierPathList.EDIT_PAYMENT_ORDER,
        component: EditQuantitiesScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
      {
        index: 3,
        name: SupplierPathList.SEARCH_ADDRESS,
        component: SearchScreen,
        options: {
        },
        isInBottomBar: false,
        isBottomBarShown: false,
        isHeaderShown: false,
        initialParams: {},
      },
    ]
    // icon: 'profile_circled'
  },
  {
    index: 5,
    name: SupplierPathList.INVOICE_DETAILS,
    component: InvoiceDetailsScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
    // icon: 'profile_circled'
  },
  {
    index: 6,
    name: SupplierPathList.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
    // icon: 'profile_circled'
  },
  {
    index: 7,
    name: SupplierPathList.SETTINGS,
    component: SettingsScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 8,
    name: SupplierPathList.EDIT_ACCOUNT,
    component: EditAccountDetailsScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 9,
    name: SupplierPathList.HELP,
    component: HelpScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 10,
    name: SupplierPathList.REPRESENTATIVE,
    component: RepresentativeDetailsScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
    // icon: 'profile_circled'
  },
  {
    index: 11,
    name: SupplierPathList.SEARCH_ADDRESS,
    component: SearchScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
  },
  {
    index: 12,
    name: SupplierPathList.INVOICE_DETAILS_ORDER,
    component: InvoiceDetailsOrderScreen,
    options: {
    },
    isInBottomBar: false,
    isBottomBarShown: false,
    isHeaderShown: false,
    initialParams: {},
    // icon: 'profile_circled'
  },
];

export { authRouteList, clientRouteList, supplierRouteList };
