import I18n from 'i18n-js';
import * as React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import SupplierOfferScreenStyle from '../../../themes/styles/supplierOfferScreen.ltr.style';
import {ConfirmationTypeEnum} from '../../../utils/interfaces';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: ConfirmationTypeEnum;
}
const ConfirmationModal = ({
  isVisible,
  onClose,
  onConfirm,
  type,
}: IProps): JSX.Element => {
  const [confirmationData, setConfirmationData] = React.useState<{
    contentMsg: string;
    confirm: {msg: string; color: string};
    cancel: {msg: string; color: string};
  }>({
    contentMsg: I18n.t('cancel_offer_msg'),
    confirm: {msg: I18n.t('cancel_offer'), color: Colors.red},
    cancel: {msg: I18n.t('cancel'), color: Colors.black},
  });

  React.useEffect(() => {
    if (type === ConfirmationTypeEnum.START_DELIVERY) {
      setConfirmationData({
        contentMsg: I18n.t('start_delivery_msg'),
        confirm: {msg: I18n.t('start_delivery'), color: Colors.black},
        cancel: {msg: I18n.t('cancel'), color: Colors.red},
      });
    } else if (type === ConfirmationTypeEnum.FINISH_ORDER) {
      setConfirmationData({
        contentMsg: I18n.t('finish_order_msg'),
        confirm: {msg: I18n.t('finish_order'), color: Colors.black},
        cancel: {msg: I18n.t('cancel'), color: Colors.red},
      });
    } else if (type === ConfirmationTypeEnum.CANCEL_ORDER) {
      setConfirmationData({
        contentMsg: I18n.t('cancel_order_msg'),
        confirm: {msg: I18n.t('cancel_order'), color: Colors.black},
        cancel: {msg: I18n.t('cancel'), color: Colors.red},
      });
    } else if (type === ConfirmationTypeEnum.CANCEL_OFFER) {
      setConfirmationData({
        contentMsg: I18n.t('cancel_offer_msg'),
        confirm: {msg: I18n.t('cancel_offer'), color: Colors.black},
        cancel: {msg: I18n.t('cancel'), color: Colors.red},
      });
    } else if (type === ConfirmationTypeEnum.DELETE_ORDER) {
      setConfirmationData({
        contentMsg: I18n.t('delete_order_msg'),
        confirm: {msg: I18n.t('delete_order'), color: Colors.black},
        cancel: {msg: I18n.t('cancel'), color: Colors.red},
      });
    }
  }, [type]);
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          flexDirection: 'column',
          alignContent: 'flex-end',
        }}>
        <TouchableOpacity onPress={onClose} style={{flex: 1}} />
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            margin: 10,
          }}>
          <View
            style={{
              padding: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.grey,
              alignItems: 'center',
            }}>
            <Text
              style={[GlobalLtrStyle.regularBlackText, {textAlign: 'center'}]}>
              {confirmationData.contentMsg}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: Fonts.regular,
                color: Colors.red,
              }}>
              {confirmationData.confirm.msg}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            SupplierOfferScreenStyle.actionSheetBottomButton,
            {alignItems: 'center', marginBottom: 30},
          ]}
          onPress={onClose}>
          <Text style={GlobalLtrStyle.regularBlackText}>
            {confirmationData.cancel.msg}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ConfirmationModal;
