import SupplierOfferScreenStyle from '../../themes/styles/supplierOfferScreen.ltr.style';
import React, {useEffect} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import images from '../../themes/Images';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {SupplierPathList} from '../../utils/enums';
import i18n from '../../services/i18n';

const RegisterSuccessModal = ({
  isVisible,
  close,
  resend,
}: {
  isVisible: boolean;
  close: () => void;
  resend: () => void;
}) => {
  return (
    <Modal animationType="fade" transparent={false} visible={isVisible}>
      <View
        style={[
          SupplierOfferScreenStyle.modalBackground,
          {
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            paddingTop: 60,
            paddingHorizontal: 20,
          },
        ]}>
        <View style={{alignSelf: 'flex-end'}}>
          <CustomIcon
            size={Fonts.h2}
            color={Colors.black}
            style={{marginLeft: 5}}
            name="close"
            iconPack="custom"
            onPress={close}
          />
        </View>

        <Image
          style={{
            width: 200,
            height: 177,
            resizeMode: 'stretch',
            marginTop: 80,
          }}
          source={images.email}
        />

        <Text
          style={[
            SupplierOfferScreenStyle.blackRegularText,
            {marginBottom: 30, marginTop: 60, fontWeight: '500'},
          ]}>
          {i18n.t('check_your_email')}
        </Text>
        <Text
          style={{
            color: Colors.black,
            textAlign: 'center',
            marginBottom: 20,
            width: '80%',
            fontSize: Fonts.bigger,
          }}>
          {i18n.t('confirm_email')}
        </Text>
        <View style={{width: '100%', marginTop: 50}}>
          <Button
            title={i18n.t('got_it')}
            buttonStyle={[
              SupplierOfferScreenStyle.acceptButton,
              {width: '100%', height: 55},
            ]}
            onPress={() => {
              close();
            }}
          />
        </View>

        <TouchableOpacity style={{marginTop: 15}} onPress={resend}>
          <Text
            style={{
              margin: 15,
              fontSize: Fonts.regular,
              color: Colors.greyIrina,
            }}>
            {i18n.t('did_not_receive')}
            <Text
              style={{
                color: Colors.green,
              }}>
              {` Resend`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default RegisterSuccessModal;
