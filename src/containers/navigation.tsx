import React, {useEffect} from 'react';
import {
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {clientRouteList, authRouteList, supplierRouteList} from './routes';
import {
  IAuthRoute,
  IClientRoute,
  ISupplierRoute,
  IUser,
} from '../utils/interfaces';
import HeaderBar from '../components/HeaderBar';
import {Colors, Fonts} from '../themes';
import CustomIcon from '../atoms/CustomIcon';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  actions as applicationActions,
  selectIsClient,
  selectIsLoggedIn,
} from '../redux/slices/applicationSlice';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';
import i18n from '../services/i18n';
import GlobalLtrStyle from '../themes/styles/global.ltr.style';
import MapScreenLtrStyle from '../themes/styles/mapScreen.ltr.style';
import {ClientPathList, SupplierPathList} from '../utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  actions as userActions,
  selectClientDetails,
} from '../redux/slices/userSlice';
import CustomStatusBar from '../components/CustomStatusBar';
import FillYourDataModal from '../components/FillYourDataModal';
import {RootState} from '../redux/store';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.white,
    background: Colors.white,
  },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationStack = () => {
  const language = useSelector(
    (state: RootState) => state.application.language,
  );
  useEffect(() => {
    if (language) {
      i18n.locale = language;
    }
  }, []);
  return (
    <NavigationContainer theme={CustomTheme}>
      <StackNavigator />
      <FillYourDataModal />
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? (
        authRouteList.map((route: IAuthRoute) => (
          <Stack.Screen
            key={route.index}
            name={route.name}
            component={route.component}
            options={{...route.options}}
          />
        ))
      ) : (
        <Stack.Screen name={'App'} component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};

const AppNavigator = (props: any) => {
  const {route, navigation} = props;

  const isClient = useAppSelector(selectIsClient);

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'App';
  const routeList: IClientRoute[] | ISupplierRoute[] | any = isClient
    ? clientRouteList
    : supplierRouteList;
  const currentRoute: IClientRoute | ISupplierRoute =
    routeList.find((route: IClientRoute | ISupplierRoute) => {
      return route.name === routeName;
    }) || routeList[0];

  return (
    <>
      <HeaderBar
        isHidden={!currentRoute.isHeaderShown}
        leftComponent={
          <CustomIcon
            size={Fonts.h5}
            color={Colors.black}
            onPress={navigation.goBack}
            name="arrow-back-outline"
          />
        }
        noBorder={true}
      />
      {isClient ? (
        <Drawer.Navigator
          backBehavior="history"
          screenOptions={{
            headerShown: false,
            drawerType: 'front',
            drawerActiveTintColor: 'black',
          }}
          drawerContent={props => <SideDrawer {...props} />}>
          {clientRouteList.map((route: IClientRoute) =>
            route.subList ? (
              <Drawer.Screen
                key={`${route.index}`}
                component={AppointmentStack}
                name={route.name}
                options={{
                  ...route.options,
                  drawerItemStyle: route.isDisplayedInDrawer
                    ? {}
                    : {display: 'none'},
                }}
              />
            ) : (
              <Drawer.Screen
                key={`${route.index}`}
                name={route.name}
                component={route.component}
                options={{
                  ...route.options,
                  drawerItemStyle: route.isDisplayedInDrawer
                    ? {}
                    : {display: 'none'},
                }}
              />
            ),
          )}
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {supplierRouteList.map((route: ISupplierRoute) => {
            if (route.subList !== undefined) {
              return (
                <Stack.Screen
                  key={`${route.index}`}
                  component={
                    route.name === SupplierPathList.CALENDAR_STACK
                      ? CalendarStack
                      : OrderStack
                  }
                  name={route.name}
                  options={{...route.options}}
                />
              );
            } else {
              return (
                <Stack.Screen
                  key={`${route.index}`}
                  name={route.name}
                  component={route.component}
                  options={{...route.options}}
                />
              );
            }
          })}
        </Stack.Navigator>
      )}
    </>
  );
};

const AppointmentStack = (props: any) => {
  const subList =
    clientRouteList.find(item => item.name === ClientPathList.APPOINTMENT_STACK)
      ?.subList || [];
  return (
    <Stack.Navigator
      initialRouteName={ClientPathList.PRODUCT_LIST}
      screenOptions={{
        headerShown: false,
      }}>
      {subList.map((route: IClientRoute) => (
        <Stack.Screen
          key={`${route.index}`}
          name={route.name}
          component={route.component}
          options={{...route.options}}
        />
      ))}
    </Stack.Navigator>
  );
};

const OrderStack = (props: any) => {
  const subList =
    supplierRouteList.find(item => item.name === SupplierPathList.ORDER_STACK)
      ?.subList || [];

  return (
    <Stack.Navigator
      initialRouteName={SupplierPathList.ORDER_DETAILS}
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}>
      {subList.map((route: ISupplierRoute) => (
        <Stack.Screen
          key={`${route.index}`}
          name={route.name}
          component={route.component}
          options={{...route.options}}
        />
      ))}
    </Stack.Navigator>
  );
};

const CalendarStack = (props: any) => {
  const subList =
    supplierRouteList.find(
      item => item.name === SupplierPathList.CALENDAR_STACK,
    )?.subList || [];

  return (
    <Stack.Navigator
      initialRouteName={SupplierPathList.CALENDAR}
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}>
      {subList.map((route: ISupplierRoute) => (
        <Stack.Screen
          key={`${route.index}`}
          name={route.name}
          component={route.component}
          options={{...route.options}}
        />
      ))}
    </Stack.Navigator>
  );
};

const SideDrawer = (props: any) => {
  return (
    <>
      <CustomStatusBar />
      <View>
        <View />
        <TouchableOpacity testID="drawer_close_button"></TouchableOpacity>
      </View>
      <DrawerAccountListItem navigation={props.navigation} />
      <DrawerItems {...props} />
    </>
  );
};

const DrawerAccountListItem = ({navigation}: any) => {
  const dispatch = useDispatch();
  const onGetClientDetails = () => dispatch(userActions.getClientDetails());
  useEffect(() => {
    onGetClientDetails();
  }, []);
  const clientDetails: IUser = useSelector(selectClientDetails);
  const onNavigateToAccount = () => {
    navigation.navigate(ClientPathList.EDIT_ACCOUNT);
  };
  return (
    <View style={MapScreenLtrStyle.sideMenuTopView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          paddingVertical: 20,
        }}>
        <View
          style={{
            height: 50,
            borderRadius: 25,
            width: 50,
            backgroundColor: 'rgba(205, 209, 217, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomIcon size={Fonts.h4} name="person-fill" iconPack="custom" />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 15,
            justifyContent: 'space-around',
            height: 50,
          }}>
          <Text style={[GlobalLtrStyle.regularBlackText, {fontWeight: 'bold'}]}>
            {`${clientDetails?.name || ''}`}
          </Text>
          <TouchableOpacity onPress={onNavigateToAccount}>
            <Text
              style={{
                fontSize: Fonts.medium,
                color: Colors.green,
              }}>
              {i18n.t('edit_account')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DrawerItems = (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onLogout = () => dispatch(applicationActions.logout());
  const {state, itemStyle, ...rest} = props;
  const navigateTo = (route: any) => {
    navigation.navigate(route);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={() => (
          <CustomIcon
            onPress={() => navigateTo(ClientPathList.ORDER_LIST)}
            name={'star'}
            iconPack="custom"
          />
        )}
        labelStyle={{
          marginLeft: -20,
          color: Colors.black,
          fontSize: Fonts.medium,
        }}
        style={{marginBottom: 15}}
        label={i18n.t('my_orders')}
        onPress={() => navigateTo(ClientPathList.ORDER_LIST)}
      />
      <DrawerItem
        icon={() => (
          <CustomIcon
            onPress={() => navigateTo(ClientPathList.PAYMENT_METHOD)}
            name={'payment'}
            color={Colors.greyIrina}
            iconPack="custom"
          />
        )}
        labelStyle={{
          marginLeft: -20,
          color: Colors.black,
          fontSize: Fonts.medium,
        }}
        style={{marginBottom: 15}}
        label={i18n.t('payment_method')}
        onPress={() => navigateTo(ClientPathList.PAYMENT_METHOD)}
      />
      <DrawerItem
        icon={() => (
          <CustomIcon
            onPress={() => navigateTo(ClientPathList.SETTINGS)}
            name={'settings'}
            color={Colors.greyIrina}
            iconPack="custom"
          />
        )}
        labelStyle={{
          marginLeft: -20,
          color: Colors.black,
          fontSize: Fonts.medium,
        }}
        style={{marginBottom: 15}}
        label={i18n.t('settings')}
        onPress={() => navigateTo(ClientPathList.SETTINGS)}
      />
      <DrawerItem
        icon={() => (
          <CustomIcon
            onPress={() => navigateTo(ClientPathList.HELP)}
            name={'help'}
            color={Colors.greyIrina}
            iconPack="custom"
          />
        )}
        labelStyle={{
          marginLeft: -20,
          color: Colors.black,
          fontSize: Fonts.medium,
        }}
        style={{marginBottom: 15}}
        label={i18n.t('help')}
        onPress={() => navigateTo(ClientPathList.HELP)}
      />

      <DrawerItem
        icon={() => (
          <CustomIcon onPress={onLogout} name={'logout'} iconPack="custom" />
        )}
        labelStyle={{
          marginLeft: -20,
          color: Colors.black,
          fontSize: Fonts.medium,
        }}
        style={{marginBottom: 15}}
        label={i18n.t('logout_button')}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
};

export default NavigationStack;
