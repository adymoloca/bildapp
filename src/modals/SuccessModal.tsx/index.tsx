import * as React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Colors, Fonts} from '../../themes';
import LottieView from 'lottie-react-native';
import images from '../../themes/Images';
import SupplierOfferScreenStyle from '../../themes/styles/supplierOfferScreen.ltr.style';
import {
  InfoModalActionTypeEnum,
  InfoModalData,
  InfoModalEnum,
} from '../../utils/interfaces';
import {connect} from 'react-redux';
import {RootState} from '../../redux/store';
import {actions} from '../../redux/slices/orderSlice';
import { useNavigation } from '@react-navigation/native';

const SuccessModal = ({
  setInfoModalData,
  infoModalData,
  finishOrder,
  setSelectedFilterItem
}: IStateProps): JSX.Element => {
  const {isVisible, title, subtitle, type, actionType, actionTypeSecondary} = infoModalData;
  const navigation = useNavigation();
  const ImageModal = React.useMemo(() => {
    if (type == InfoModalEnum.BASIC) {
      return (
        <LottieView
          source={require('../../assets/images/lottie_check.json')}
          autoPlay
          style={{
            height: 150,
            width: 150,
            alignItems: 'center',
          }}
        />
      );
    } else {
      let source = images.insufficientFounds;
      if (type == InfoModalEnum.INSUFFICIENT_FOUNDS) {
        source = images.insufficientFounds;
      } else if (type == InfoModalEnum.PAYMENT_CONFIRMED) {
        source = images.paymentConfirmed;
      } else if (type == InfoModalEnum.PAYMENT_FAILED) {
        source = images.paymentFailed;
      }
      return (
        <Image
          style={{width: 170, height: 150, resizeMode: 'stretch'}}
          source={source}
        />
      );
    }
  }, [type]);

  const onClick = () => {
    if (actionType === InfoModalActionTypeEnum.BASIC) {
      setInfoModalData(new InfoModalData());
    } else if (actionType === InfoModalActionTypeEnum.GO_BACK) {
      setInfoModalData(new InfoModalData());
      navigation.goBack();
    } else if (actionType === InfoModalActionTypeEnum.COLLECT_MONEY) {
      finishOrder({orderId: infoModalData.actionInput.orderId, captureAvailable: true, paymentMethodId: infoModalData.actionInput.paymentMethodId});
      setInfoModalData(new InfoModalData());
    }

    if (infoModalData.filterForOrderList) {
      setSelectedFilterItem(infoModalData.filterForOrderList);
    }
  };

  const onClickSecondary = () => {
    if (actionTypeSecondary === InfoModalActionTypeEnum.BASIC) {
      setInfoModalData(new InfoModalData());
    } else if (actionTypeSecondary === InfoModalActionTypeEnum.GO_BACK) {
      setInfoModalData(new InfoModalData());
      navigation.goBack();
    }
    if (infoModalData.filterForOrderListSecondary) {
      setSelectedFilterItem(infoModalData.filterForOrderListSecondary);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={SupplierOfferScreenStyle.modalBackground}>
        <View style={SupplierOfferScreenStyle.modalView}>
          {ImageModal}
          <Text
            style={[
              SupplierOfferScreenStyle.blackRegularText,
              {marginBottom: 10},
            ]}>
            {title || ''}
          </Text>
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            {subtitle || ''}
          </Text>
          <Button
            title={infoModalData.buttonText}
            buttonStyle={[SupplierOfferScreenStyle.acceptButton, {width: '100%'}]}
            onPress={onClick}
          />
          {!!infoModalData.buttonTextSecondary && <TouchableOpacity style={{marginTop: 15}} onPress={onClickSecondary}>
            <Text
              style={{
                margin: 15,
                fontSize: Fonts.regular,
                color: Colors.green,
              }}>
              {infoModalData.buttonTextSecondary}
            </Text>
        </TouchableOpacity>}
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: RootState) => ({
  infoModalData: state.order.infoModalData,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  setInfoModalData: actions.setInfoModalData,
  finishOrder: actions.finishOrder,
  setSelectedFilterItem: actions.setSelectedFilterItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);
