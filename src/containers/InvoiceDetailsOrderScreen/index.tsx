import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomTextInput from '../../components/CustomTextInput';
import HeaderBar from '../../components/HeaderBar';
import {
  selectClientCompanyDetails,
} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';

import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../../components/CustomStatusBar';

const InvoiceDetailsOrderScreen = () => {
  const navigation: any = useNavigation();

  const clientCompanyDetails = useSelector(selectClientCompanyDetails);

  const header = (
    <HeaderBar
      placement="center"
      leftComponent={
        <CustomIcon
          size={Fonts.h5}
          color={Colors.black}
          iconPack="custom"
          name="arrow-back"
          onPress={navigation.goBack}
        />
      }
      centerComponent={
        <Text style={OrderScreenLtrStyle.title_text}>
          {i18n.t('billing_details')}
        </Text>
      }
      rightComponent={null}
      noBorder={true}
    />
  );
  const content = (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <View style={{padding: 15}}>
        <CustomTextInput
          label={i18n.t('company_name')}
          isLabelAbove
          value={clientCompanyDetails?.companyName || ''}
          onChange={() => {}}
          editable={false}
        />
        <CustomTextInput
          label={i18n.t('no_reg_com')}
          isLabelAbove
          value={clientCompanyDetails?.registrationNumber || ''}
          onChange={() => {}}
          editable={false}
        />
        <CustomTextInput
          isLabelAbove
          label="CIF"
          value={clientCompanyDetails?.cif || ''}
          onChange={() => {}}
          editable={false}
        />
        <CustomTextInput
          isLabelAbove
          label={i18n.t('company_address')}
          value={clientCompanyDetails?.companyAddress || ''}
          onChange={() => {}}
          editable={false}
        />
      </View>

      <View style={{flex: 1}} />
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <CustomStatusBar />
      {header}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          backgroundColor: Colors.white,
        }}>
        <KeyboardAwareScrollView keyboardOpeningTime={0}>
          {content}
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default InvoiceDetailsOrderScreen;
