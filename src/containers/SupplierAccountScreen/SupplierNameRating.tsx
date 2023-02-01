import { View, Text } from 'react-native';
import React from 'react';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import { Colors, Fonts } from '../../themes';
import appointmentScreenLtrStyle from '../../themes/styles/appointmentScreen.ltr.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { selectSupplierDetails } from '../../redux/slices/userSlice';

const SupplierNameRating = () => {
  // TODO mockup data, must be completed from supplier account info
  // const reviewAverage = 3.5;
  // const reviewCount = 126;
  const scores = [1, 2, 3, 4, 5];

  const supplierDetails = useSelector(selectSupplierDetails);

  const getStars = (score: number) => {
    if (score <= Math.floor(supplierDetails.reviewAverage)) {
      return (
        <Icon key={score} name={'star'} size={Fonts.h6} color={Colors.green} />
      );
    } else if (
      score === Math.floor(supplierDetails.reviewAverage) + 1 &&
      Math.floor(supplierDetails.reviewAverage) < supplierDetails.reviewAverage
    ) {
      return (
        <Icon
          key={score}
          name={'star-half'}
          size={Fonts.h6}
          color={Colors.green}
        />
      );
    } else {
      return (
        <Icon
          key={score}
          name={'star'}
          size={Fonts.h6}
          color={Colors.greyRating}
        />
      );
    }
  };
  return (
    <View style={[appointmentScreenLtrStyle.supplierOptionsContainer, { paddingBottom: 0 }]}>
      <View
        style={
          appointmentScreenLtrStyle.supplierOptionsViewNoSeparator
          // appointmentScreenLtrStyle.supplierOptionsView
        }
      >
        <Text style={GlobalLtrStyle.regularBlackText}>
          {supplierDetails.company}
        </Text>
        {/* <Text style={GlobalLtrStyle.regularDarkGreyText}>
            {address.length > 30
              ? address.substr(0, 30) + '...'
              : address}
          </Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {scores.map(score => getStars(score))}
          <Text style={{ color: Colors.darkGrey, marginLeft: 5 }}>
            {`(${supplierDetails.reviewsSum})`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SupplierNameRating;
