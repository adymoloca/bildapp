import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Checkbox from '../../../atoms/SvgIcons/Checkbox';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import {ISupplier} from '../../../utils/interfaces';
import appointmentScreenLtrStyle from '../../AppointmentScreen/styles';

const scores = [1, 2, 3, 4, 5];
export const SupplierCard = ({
  index,
  supplier,
  onSelect,
  isSelected,
  isLastOne,
}: {
  index: number;
  supplier: ISupplier;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isLastOne: boolean;
}) => {
  const {_id, company, address, reviewAverage, reviewsSum} = supplier;
  return (
    <TouchableOpacity
      key={index + 1}
      onPress={() => onSelect(_id)}
      style={appointmentScreenLtrStyle.supplierOptionsContainer}>
      <Checkbox
        selected={isSelected}
        onPress={() => onSelect(_id)}
      />
      <View
        style={
          isLastOne
            ? appointmentScreenLtrStyle.supplierOptionsViewNoSeparator
            : appointmentScreenLtrStyle.supplierOptionsView
        }>
        <Text style={GlobalLtrStyle.regularBlackText}>{company}</Text>
        <Text style={GlobalLtrStyle.regularDarkGreyText}>
          {address?.formattedAddress && address?.formattedAddress.length > 30 ? address?.formattedAddress.substr(0, 30) + '...' : address?.formattedAddress}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          {scores.map(score => getStars(score, reviewAverage))}
          <Text style={{color: Colors.darkGrey, marginLeft: 5}}>
            {`(${reviewsSum})`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStars = (score: number, review: number) => {
  if (score <= Math.floor(review)) {
    return (
      <Icon key={score} name={'star'} size={Fonts.h5} color={Colors.green} />
    );
  } else if (score === Math.floor(review) + 1 && Math.floor(review) < review) {
    return (
      <Icon
        key={score}
        name={'star-half'}
        size={Fonts.h5}
        color={Colors.green}
      />
    );
  } else {
    return (
      <Icon
        key={score}
        name={'star'}
        size={Fonts.h5}
        color={Colors.greyIrina}
      />
    );
  }
};
