import SupplierOfferScreenStyle from '../../themes/styles/supplierOfferScreen.ltr.style';
import React, {useEffect} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import images from '../../themes/Images';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {SupplierPathList} from '../../utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '../../redux/hooks';
import {
  selectIsClient,
  selectIsLoggedIn,
} from '../../redux/slices/applicationSlice';
import {
  actions,
  selectFillYourDataModal,
  selectHasAddress,
  selectHasInvoiceDetails,
  selectHasRepresentativeDetails,
} from '../../redux/slices/persistedUserSlice';
import CustomStatusBar from '../CustomStatusBar';

const FillYourDataModal = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const isClient = useAppSelector(selectIsClient);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const fillYourDataModal = useAppSelector(selectFillYourDataModal);
  const hasAddress = useSelector(selectHasAddress);
  const hasInvoiceDetails = useSelector(selectHasInvoiceDetails);
  const hasRepresentativeDetails = useSelector(selectHasRepresentativeDetails);

  useEffect(() => {
    if (!fillYourDataModal) {
      dispatch(
        actions.setFillYourDataModal({
          isVisible: false,
          lastShownDate: undefined,
          daysToBeShown: 7,
        }),
      );
    }
  }, []);
  const allDataCompleted =
    hasAddress && hasInvoiceDetails && hasRepresentativeDetails;
  if (isClient || !isLoggedIn || !fillYourDataModal || allDataCompleted) {
    return <></>;
  }

  const close = () => {
    dispatch(
      actions.setFillYourDataModal({
        ...fillYourDataModal,
        isVisible: false,
        lastShownDate: new Date(),
      }),
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={fillYourDataModal.isVisible}>
      <CustomStatusBar />
      <View
        style={[
          SupplierOfferScreenStyle.modalBackground,
          {
            backgroundColor: 'white',
            justifyContent: 'flex-start',
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
            width: 256,
            height: 190,
            resizeMode: 'stretch',
            marginTop: 50,
          }}
          source={images.fillYourData}
        />

        <Text
          style={[
            SupplierOfferScreenStyle.blackRegularText,
            {marginBottom: 10, marginTop: 60},
          ]}>
          Don't miss any order!
        </Text>
        <Text
          style={{
            color: Colors.greyStrong,
            textAlign: 'center',
            marginBottom: 20,
            width: '90%',
            fontSize: Fonts.regular,
          }}>
          Complete all company info to accept cash or credit card orders
        </Text>
        <View style={{width: '100%', marginTop: 50}}>
          <Button
            title={'Let`s do it!'}
            buttonStyle={[
              SupplierOfferScreenStyle.acceptButton,
              {width: '100%', height: 55},
            ]}
            onPress={() => {
              navigation.navigate(SupplierPathList.SUPPLIER_ACCOUNT);
              close();
            }}
          />
        </View>

        <TouchableOpacity style={{marginTop: 15}} onPress={close}>
          <Text
            style={{
              margin: 15,
              fontSize: Fonts.regular,
              color: Colors.greyIrina,
            }}>
            No thanks, another time!
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FillYourDataModal;
