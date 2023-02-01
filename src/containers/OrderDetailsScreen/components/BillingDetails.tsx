import I18n from 'i18n-js';
import React from 'react';
import {Text, View} from 'react-native';
import CustomIcon from '../../../atoms/CustomIcon';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {IClientCompany} from '../../../utils/interfaces';

const BillingDetails = (props: {
  companyDetails: IClientCompany;
  onPress: () => void;
}) => {
  const {companyDetails, onPress} = props;
  return (
    <>
      <View
        style={[OrderScreenLtrStyle.order_details_container, {paddingTop: 30}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalLtrStyle.pageTitle}>
            {I18n.t('order_details')}
          </Text>
          <CustomIcon
            size={Fonts.h2}
            iconPack="custom"
            color={Colors.black}
            name={'chevron-right'}
            onPress={onPress}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            alignItems: 'center',
          }}>
          <CustomIcon
            iconPack="custom"
            size={Fonts.h5}
            color={Colors.black}
            name="person"
          />
          <Text style={[GlobalLtrStyle.regularBlackText, {marginLeft: 20}]}>
            {companyDetails?.companyName}
          </Text>
        </View>
      </View>
    </>
  );
};

export default BillingDetails;
