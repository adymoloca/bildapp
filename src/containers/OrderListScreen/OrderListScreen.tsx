import React, {Component} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import FilterButtons from '../../components/FilterButtons';
import OrderListItem from '../../components/OrderListItem';
import SupplierSearchOrder from '../../components/SupplierSearchOrder';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';
import {connect} from 'react-redux';
import {
  actions as applicationActions,
  selectIsClient,
} from '../../redux/slices/applicationSlice';

import {actions as persistedUserActions} from '../../redux/slices/persistedUserSlice';
import {actions} from '../../redux/slices/orderSlice';
import {IOrder} from '../../utils/interfaces';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import HeaderBar from '../../components/HeaderBar';
import CustomIcon from '../../atoms/CustomIcon';
import {FilterItem, filterItems, getFilteredItems} from '../../utils/orderUtil';
import {FlatList} from 'react-native-gesture-handler';
import {ClientPathList, SupplierPathList} from '../../utils/enums';
import CustomStatusBar from '../../components/CustomStatusBar';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import {RootState} from '../../redux/store';
import {triggerFillYourDataModal} from '../../utils/dateUtils';
import { OrdersSkeleton } from '../../components/Skeleton/Orders';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface IState {
  searchText: string;
  filteredOrders: IOrder[];
}

class OrderListScreen extends Component<IProps & IStateProps, IState> {
  state: IState = {
    searchText: '',
    filteredOrders: [],
  };
  _unsubscribe: any = null;
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {fillYourDataModal, getOrderList, setFillYourDataModal} =
        this.props;
      getOrderList();
      if (
        !this.props.isClient &&
        fillYourDataModal &&
        triggerFillYourDataModal(fillYourDataModal)
      ) {
        setTimeout(() => {
          setFillYourDataModal({
            ...fillYourDataModal,
            isVisible: true,
          });
        }, 5000);
      }
    });
  };

  componentWillUnmount = () => {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    this.props.setSelectedFilterItem(FilterItem.All);
  };

  static getDerivedStateFromProps = (
    nextProps: IProps & IStateProps,
    prevState: IState,
  ) => {
    if (nextProps.orderList.length > 0) {
      return {
        filteredOrders: getFilteredItems(
          nextProps.selectedFilterItem,
          nextProps.orderList,
          prevState.searchText,
        ),
      };
    }
    return null;
  };

  filterOrders = (value: FilterItem) => {
    this.setState({searchText: ''});
    this.props.setSelectedFilterItem(value);
  };

  onSearchText = (value: string) => {
    this.setState({searchText: value});
  };

  render() {
    const {
      onSearchText,
      state: {searchText, filteredOrders},
      props: {
        navigation,
        orderList,
        isLoading,
        getOrderList,
        selectedFilterItem,
      },
    } = this;
    return (
      <View style={RequestListScreenLtrStyle.container}>
        <CustomStatusBar />
        {this.props.isClient ? (
          <>
            <HeaderBar
              isHidden={false}
              leftComponent={
                <CustomIcon
                  iconPack="custom"
                  name="arrow-back"
                  size={Fonts.h5}
                  color={Colors.black}
                  onPress={navigation.goBack}
                />
              }
              noBorder={true}
            />
            <Text style={{fontSize: Fonts.h6, paddingLeft: 15}}>
              {i18n.t('my_orders')}
            </Text>
          </>
        ) : (
          <SupplierSearchOrder text={searchText} setValue={onSearchText} />
        )}
        <FilterButtons
          items={filterItems}
          selectedItem={selectedFilterItem}
          setSelectedItem={this.filterOrders}
        />

        {this.props.isLoading ? (
          <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
            <OrdersSkeleton numberOfItems={5}/>
          </View>
        ) : (
        <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
          {orderList.length === 0 ? (
            <Text
              style={{
                padding: 15,
                fontSize: Fonts.regular,
                color: Colors.black,
              }}>
              {i18n.t('no_orders_in_range')}
            </Text>
          ) : (
            <FlatList
              data={filteredOrders.sort(
                (a, b) =>
                  new Date(b.deliveryDate || '').getTime() -
                  new Date(a.deliveryDate || '').getTime(),
              )}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    getOrderList();
                  }}
                  refreshing={isLoading}
                />
              }
              contentContainerStyle={RequestListScreenLtrStyle.list}
              keyExtractor={item => item.orderId as string}
              renderItem={({item}) => {
                return (
                  <>
                      <OrderListItem
                        key={item.orderId}
                        navigate={() => {
                          if (this.props.isClient) {
                            navigation.navigate(ClientPathList.ORDER_DETAILS);
                          } else {
                            navigation.navigate(SupplierPathList.ORDER_STACK);
                          }
                        }}
                        order={item}
                      /> 
                       
                  </>
                );
              }}
            />
          )}
        </View>
        
        )}
        
        {!this.props.isClient && (
          <BottomTabNavigator routeName={SupplierPathList.ORDER_LIST} />
        )}
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  orderList: state.order.orderList,
  isLoading: state.order.isLoading,
  fillYourDataModal: state.persistedUser.fillYourDataModal,
  isClient: selectIsClient(state),
  selectedFilterItem: state.order.selectedFilterItem,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  logout: applicationActions.logout,
  getOrderList: actions.getOrderList,
  setFillYourDataModal: persistedUserActions.setFillYourDataModal,
  setSelectedFilterItem: actions.setSelectedFilterItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);
