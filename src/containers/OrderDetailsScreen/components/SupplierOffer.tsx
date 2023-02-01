import I18n from 'i18n-js';
import * as React from 'react';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import SupplierOfferScreenStyle from '../../../themes/styles/supplierOfferScreen.ltr.style';
import {IBidder, ITimeInterval, OfferTypeEnum} from '../../../utils/interfaces';
import {OfferFields} from './OfferPrice';

const SupplierOffer = ({
  bidder,
  onAccept,
  onRefuse,
}: {
  bidder: IBidder;
  onAccept: (bidder: IBidder, time?: ITimeInterval) => void;
  onRefuse: (bidder: IBidder) => void;
}): JSX.Element => {
  const [selectedHour, setSelectedHour] = useState(
    bidder?.offer?.availableHours?.[0] || '',
  );
  const scores = [1, 2, 3, 4, 5];

  const getStars = (score: any) => {
    if (score <= Math.floor(bidder.reviewAverage)) {
      return (
        <Icon key={score} name={'star'} size={Fonts.h5} color={Colors.green} />
      );
    } else if (
      score === Math.floor(bidder.reviewAverage) + 1 &&
      Math.floor(bidder.reviewAverage) < bidder.reviewAverage
    ) {
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

  const accept = () => {
    if (selectedHour) {
      let number = parseInt(selectedHour);
      let start = number === 1 ? 24 : number;
      let end = number === 24 ? 1 : number + 1;
      onAccept(bidder, {start, end});
    } else {
      onAccept(bidder);
    }
  };
  return (
    <View style={SupplierOfferScreenStyle.container}>
      <Text style={[GlobalLtrStyle.regularBlackText, {fontWeight: 'bold'}]}>
        {bidder.company}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {scores.map(score => getStars(score))}
        <Text
          style={[
            GlobalLtrStyle.regularDarkGreyText,
            {marginLeft: 5, fontSize: Fonts.medium},
          ]}>
          {5}
        </Text>
      </View>
      <OfferFields
        isEditable={false}
        offer={bidder.offer}
        setRefs={() => {}}
        keepEditingPrice={{
          [OfferTypeEnum.Concrete]: false,
          [OfferTypeEnum.Pumping]: false,
          [OfferTypeEnum.Transport]: false,
        }}
      />

      <View style={{marginTop: 10}}>
        <Text style={GlobalLtrStyle.regularBlackText}>
          {I18n.t('available_hours')}
        </Text>
        <View
          style={{flexDirection: 'row', paddingVertical: 10, flexWrap: 'wrap'}}>
          {[...bidder.offer.availableHours]
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(hour => (
              <AvailableHour
                isSelected={hour === selectedHour}
                hour={hour}
                key={hour}
                onSelect={hour => {
                  setSelectedHour(hour);
                }}
              />
            ))}
        </View>
        <View
          style={[
            SupplierOfferScreenStyle.rowView,
            {
              marginVertical: 10,
            },
          ]}>
          <Button
            title={I18n.t('delete')}
            titleStyle={[
              GlobalLtrStyle.regularDarkGreyText,
              {fontWeight: 'bold'},
            ]}
            onPress={() => {
              onRefuse(bidder);
            }}
            buttonStyle={SupplierOfferScreenStyle.refuseButton}
          />
          <Button
            title={I18n.t('accept')}
            buttonStyle={SupplierOfferScreenStyle.acceptButton}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: Fonts.regular,
              color: Colors.white,
            }}
            onPress={accept}
          />
        </View>
      </View>
    </View>
  );
};

const AvailableHour = ({
  isSelected,
  hour,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: (hours: string) => void;
  hour: string;
}) => {
  const select = () => {
    onSelect(hour);
  };
  if (isSelected) {
    return (
      <TouchableOpacity
        onPress={select}
        style={[
          SupplierOfferScreenStyle.hourView,
          {
            backgroundColor: Colors.green,
          },
        ]}>
        <Text
          style={{
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: Fonts.medium,
          }}>
          {`${hour}:00`}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={select}
        style={[SupplierOfferScreenStyle.hourView]}>
        <Text style={OrderScreenLtrStyle.title_text_gray}> {`${hour}:00`}</Text>
      </TouchableOpacity>
    );
  }
};

export default SupplierOffer;
