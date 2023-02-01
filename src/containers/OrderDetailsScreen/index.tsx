import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {connect, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {RoleEnum} from '../../utils/interfaces';
import OrderDetailsClient from './OrderDetailsClient';
import OrderDetailsSupplier from './OrderDetailsSupplier';
import {actions} from '../../redux/slices/persistedUserSlice';

const OrderDetailsScreen = (
  props: IStateProps & {navigation: NavigationProp<ParamListBase>},
) => {
  const dispatch = useDispatch();

  if (props.role === RoleEnum.SUPPLIER) {
    return <OrderDetailsSupplier navigation={props.navigation} />;
  }
  return <OrderDetailsClient navigation={props.navigation} />;
};

const mapStateToProps = (state: RootState) => ({
  role: state.application.role,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
