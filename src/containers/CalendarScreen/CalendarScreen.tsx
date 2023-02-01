import {ActivityIndicator, View} from 'react-native';
import * as React from 'react';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';
import AgendaScreen from './AgendaScreen';
import {ICalendarOrder, IOrder, ITimeInterval, Order} from '../../utils/interfaces';
import {connect} from 'react-redux';
import {actions, selectCalendarOrderList} from '../../redux/slices/orderSlice';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {SupplierPathList} from '../../utils/enums';
import CustomStatusBar from '../../components/CustomStatusBar';
import BottomTabNavigator from '../../components/BottomTabNavigator';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const MyCalendarScreen = ({
  orderList,
  getOrderList,
  setOrderList,
  updateTimeInterval,
  navigation,
  setOrder,
}: IStateProps & IProps) => {
  let _unsubscribe: any = null;
  React.useEffect(() => {
    _unsubscribe = navigation.addListener('focus', () => {
      getOrderList();
    });

    return () => {
      if (_unsubscribe) {
        _unsubscribe();
      }
    };
  }, []);

  const getAgendaDateFormat = (dateObject: any) => {
    if (typeof dateObject?.getTime !== 'function') return undefined;

    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    if (month < 10) month = '0' + month;

    if (day < 10) day = '0' + day;

    return `${dateObject.getFullYear()}-${month}-${day}`;
  };

  const [viewedDate, setViewedDate] = React.useState(
    getAgendaDateFormat(new Date()),
  );

  const onChange = (
    list: ICalendarOrder[],
    data: {orderId: string; time: ITimeInterval},
  ) => {
    setOrderList(list);
    updateTimeInterval(data);
  };

  return (
    <>
      <CustomStatusBar  />
      <View style={RequestListScreenLtrStyle.container}>
        <View
          style={{
            padding: 15,
            width: '100%',
            height: '100%',
            marginBottom: 20,
          }}>
            <AgendaScreen
              orderList={orderList}
              onChange={onChange}
              onAdd={(date: Date) => {
                setOrder({...new Order(), deliveryDate: date});
                navigation.navigate(SupplierPathList.APPOINTMENT_DRAFT);
              }}
              navigate={(item: ICalendarOrder) => {
                setOrder(item);
                navigation.navigate(SupplierPathList.ORDER_STACK);
              }}
            />
        </View>
      </View>
      <BottomTabNavigator routeName={SupplierPathList.CALENDAR_STACK} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  orderList: selectCalendarOrderList(state),
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  getOrderList: actions.getOrderList,
  setOrder: actions.setOrderData,
  setOrderList: actions.setOrderList,
  updateTimeInterval: actions.updateTimeInterval,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCalendarScreen);
