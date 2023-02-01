import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeaderBar from '../../components/HeaderBar';
import {Colors, Fonts} from '../../themes';
import CustomIcon from '../../atoms/CustomIcon';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import i18n from '../../services/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {connect} from 'react-redux';
import {actions} from '../../redux/slices/orderSlice';
import {RootState} from '../../redux/store';
import {
  convertToUpdateOrder,
  IOfferData,
  OfferTypeEnum,
} from '../../utils/interfaces';
import {OrderStatus} from '../../utils/orderUtil';
import _ from 'lodash';
import SuccessModal from '../../modals/SuccessModal.tsx';
import CustomStatusBar from '../../components/CustomStatusBar';

const EditQuantitiesScreen = ({
  navigation,
  order,
  ...props
}: IStateProps & {navigation: any}) => {
  const [offer, setOffer] = useState(props.offer);
  const onChange = (type: OfferTypeEnum, quantity: number) => {
    setOffer({
      ...offer,
      [type]: {
        ...offer[type],
        quantity,
      },
    });
  };

  const onSave = () => {
    const mustUpdate = [OrderStatus.Scheduled, OrderStatus.InDelivery].includes(
      order.status,
    );
    if (mustUpdate && order.selectedBidder) {
      const keys = Object.keys(offer) as (keyof typeof offer)[];
      let updateMade = false;
      keys
        .filter(key => key !== 'availableHours')
        .forEach(key => {
          const subOffer = offer[key] as IOfferData;
          const oldSubOffer = props.offer[key] as IOfferData;
          if (subOffer.quantity !== oldSubOffer.quantity) {
            updateMade = true;
          }
        });
      if (updateMade) {
        props.updateOrder({
          updatedOrder: convertToUpdateOrder({
            ...order,
            selectedBidder: {
              ...order.selectedBidder,
              offer,
            },
          }),
          navigation,
        });
      } else {
        navigation.goBack();
      }
    } else {
      props.setOffer(offer), navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor="black" barStyle="light-content" />
      <HeaderBar
        placement="center"
        leftComponent={
          <CustomIcon
            size={Fonts.h2}
            color={Colors.black}
            name="close"
            iconPack="custom"
            onPress={navigation.goBack}
          />
        }
        centerComponent={undefined}
        rightComponent={
          <TouchableOpacity onPress={onSave}>
            <Text
              style={[OrderScreenLtrStyle.title_text, {color: Colors.green}]}>
              {i18n.t('save')}
            </Text>
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flexDirection: 'column',
          marginTop: 50,
        }}>
        <ChangeQuantity
          type={OfferTypeEnum.Transport}
          onChange={onChange}
          offerData={offer.transport}
        />
        <ChangeQuantity
          type={OfferTypeEnum.Pumping}
          onChange={onChange}
          offerData={offer.pumping}
        />
      </View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  order: state.order.orderData,
  offer: state.order.offer,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  setOffer: actions.setOffer,
  setOrderData: actions.setOrderData,
  updateOrder: actions.updateOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuantitiesScreen);

const ChangeQuantity = (props: {
  disabled?: boolean;
  onChange: (type: OfferTypeEnum, value: number) => void;
  offerData: IOfferData;
  type: OfferTypeEnum;
}) => {
  const {quantity} = props.offerData;
  const onAdd = () => {
    props.onChange(props.type, parseInt(`${quantity}`) + 1);
  };

  const onRemove = () => {
    if (quantity > 0) {
      props.onChange(props.type, parseInt(`${quantity}`) - 1);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        paddingBottom: 20,
        borderBottomColor: '#ECECED',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
      }}>
      <Text style={[GlobalLtrStyle.regularBlackText]}>
        {props.offerData.label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{opacity: quantity === 0 || props.disabled ? 0.3 : 1}}
          disabled={quantity === 0 || props.disabled}
          onPress={onRemove}>
          <Icon
            size={Fonts.medium}
            color={Colors.white} // invisible icon
            style={{backgroundColor: Colors.yellowStrong}}
            name="remove"
          />
        </TouchableOpacity>
        <Text
          style={[
            GlobalLtrStyle.regularBlackText,
            {width: 50, textAlign: 'center'},
          ]}>
          {`${quantity}X`}
        </Text>
        <TouchableOpacity
          style={{opacity: props.disabled ? 0.3 : 1}}
          disabled={props.disabled}
          onPress={onAdd}>
          <Icon
            size={Fonts.medium}
            color={Colors.white} // invisible icon
            style={{backgroundColor: Colors.yellowStrong}}
            name="add"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
