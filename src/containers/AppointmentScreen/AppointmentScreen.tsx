import React, {Component} from 'react';
import {Dimensions, StatusBar, View} from 'react-native';

import {Button} from 'react-native-elements';
import i18n from '../../services/i18n';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import styles from './styles';
import {connect} from 'react-redux';
import {setOrderData} from '../../redux/slices/orderSlice';
import {selectSelectedCard} from '../../redux/slices/persistedUserSlice';

import {RootState} from '../../redux/store';
import {ClientPathList} from '../../utils/enums';
import loginPageStyle from '../../themes/styles/auth.ltr.style';
import {ITimeInterval, Order} from '../../utils/interfaces';
import {AppointmentDatePicker} from './components/AppointmentDatePicker';
import {Location} from './components/Location';
import {AppointmentTimePicker} from './components/AppointmentTimePicker';
import {ConcreteType} from './components/ConcreteType';
import {Quantity} from './components/Quantity';
import {PumpingService} from './components/PumpingService';
import {Notes} from './components/Notes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../themes/Images';
import DynamicHeader from './DynamicHeader';
import {Colors} from '../../themes';

interface IProps {
  navigation: any;
}

class AppointmentScreen extends Component<IProps & IStateProps> {
  state = {...new Order()};

  _unsubscribeFocus: any = null;
  _unsubscribeBlur: any = null;
  componentDidMount = () => {
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {});
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      const {orderData} = this.props;
      this.setState({...orderData});
      setTimeout(() => {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setBarStyle('light-content', true);
      }); // this is a workaround for android, because after the state update the status bar lose the transparent style;
    });
  };

  componentWillUnmount = () => {
    if (this._unsubscribeBlur) {
      this._unsubscribeBlur();
    }
    if (this._unsubscribeFocus) {
      this._unsubscribeFocus();
    }
  };

  sendRequest = () => {
    const {
      props: {selectSelectedCard},
    } = this;
    const {
      props: {navigation, onSetOrderData},
      state,
    } = this;
    const paymentMethodId = selectSelectedCard?.id || 'cash';
    onSetOrderData({...state, paymentMethodId});
    navigation.navigate(ClientPathList.SUPPLIER_LIST);
  };
  scroll: any = null;
  render() {
    const {
      sendRequest,
      props: {navigation},
      state: {
        deliveryDate,
        concreteType,
        notes,
        requestPump,
        quantity,
        address,
        time,
      },
    } = this;
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <DynamicHeader
          onPress={navigation.goBack}
          title={i18n.t('new_order')}
          image={images.products2}>
          <KeyboardAwareScrollView
            extraScrollHeight={160}
            innerRef={(ref: any) => {
              this.scroll = ref;
            }}
            bounces={false}>
            <View style={styles.inputs}>
              <Location
                disabled={false}
                onPress={() => navigation.navigate(ClientPathList.MAP)}
                value={address}
              />

              <AppointmentDatePicker
                value={deliveryDate as Date}
                onChange={date => {
                  this.setState({deliveryDate: date});
                }}
              />
              <AppointmentTimePicker
                value={time}
                selectedDate={deliveryDate}
                onChange={(value: ITimeInterval) => {
                  this.setState({time: value});
                }}
              />

              <ConcreteType
                extraTextStyle={{color: Colors.greyIrina}}
                value={concreteType as string}
                onChange={concreteT => {
                  this.setState({concreteType: concreteT});
                }}
              />
              <Quantity
                value={quantity as string}
                onChange={quantityV => {
                  this.setState({quantity: quantityV});
                }}
              />
              <PumpingService
                value={requestPump as boolean}
                onChange={v => {
                  this.setState({requestPump: v});
                }}
              />
              <Notes
                value={notes as string}
                onChange={(text: string) => {
                  this.setState({notes: text});
                }}
              />
              <View style={{height: 225}}></View>
            </View>
          </KeyboardAwareScrollView>
        </DynamicHeader>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            paddingHorizontal: 10,
            backgroundColor: 'transparent',
            width: '100%',
          }}>
          <Button
            title={i18n.t('pick_suppliers')}
            disabled={!quantity || !concreteType}
            onPress={sendRequest}
            buttonStyle={loginPageStyle.loginButton}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  orderData: state.order.orderData,
  selectSelectedCard: selectSelectedCard(state),
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  onSetOrderData: setOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen);
